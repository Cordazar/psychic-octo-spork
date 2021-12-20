import React from 'react';
import Head from 'next/head';
import dayjs from 'dayjs';

import AppointmentList from '../components/AppointmentList/AppointmentList';
import { YEAR } from '../constants/dateTime';
import useLocalStorage from '../hooks/useLocalStorage';
import CreateOrUpdateAppointment from '../components/CreateOrUpdateAppointment/CreateOrUpdateAppointment';
import { ActionKind, useAppointmentContext } from '../context/appointment';
import Button, { ButtonType } from '../components/Button/Button';

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
            <h1 className="px-6 relative inline text-4xl" data-testid="heading">
              <span className="font-semibold">Appointments</span> Scheduling
              System
            </h1>
          </div>
        </header>
        {!hasImported && (
          <p key="import-appointments" className="mb-6 text-lg">
            Get started by importing appointments:{' '}
            <Button onClick={importAppointments}>Import</Button>
          </p>
        )}
        {state.showForm ? (
          <CreateOrUpdateAppointment />
        ) : (
          <p key="add-appointment" className="mb-6 text-lg">
            Add a new appointment:{' '}
            <Button variant={ButtonType.Primary} onClick={createAppointment}>
              Add appointment
            </Button>
          </p>
        )}
        <AppointmentList appointments={appointments} />
        {(appointments.length > 0 || hasImported) && (
          <p className="mt-8 mb-4 text-lg">
            Reset appointments list:{' '}
            <Button onClick={resetAppointments}>Reset</Button>
          </p>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t mt-8">
        &copy; Ricard Fredin {dayjs().format(YEAR)}
      </footer>
    </div>
  );
}
