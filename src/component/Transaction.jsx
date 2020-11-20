import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';
import './transaction.css';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Moment from 'moment';

export default function Transaction(props) {
  const { content } = props;

  const styleSuccess = content.type === 'WITHDRAW' ? 'history-wrapper-status--danger mb-2' : 'history-wrapper-status--success mb-2';

  return (
    <Container data-testid="transaction-content">
      <Card className={styleSuccess}>
        <Card.Body>
          <div className="history-title">
            <div id="history-transaction-type" className="history-status">
              {content.type}
            </div>
            <div className="history-amount">
              <span className="history-amount-value" id="history-transaction-balance" data-testid="amount-wallet-transaction">
                <NumberFormat displayType="text" value={content.amount} thousandSeparator prefix="Rp " suffix=",-" />
              </span>
            </div>
          </div>
          <div className="invoice-wrapper small">
            Invoice Id :
            {' '}
            <span className="invoice-id bold" id="invoiceId">12312312</span>
          </div>
          <div className="description-wrapper small">
            <div className="description-label">
              Description :
            </div>
            <div>
              <span className="bold" id="invoiceId">{content.description}</span>
            </div>
          </div>
          <div className="remaining-amount-wrapper">
            <div className="remaining-amount small">
              Remaining amount :
              {' '}
              <span className="bold remaining-amount-value" id="remainingAmountValue">Rp. 12,312,312</span>
            </div>
            <div className="remaining-date small">
              {Moment(content.date).format('DD MMM Y')}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
Transaction.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};
