/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import CreateOrUpdateAppointment from '../CreateOrUpdateAppointment';
import { AppointmentWrapper } from '../../../context/appointment';

function renderComponent() {
  return render(
    <AppointmentWrapper>
      <CreateOrUpdateAppointment />
    </AppointmentWrapper>
  );
}

describe('CreateOrUpdateAppointment', () => {
  it('renders the form', async () => {
    renderComponent();

    const form = await screen.findByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('adds to localstorage', () => {
    const spyLocalStorageAdd = jest.spyOn(localStorage, 'setItem');
    const { getByPlaceholderText, getByText } = renderComponent();
    const nameInput = getByPlaceholderText(/name/i);

    fireEvent.change(nameInput, { target: { value: 'Test Testsson' } });
    fireEvent.click(getByText(/Add/i));
    expect(spyLocalStorageAdd).toBeTruthy();
    expect(localStorage.getItem('appointments')).toEqual(
      JSON.stringify([
        {
          name: 'Test Testsson',
          email: '',
          phoneNumber: '',
          date: '',
          startTime: null,
          endTime: null,
        },
      ])
    );
  });
});
