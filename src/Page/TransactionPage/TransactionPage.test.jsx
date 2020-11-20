import {
  act, render, screen
} from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import TransactionPage from './TransactionPage';

jest.mock('axios');

describe('TransactionPage', () => {
  const firstIndex = 0;
  const secondIndex = 1;
  const customer = { id: 1, name: 'Alice', phone: '0853123123' };
  const transaction = [
    {
      id: 1,
      walletId: 2,
      amount: 30000,
      type: 'DEPOSIT',
      date: '2020-11-07T08:08:46+0000',
      description: 'Buat Tabungan masa depan'
    },
    {
      id: 2,
      walletId: 2,
      amount: 30000,
      type: 'DEPOSIT',
      date: '2020-11-07T08:08:46+0000',
      description: 'Buat Tabungan'
    },
    {
      id: 3,
      walletId: 2,
      amount: 30000,
      type: 'DEPOSIT',
      date: '2020-11-07T08:08:46+0000',
      description: 'Buat Tabungan'
    }
  ];
  beforeEach(async () => {
    axios.get.mockResolvedValue({
      data: customer
    });
    axios.get.mockResolvedValue({
      data: transaction
    });
    return act(async () => render(<TransactionPage />));
  });

  it('should render transaction page and containing transaction page component', async () => {
    const nameCustomer = screen.getByTestId('transaction-page');
    expect(nameCustomer).toBeInTheDocument();
  });
  it('should render transaction page and containing list transaction from customer', async () => {
    const customerListTransactionElement = screen.getAllByTestId('transaction-content');
    expect(customerListTransactionElement.length).toEqual(transaction.length);
  });
  it('customer should filter descrption name Buat Tabungan and display filter transaction ', async () => {
    const inputFilterElement = screen.getByTestId('filter-form');
    userEvent.type(inputFilterElement, 'Buat Tabungan');

    const filteredContactName = screen.getAllByText('Buat Tabungan');
    expect(filteredContactName[firstIndex]).toBeInTheDocument();
    expect(filteredContactName[secondIndex]).toBeInTheDocument();
  });
  it('customer should sort filter amount transaction ', async () => {
    const inputSortFilterElement = screen.getByTestId('select-sort-form');
    userEvent.selectOptions(inputSortFilterElement, ['amount']);

    const filteredContactName = screen.getAllByTestId('amount-wallet-transaction');
    expect(filteredContactName[firstIndex]).toBeInTheDocument();
    expect(filteredContactName[secondIndex]).toBeInTheDocument();
  });
  it('customer should sort filter date transaction ', async () => {
    const inputSortFilterElement = screen.getByTestId('select-sort-form');
    userEvent.selectOptions(inputSortFilterElement, ['date']);

    const filteredContactName = screen.getAllByTestId('amount-wallet-transaction');
    expect(filteredContactName[firstIndex]).toBeInTheDocument();
    expect(filteredContactName[secondIndex]).toBeInTheDocument();
  });

  it('customer should sort filter description transaction ', async () => {
    const inputSortFilterElement = screen.getByTestId('select-sort-form');
    userEvent.selectOptions(inputSortFilterElement, ['description']);

    const filteredContactName = screen.getAllByTestId('amount-wallet-transaction');
    expect(filteredContactName[firstIndex]).toBeInTheDocument();
    expect(filteredContactName[secondIndex]).toBeInTheDocument();
  });
});

