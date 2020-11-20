import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

export default function ErrorAlert(props) {
  const { message } = props;

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss} data-testid="alert-notification">
      {message}
    </Alert>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired
};
