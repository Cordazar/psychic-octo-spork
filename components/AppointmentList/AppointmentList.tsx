import React from 'react';

import AppointmentRow from './components/AppointmentRow/AppointmentRow';
import { Appointment } from '../../types/appointment';
import dayjs from 'dayjs';

type Props = { appointments: Appointment[] };

const dateSorter = (a: Appointment, b: Appointment) =>
  dayjs(a.date).valueOf() - dayjs(b.date).valueOf() ||
  dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf() ||
  dayjs(a.endTime).valueOf() - dayjs(b.endTime).valueOf();

const AppointmentList: React.FC<Props> = ({ appointments }) => {
  const appointmentsJsx = appointments
    .sort(dateSorter)
    .map((a: Appointment, i: number) => (
      <AppointmentRow appointment={a} key={i} />
    ));

  return (
    <div className="not-prose relative bg-grid-gray-100 bg-white rounded-xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 opacity-60"></div>
      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm overflow-hidden my-8">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-gray-400 text-left">
                  Name
                </th>
                <th className="border-b font-medium p-4 pt-0 pb-3 text-gray-400 text-left">
                  E-mail
                </th>
                <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-gray-400 text-left">
                  Telephone
                </th>
                <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-gray-400 text-left">
                  Date & time
                </th>
                <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-gray-400 text-left">
                  Edit
                </th>
                <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-gray-400 text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">{appointmentsJsx}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
