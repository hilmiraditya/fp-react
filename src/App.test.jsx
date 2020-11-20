import React from 'react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import App from './App';

jest.mock('axios');

describe('App', () => {
  beforeEach(async () => {
    const customer = { id: 1, name: 'Alice', phone: '0853123123' };
    axios.get.mockResolvedValue({
      data: customer
    });
    const transaction = [
      {
        id: 1,
        wallet_id: 2,
        amount: 300000,
        type: 'DEPOSIT',
        description: 'Tabungan Ibu',
        date: '2020-11-07T08:08:46+0000'
      },
      {
        id: 2,
        wallet_id: 2,
        amount: 10000,
        type: 'WITHDRAW',
        description: 'Tabungan ayah',
        date: '2020-11-07T08:08:46+0000'
      }
    ];
    axios.get.mockResolvedValue({
      data: transaction
    });
  });
  it('should render transaction page when customer click button transaction navigation from profile page', async () => {
    await act(async () => render(<App />));
    const navigationTransactionPage = screen.getByTestId('transaction-nav');

    await act(async () => userEvent.click(navigationTransactionPage));

    const transactionPageElement = screen.getByTestId('transaction-page');
    expect(transactionPageElement).toBeInTheDocument();
  });

  it('should render home page when customer click button home navigation from profile page', async () => {
    await act(async () => render(<App />));
    const navigationTransactionPage = screen.getByTestId('home-nav');

    await act(async () => userEvent.click(navigationTransactionPage));

    const homePageElement = screen.getByTestId('profile-page');
    expect(homePageElement).toBeInTheDocument();
  });
});
