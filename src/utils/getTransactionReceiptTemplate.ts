import { Transaction } from '@/types/transaction';
import { amountToWords, formatAmount, formatDateString } from './helpers';

export default function getTransactionReceiptTemplate(transaction: Transaction) {
  // Dumping the html template here because the alternative is to create a nodejs server to load the file

  if (!transaction) {
    throw new Error('No Transaction Provided');
  }
  let htmlTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Transaction Receipt</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

      :root {
        --light-grey: #637381;
        --lighter-grey: rgba(145, 158, 171, 0.3);
        --green: #22c55e;
        --dark-grey: #212b36;
        --primary: #1977f2;
        --danger: #B71D18
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        max-width: 640px;
        background: white;
        margin: 0 auto;
        font-family: 'Inter', sans-serif;
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }

      .receipt {
        border: 1px solid lightgrey;
        min-height: 100dvh;
        width: 100%;
        padding: 54px;
        text-align: center;
      }

      .katsu-logo {
        height: 80px;
        width: 190px;
      }

      .heading {
        margin: 24px 0;
      }

      .heading h2 {
        font-weight: 700;
        font-size: 32px;
        margin-bottom: 16px;
      }

      .heading p,
      .amount-words {
        color: var(--light-grey);
        font-weight: 400;
        font-size: 16px;
      }

      .amount-details {
        padding: 24px 0;
        border-top: 1px dashed var(--lighter-grey);
      }

      .status {
        text-transform: capitalize;
      }

      .status-APPROVED {
        color: var(--green);
      }
     
      .status-FAILED {
        color: var(--danger);
      }

      .status-REJECTED {
        color: var(--danger);
      }

      .amount {
        color: var(--dark-grey);
        font-size: 48px;
        margin: 16px 0;
      }

      .title {
        font-weight: 700;
        font-size: 18px;
      }

      .value {
        font-weight: 400;
        color: var(--light-grey);
      }

      .transaction-details {
        margin: 24px 0;
        padding: 36px 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border: 1px dashed var(--lighter-grey);
        border-left: none;
        border-right: none;
      }

      .line-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--lighter-grey);
        padding: 14px 0 8px;
      }

      .line-item:last-of-type {
        border: none;
      }

      .value {
        text-align: right;
      }

      .katsu-ad {
        display: flex;
        align-items: center;
        text-align: left;
        gap: 20px;
        line-height: 48px;
        padding-top: 32px;
      }

      .katsu-ad p {
        font-size: 32px;
        font-weight: 700;
      }

      .katsu-ad p span {
        color: var(--primary);
      }

      .qr-code {
        height: 127px;
        min-width: 127px;
      }

      .footer-text {
        font-size: 14px;
        color: var(--light-grey);
        margin-top: 36px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div class="receipt">
      <!-- In case you are wondering why the base64 strings are used here instead of file paths
      Puppeteer launches a headless chrome instance to render this html and it doesn't have access to our filesystem directly.
      So we either have to hardcode the base64strings of the files or we use a nodejs server to serve the files
      It's easier to hardcode these base64 strings because we don't have to worry about size since we are running this file on the server
      -->
      <img
        alt="katsu-logo"
        src="data:image/webp;base64,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"
        class="katsu-logo"
      />

      <div class="heading">
        <h2>Transaction Receipt</h2>
        <p>{{time-generated}}</p>
      </div>

      <div class="amount-details">
        <p class="status {{status-class}}">{{status}}</p>
        <h1 class="amount">{{amount}}</h1>
        <p class="amount-words">{{amount-words}}</p>
      </div>

      <div class="transaction-details">
        <div class="line-item">
          <h4 class="title">Sender name:</h4>
          <p class="value">{{sender-name}}</p>
        </div>

        <div class="line-item">
          <h4 class="title">Receiver name:</h4>
          <p class="value">{{receiver-name}}</p>
        </div>

        <div class="line-item">
          <h4 class="title">Receiver bank account:</h4>
          <p class="value">{{receiver-bank-account}}</p>
        </div>

        <div class="line-item">
          <h4 class="title">Receiver bank:</h4>
          <p class="value">{{receiver-bank}}</p>
        </div>

        <div class="line-item">
          <h4 class="title">Transaction ID:</h4>
          <p class="value">{{transaction-id}}</p>
        </div>

        <div class="line-item">
          <h4 class="title">Transaction Date:</h4>
          <p class="value">{{transaction-date}}</p>
        </div>

        <div class="line-item">
          <h4 class="title">Transaction Type:</h4>
          <p class="value">{{transaction-type}}</p>
        </div>

        <div class="line-item">
          <h4 class="title">Narration:</h4>
          <p class="value">{{narration}}</p>
        </div>
      </div>

      <div class="katsu-ad">
        <p>Visit the <span> Katsu MFB website </span> to get access to our platform</p>

        <img
          src="data:image/png;base64,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"
          alt="katsu-qr-code"
          class="qr-code"
        />
      </div>

      <p class="footer-text">
      </p>
    </div>
  </body>
</html>
`;

  // Replace placeholders in the template with actual transaction data

  htmlTemplate = htmlTemplate
    .replace('{{amount}}', formatAmount(transaction.amount))
    .replace('{{time-generated}}', formatDateString(new Date().toISOString()))
    .replace('{{amount-words}}', amountToWords(transaction.amount))
    .replace('{{sender-name}}', transaction?.senderDetail?.accountName || '-')
    .replace('{{receiver-name}}', transaction?.receiverDetail?.accountName || '-')
    .replace('{{receiver-bank-account}}', transaction?.receiverDetail?.accountNumber || '-')
    .replace('{{receiver-bank}}', transaction?.receiverDetail?.bankName || '-')
    .replace('{{transaction-id}}', transaction?.transactionId || '-')
    .replace('{{narration}}', transaction?.narration || '-')
    .replace('{{status}}', transaction?.transactionStatus?.toLowerCase() || '-')
    .replace('{{status-class}}', `status-${transaction?.transactionStatus}` || '-')
    .replace('{{transaction-type}}', transaction?.transactionType || '-')
    .replace('{{transaction-date}}', formatDateString(transaction.createdDate) || '-');

  return htmlTemplate;
}
