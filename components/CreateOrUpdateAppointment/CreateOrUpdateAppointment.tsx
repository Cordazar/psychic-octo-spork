import dayjs from 'dayjs';
import React from 'react';
import { DATE, TIME } from '../../constants/dateTime';
import { ActionKind, useAppointmentContext } from '../../context/appointment';

import useLocalStorage from '../../hooks/useLocalStorage';
import { Appointment } from '../../types/appointment';
import Input, { InputProps } from '../Form/Input/Input';

const fields: InputProps[] = [
  {
    id: 'name',
    label: 'Name',
    placeholder: 'Customer name',
    type: 'text',
  },
  {
    id: 'email',
    label: 'E-mail',
    placeholder: 'Customer e-mail',
    type: 'email',
  },
  {
    id: 'phoneNumber',
    label: 'Phone number',
    placeholder: 'Customer phone number',
    type: 'tel',
    pattern: '^[- +()]*[0-9][- +()0-9]*$',
  },
  {
    id: 'date',
    label: 'Date',
    placeholder: 'Appointment date',
    type: 'date',
    required: true,
  },
  {
    id: 'startTime',
    label: 'Start time',
    placeholder: 'Appointment start time',
    type: 'time',
    required: true,
  },
  {
    id: 'endTime',
    label: 'End time',
    placeholder: 'Appointment end time',
    type: 'time',
    required: true,
  },
];

const CreateOrUpdateAppointment: React.FC = (): JSX.Element => {
  const [appointments, setAppointments] = useLocalStorage('appointments', []);
  const { state, dispatch } = useAppointmentContext();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newAppointment = [...e.target.elements].reduce(
      (appointment: Appointment, currentInput) => ({
        ...appointment,
        [currentInput.id]: currentInput.value,
      }),
      {} as Appointment
    );

    newAppointment.startTime = dayjs(newAppointment.date)
      .set('hour', newAppointment.startTime.split(':')[0])
      .set('minute', newAppointment.startTime.split(':')[1]);
    newAppointment.endTime = dayjs(newAppointment.date)
      .set('hour', newAppointment.endTime.split(':')[0])
      .set('minute', newAppointment.endTime.split(':')[1]);

    if (appointments.length > 0) {
      setAppointments([...appointments, ...[newAppointment]]);
    } else {
      setAppointments([newAppointment]);
    }

    dispatch({ type: ActionKind.Done });
  };

  const classes = {
    formContainer:
      'w-full max-w-3xl mx-auto bg-white rounded-lg border border-primaryBorder shadow-default p-10 mb-6 relative',
    button:
      'inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700',
    btnContainer: 'flex justify-center items-center mt-6',
  };

  const fieldsJsx = fields.map((field, index) => {
    let defaultValue = state.appointment?.[field.id];
    console.log(defaultValue, field);
    if (defaultValue) {
      if (['startTime', 'endTime'].includes(field.id))
        defaultValue = dayjs(defaultValue).format(TIME);
      if (field.id === 'date') defaultValue = dayjs(defaultValue).format(DATE);
    }
    return <Input key={index} {...{ ...field, defaultValue }} />;
  });

  return (
    <div className={classes.formContainer}>
      <button
        className="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-sm z-50 p-1 border border-transparent hover:border-violet-600 rounded-full"
        onClick={() => dispatch({ type: ActionKind.Done })}
      >
        <svg
          className="fill-current text-violet-800"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </button>
      <form onSubmit={handleFormSubmit}>
        <fieldset className="flex flex-wrap justify-between">
          {fieldsJsx}
        </fieldset>

        <div className={classes.btnContainer}>
          <button className={classes.button}>
            {state.appointment ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrUpdateAppointment;
