/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import appointments from '../../../../../data/appointments';
import AppointmentRow from '../AppointmentRow';
import { AppointmentWrapper } from '../../../../../context/appointment';

function renderComponent() {
  return render(
    <AppointmentWrapper>
      <table>
        <tbody>
          <AppointmentRow appointment={appointments[0]} />
        </tbody>
      </table>
    </AppointmentWrapper>
  );
}

describe('AppointmentRow', () => {
  it('renders a row', async () => {
    renderComponent();

    const row = await screen.findByTestId('appointment-row');
    expect(row).toBeInTheDocument();
  });
});
