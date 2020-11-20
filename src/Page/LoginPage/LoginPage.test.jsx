import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('should redirect to profile when submit is clicked', () => {
    render(<LoginPage />);
    const loginButton = screen.getByRole('button');

    userEvent.click(loginButton);
  });
});
