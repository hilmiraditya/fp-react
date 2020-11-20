import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

import {
  Form, Card, Container
} from 'react-bootstrap';

export default function FilterTransaction(props) {
  const { handleFilterChange, handleSortFilterChange } = props;
  return (
    <Container data-testid="transaction-filter">
      <Card className="mb-2 shadow">
        <Card.Body>
          <Form role="form">
            <Form.Group>
              <Form.Label>Filter Transaction</Form.Label>
              <Form.Control type="text" placeholder="Enter query" data-testid="filter-form" onChange={handleFilterChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sort Transaction</Form.Label>
              <select data-testid="select-sort-form" className="form-control" defaultValue="default" onChange={handleSortFilterChange}>
                <option value="default">--Select--</option>
                <option value="date">Date</option>
                <option value="description">Description</option>
                <option value="amount">Amount</option>
              </select>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

FilterTransaction.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleSortFilterChange: PropTypes.func.isRequired
};
