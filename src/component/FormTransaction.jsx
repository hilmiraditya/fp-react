import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import {
  Form, Button, Card
} from 'react-bootstrap';

export default function FormTransaction(props) {
  const [amount, setBalance] = useState(0);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('DEPOSIT');

  const handleBalanceInput = (nameElement) => {
    const nameValue = nameElement.target.value;
    setBalance(nameValue);
  };
  const handleDescriptionInput = (nameElement) => {
    const nameValue = nameElement.target.value;
    setDescription(nameValue);
  };

  const handleTypeSelect = (nameElement) => {
    const nameValue = nameElement.target.value;
    setType(nameValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.handleOnSubmit({ amount, type, description });
    setBalance(0);
    setType('DEPOSIT');
    setDescription('');
  };

  return (
    <Card className="mb-2 shadow">
      <Card.Header as="h5" className="text-center">New Transaction</Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit} role="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Balance</Form.Label>
            <Form.Control type="number" min="0" placeholder="Enter Amount" data-testid="balance-form" value={amount} onChange={handleBalanceInput} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} type="text" placeholder="Enter Description" data-testid="description-form" value={description} onChange={handleDescriptionInput} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <select data-testid="select-form" className="form-control" defaultValue={type} onChange={handleTypeSelect}>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAW">Withdraw</option>
            </select>
          </Form.Group>
          <Button variant="outline-secondary" type="submit" data-testid="submit-button" block>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
FormTransaction.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired
};
