import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';
import './Balance.css';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export default function Balance(props) {
  const { balance } = props;
  return (
    <Container className="mt-5 mb-5 margin-bot">
      <Card className="text-center balance shadow">
        <Card.Body>
          <Card.Text>
            <h1 className="text-white">
              <NumberFormat data-testid="customer-wallet-balance" displayType="text" value={balance.balance} thousandSeparator prefix="Rp " suffix=",-" />
            </h1>
            <p className="text-white">Use Your Money Wisely</p>
            <p className="text-white">
              Total Amount to Be paid
              {' '}
              <span>
                Rp.
                Rp 2.000.000,-
              </span>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

Balance.propTypes = {
  balance: PropTypes.shape({
    id: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired
  }).isRequired
};
