import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar, Nav, Form, FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageIcon from '../wallet-ico.png';

export default function navigation() {
  return (
    <Navbar bg="white" variant="light">
      <Navbar.Brand><img className="icon" src={ImageIcon} alt="..." /></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} data-testid="home-nav" to="/profile">Home</Nav.Link>
        <Nav.Link as={Link} data-testid="transaction-nav" to="/transaction">Transaction</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
    </Navbar>
  );
}
