import React from 'react';
import dayjs from 'dayjs';
import compare from 'just-compare';

import { Appointment } from '../../../../types/appointment';
import { DATE, TIME } from '../../../../constants/dateTime';
import {
  ActionKind,
  useAppointmentContext,
} from '../../../../context/appointment';
import useLocalStorage from '../../../../hooks/useLocalStorage';

type Props = { appointment: Appointment };

const AppointmentRow: React.FC<Props> = ({ appointment }) => {
  const { dispatch } = useAppointmentContext();
  const [appointments, setAppointments] = useLocalStorage('appointments', []);

  const removeAppointment = () => {
    const index = appointments.findIndex((a) => compare(a, appointment));
    setAppointments((prevValue) => {
      prevValue.splice(index, 1);
      return prevValue;
    });
  };

  return (
    <tr
      data-testid="appointment-row"
      className={
        dayjs(appointment?.startTime).isBefore(new Date())
          ? 'italic line-through text-gray-600 bg-gray-100'
          : 'text-gray-600'
      }
    >
      <td className="border-b border-gray-100 p-4 pl-8">{appointment?.name}</td>
      <td className="border-b border-gray-100 p-4">{appointment?.email}</td>
      <td className="border-b border-gray-100 p-4">
        {appointment?.phoneNumber}
      </td>
      <td className="border-b border-gray-100 p-4">
        {dayjs(appointment?.date).format(DATE)}
        <br />
        {dayjs(appointment?.startTime).format(TIME)}-
        {dayjs(appointment?.endTime).format(TIME)}
      </td>
      <td className="border-b border-gray-100 p-4">
        <button
          className="bg-transparent p-1 rounded-md border border-transparent hover:border-violet-600"
          aria-label="Update appointment"
          onClick={() =>
            dispatch({
              type: ActionKind.Update,
              payload: { showForm: true, appointment },
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </td>
      <td className="border-b border-gray-100 p-4 pr-8">
        <button
          className="bg-transparent p-1 rounded-md border border-transparent hover:border-red-400"
          aria-label="Remove appointment"
          data-testid="remove-appointment"
          onClick={() => {
            removeAppointment();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default AppointmentRow;
