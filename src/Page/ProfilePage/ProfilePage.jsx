import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';
import './profile-page.css';
import axios from 'axios';
import Balance from '../../component/Balance';

export default function ProfilePage() {
  const [customer, setCustomer] = useState({});
  const [balance, setBalance] = useState({});

  const fetchUser = async () => {
    const responseUser = await axios.get('http://localhost:3000/customers/1');
    setCustomer(responseUser.data);
    const wallet = await axios.get(`http://localhost:3000/wallets/${responseUser.data.walletsId}`);
    setBalance(wallet.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Container className="mt-5" data-testid="profile-page">
        <Card className="text-center shadow">
          <img className="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWnjRAmUIVLsafOvI31gM89BvE9DPL5lHljg&usqp=CAU" alt="..." />
          <Card.Body className="my-5">
            <Card.Title className="mt-5" data-testid="card-title">{customer.name}</Card.Title>
            <Card.Text>
              “If the code and the comments do not match, possibly both are incorrect.”
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Balance balance={balance} />
    </>
  );
}
