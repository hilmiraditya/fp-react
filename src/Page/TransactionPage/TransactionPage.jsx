import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import FormTransaction from '../../component/FormTransaction';
import Transaction from '../../component/Transaction';
import FilterTransaction from '../../component/FilterTransaction';
import Alert from '../../component/alert/Alert';

export default function TransactionPage() {
  const [transactions, setTransaction] = useState([]);
  const [filterTransaction, setFilterTransaction] = useState('');
  const [walletUser, setWalletUser] = useState({});
  const [message, setMessage] = useState('');

  const fetchTransaction = async () => {
    const responseUser = await axios.get('http://localhost:3000/customers/1');
    const { data } = await axios.get(`http://localhost:3000/wallets/${responseUser.data.walletsId}`);
    setWalletUser(data);
    const transactionUser = await axios.get(`http://localhost:3000/wallets/${responseUser.data.walletsId}/transactions`);
    setTransaction(transactionUser.data.map(({
      id, amount, type, date, description
    }) => ({
      id, amount, type, date, description
    })));
  };

  useEffect(() => {
    fetchTransaction().catch(() => {
      setMessage('servernya sedang rusak kaka, silahkan kembali lagi nanti :(');
    });
  }, []);

  const updateWallet = async (transaction, type) => {
    let { amount } = transaction;
    if (type === 'WITHDRAW') {
      amount = -amount;
    }
    const newWallet = {};
    newWallet.id = walletUser.id;
    newWallet.balance = walletUser.balance + (parseInt(amount, 10));
    await axios.patch(`http://localhost:3000/wallets/${walletUser.id}`, newWallet);
  };

  const addTransaction = async (transaction) => {
    if (walletUser.balance < transaction.amount && transaction.type === 'WITHDRAW') {
      setMessage('isi dulu doang saldonya, jngan narik narik terus :)');
      return;
    }
    const dateNow = new Date();
    const dataTransaction = transaction;
    dataTransaction.date = `${dateNow.getUTCFullYear()}-${dateNow.getUTCMonth() + 1}-${dateNow.getUTCDate()}`;
    const { data } = await axios.post(`http://localhost:3000/wallets/${walletUser.id}/transactions`, dataTransaction);
    setTransaction([...transactions, data]);
    updateWallet(dataTransaction, dataTransaction.type);
    setMessage('terima kasih kaka sudah melakukan transaksi :)');
  };

  const handleOnSubmit = (transaction) => {
    addTransaction(transaction);
  };

  const filteredTransaction = transactions.filter(
    ((transaction) => transaction
      .description.toLowerCase().includes(filterTransaction.toLowerCase())
       || transaction.amount.toString().includes(filterTransaction))
  );

  const handleFilterChange = (event) => {
    setFilterTransaction(event.target.value.toLowerCase());
  };

  const handleSortFilterChange = (event) => {
    if (event.target.value === 'amount') {
      const sortedTransaction = filteredTransaction.sort(
        (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
      );
      setTransaction(sortedTransaction);
    }
    if (event.target.value === 'date') {
      const sortedTransaction = filteredTransaction.sort(
        (a, b) => {
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          return 0;
        }
      );
      setTransaction(sortedTransaction);
    }
    if (event.target.value === 'description') {
      const sortedTransaction = filteredTransaction.sort(
        (a, b) => {
          if (a.description < b.description) return 1;
          if (a.description > b.description) return -1;
          return 0;
        }
      );
      setTransaction(sortedTransaction);
    }
  };

  return (
    <Container className="mt-5 mb-5" data-testid="transaction-page">
      {message && <Alert message={message} type="danger" />}
      <Row>
        <Col md={6}>
          <FormTransaction handleOnSubmit={handleOnSubmit} />
        </Col>
        <Col md={6}>
          <FilterTransaction
            handleFilterChange={handleFilterChange}
            handleSortFilterChange={handleSortFilterChange}
          />
          {filteredTransaction.map((transaction) => (
            <Transaction key={transaction.id} content={transaction} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
