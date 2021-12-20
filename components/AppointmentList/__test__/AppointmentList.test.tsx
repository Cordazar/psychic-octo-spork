/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import { AppointmentWrapper } from '../../../context/appointment';
import appointments from '../../../data/appointments';
import AppointmentList from '../AppointmentList';

function renderComponent() {
  return render(
    <AppointmentWrapper>
      <AppointmentList appointments={appointments} />
    </AppointmentWrapper>
  );
}

describe('AppointmentList', () => {
  it('renders a table', async () => {
    renderComponent();

    const rows = await screen.findAllByTestId('appointment-row');
    expect(rows.length).toEqual(appointments.length);
  });
});
