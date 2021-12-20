/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';

import Home from '../index';
import { AppointmentWrapper } from '../../context/appointment';
import appointments from '../../data/appointments';

const fetchMock = fetch as FetchMock;

function renderHome() {
  return render(
    <AppointmentWrapper>
      <Home />
    </AppointmentWrapper>
  );
}

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  it('renders a heading', async () => {
    renderHome();

    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual('Appointments Scheduling System');
  });

  it('imports appointments', async () => {
    renderHome();

    fetchMock.mockResponseOnce(JSON.stringify(appointments));
    let rows = await screen.queryAllByTestId('appointment-row');
    expect(rows.length).toEqual(0);

    await fireEvent.click(screen.getByText(/Import/i, { selector: 'button' }));
    rows = await screen.findAllByTestId('appointment-row');
    expect(rows.length).toEqual(9);
  });

  it('removes an appointment', async () => {
    renderHome();

    fetchMock.mockResponseOnce(JSON.stringify(appointments));
    let rows = screen.queryAllByTestId('appointment-row');
    expect(rows.length).toEqual(0);

    await fireEvent.click(screen.getByText(/Import/i, { selector: 'button' }));
    rows = await screen.findAllByTestId('appointment-row');
    expect(rows.length).toEqual(appointments.length);

    await fireEvent.click(rows[0].querySelector('td:last-child button'));
    rows = await screen.findAllByTestId('appointment-row');
    expect(rows.length).toEqual(appointments.length - 1);
  });
});
