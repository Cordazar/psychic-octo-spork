import React from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';

import AppointmentList from '../components/AppointmentList/AppointmentList';
import { YEAR } from '../constants/dateTime';
import useLocalStorage from '../hooks/useLocalStorage';
import CreateOrUpdateAppointment from '../components/CreateOrUpdateAppointment/CreateOrUpdateAppointment';
import { ActionKind, useAppointmentContext } from '../context/appointment';

export default function Home() {
  const [appointments, setAppointments] = useLocalStorage('appointments', []);
  const [hasImported, setHasImported] = useLocalStorage('hasImported', false);
  const { state, dispatch } = useAppointmentContext();

  const importAppointments = async () => {
    const response = await fetch('http://localhost:3000/api/import');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const importedAppointments = await response.json();
    if (importedAppointments?.length === 0) return false;
    if (appointments.length > 0) {
      setAppointments([...appointments, ...importedAppointments]);
    } else {
      setAppointments(importedAppointments);
    }
    setHasImported(true);
  };

  const resetAppointments = () => {
    setAppointments([]);
    setHasImported(false);
  };

  const createAppointment = () => dispatch({ type: ActionKind.Create });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-50">
      <Head>
        <title>Appointments Scheduling System</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 container">
        <header className="text-center mb-6">
          <div className="relative">
            <h1 className="px-6 relative inline text-4xl">
              <span className="font-semibold">Appointments</span> Scheduling
              System
            </h1>
          </div>
        </header>
        {!hasImported && (
          <p className="mb-6 text-lg">
            Get started by importing appointments:{' '}
            <button
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-violet-600 bg-white hover:bg-violet-50"
              onClick={importAppointments}
            >
              Import
            </button>
          </p>
        )}
        {!state.showForm && (
          <p className="mb-6 text-lg">
            Add a new appointment:{' '}
            <button
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
              onClick={createAppointment}
            >
              Add appointment
            </button>
          </p>
        )}
        {state.showForm && <CreateOrUpdateAppointment />}
        <AppointmentList appointments={appointments} />
        {(appointments.length > 0 || hasImported) && (
          <p className="mt-8 mb-4 text-lg">
            Reset appointments list:{' '}
            <button
              className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-violet-600 bg-white hover:bg-violet-50"
              onClick={resetAppointments}
            >
              Reset
            </button>
          </p>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t mt-8">
        &copy; Ricard Fredin {dayjs().format(YEAR)}
      </footer>
    </div>
  );
}
