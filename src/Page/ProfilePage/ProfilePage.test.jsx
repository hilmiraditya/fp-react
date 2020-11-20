import {
  act, render, screen
} from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import ProfilePage from './ProfilePage';

jest.mock('axios');

describe('ProfilePage', () => {
  it('should render profile page containing name of customer alice', async () => {
    const customer = { id: 1, name: 'Alice', phone: '0853123123' };
    axios.get.mockResolvedValue({
      data: customer
    });

    await act(async () => render(<ProfilePage />));

    const nameCustomer = screen.getByTestId('card-title');
    expect(nameCustomer).toBeInTheDocument();
    expect(nameCustomer).toHaveTextContent(customer.name);
  });

  it('should render profile page containing wallet balance from customer alice', async () => {
    const customer = { id: 1, name: 'Alice', phone: '0853123123' };
    axios.get.mockResolvedValue({
      data: customer
    });
    const customerWallet = {
      id: 2,
      balance: '200000'
    };
    axios.get.mockResolvedValue({
      data: customerWallet
    });
    const formatBalance = Number(customerWallet.balance).toLocaleString('id-ID');

    await act(async () => render(
      <ProfilePage />
    ));

    const customerWalletElement = screen.getByTestId('customer-wallet-balance');
    expect(customerWalletElement).toBeInTheDocument();
    expect(customerWalletElement).toHaveTextContent(formatBalance);
  });
});
