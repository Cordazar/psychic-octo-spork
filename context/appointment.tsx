import { createContext, useContext, useReducer } from 'react';
import { Appointment } from '../types/appointment';

export enum ActionKind {
  Update = 'UPDATE',
  Create = 'CREATE',
  Done = 'DONE',
}
type Action = {
  type: ActionKind;
  payload?: State;
};
type Dispatch = (action: Action) => void;
type State = { showForm: boolean; appointment?: Appointment };
type AppointmentProviderProps = { children: React.ReactNode };

const AppointmentContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function appointmentReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionKind.Update: {
      return { showForm: true, appointment: action.payload.appointment };
    }
    case ActionKind.Create: {
      return { showForm: true };
    }
    case ActionKind.Done: {
      return { showForm: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function AppointmentWrapper({ children }: AppointmentProviderProps) {
  const [state, dispatch] = useReducer(appointmentReducer, { showForm: false });

  const value = { state, dispatch };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      'useAppointmentContext must be used within an AppointmentContext'
    );
  }
  return useContext(AppointmentContext);
}