describe('Transaction Page', () => {
  it('customer add transaction and deposit showed in list transaction', async () => {
    const transaction = {
      walletId: 2,
      amount: 30000,
      type: 'DEPOSIT',
      date: '2020-11-07T08:08:46+0000',
      description: 'Buat Tabungan masa depan'
    };
    when(axios.post).calledWith('http://localhost:3000/wallets/2/transactions').mockResolvedValue(
      transaction
    );
    act(async () => render(<TransactionPage />));
    const buttonSubmit = screen.getByTestId('submit-button');
    const balanceInputElement = screen.getByTestId('balance-form');
    const selectedElement = screen.getByTestId('select-form');
    const descriptionElement = screen.getByTestId('description-form');
    userEvent.type(balanceInputElement, '10000');
    userEvent.type(descriptionElement, 'Buat Tabungan dini');
    userEvent.selectOptions(selectedElement, ['DEPOSIT']);
    await act(async () => userEvent.click(buttonSubmit));

    when(axios.get).calledWith('http://localhost:3000/wallets/2/transactions').mockResolvedValue(
      transaction
    );

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
  it('customer add transaction and withdraw showed in list transaction', async () => {
    const transaction = {
      walletId: 2,
      amount: 300000000,
      type: 'WITHDRAW',
      date: '2020-11-07T08:08:46+0000',
      description: 'Buat Tabungan masa depan'
    };
    const wallet = {
      id: 2,
      balance: 20000
    };
    when(axios.post).calledWith('http://localhost:3000/wallets/2/transactions').mockResolvedValue(
      transaction
    );
    act(async () => render(<TransactionPage />));
    const buttonSubmit = screen.getByTestId('submit-button');
    const balanceInputElement = screen.getByTestId('balance-form');
    const selectedElement = screen.getByTestId('select-form');
    const descriptionElement = screen.getByTestId('description-form');
    userEvent.type(balanceInputElement, '30000');
    userEvent.type(descriptionElement, 'Buat Tabungan masa depan');
    userEvent.selectOptions(selectedElement, ['WITHDRAW']);
    await act(async () => userEvent.click(buttonSubmit));

    when(axios.get).calledWith('http://localhost:3000/wallets/2/transactions').mockResolvedValue(
      transaction
    );

    when(axios.patch).calledWith('http://localhost:3000/wallets/2}').mockResolvedValue(
      wallet
    );

    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  describe('TransactionPage', () => {
    it('should display error cnt reach server', async () => {
      await act(async () => render(
        <TransactionPage />
      ));

      const buttonSubmit = screen.getByTestId('submit-button');
      const balanceInputElement = screen.getByTestId('balance-form');
      const selectedElement = screen.getByTestId('select-form');
      const descriptionElement = screen.getByTestId('description-form');

      const customer = {
        id: 1,
        name: 'Pobi Rizki',
        walletsId: 2
      };

      axios.get
        .mockResolvedValue({
          data: customer
        });

      userEvent.type(balanceInputElement, '30000');
      userEvent.type(descriptionElement, 'Buat Tabungan masa depan');
      userEvent.selectOptions(selectedElement, ['WITHDRAW']);
      await act(async () => userEvent.click(buttonSubmit));

      const insufficientBalanceError = await screen.findAllByTestId('alert-notification');

      expect(insufficientBalanceError[0]).toHaveTextContent('servernya sedang rusak kaka, silahkan kembali lagi nanti :(');
    });
    it('should display notifaction succes add transaction', async () => {
      await act(async () => render(
        <TransactionPage />
      ));

      const buttonSubmit = screen.getByTestId('submit-button');
      const balanceInputElement = screen.getByTestId('balance-form');
      const selectedElement = screen.getByTestId('select-form');
      const descriptionElement = screen.getByTestId('description-form');

      axios.post
        .mockResolvedValue({
          data: {
            amount: '30000',
            type: 'WITHDRAW',
            description: 'Buat Tabungan masa depan',
            walletId: '2'
          }
        });

      userEvent.type(balanceInputElement, '30000');
      userEvent.type(descriptionElement, 'Buat Tabungan masa depan');
      userEvent.selectOptions(selectedElement, ['WITHDRAW']);
      await act(async () => userEvent.click(buttonSubmit));

      await act(async () => render(
        <TransactionPage />
      ));

      const insufficientBalanceError = await screen.findAllByTestId('alert-notification');

      expect(insufficientBalanceError[0]).toHaveTextContent('terima kasih kaka sudah melakukan transaksi :)');
    });
  });
});
