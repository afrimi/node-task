const moment = require('moment');

const TransactionTypes = require('./transaction-types');
const UserTypes = require('./user-types');
const CashIn = require('./cash-in');
const CashOutJuridical = require('./cash-out-juridical');
const CashOutNatural = require('./cash-out-natural');

class TransactionProcessor {
  constructor(config) {
    this.config = config;
  }

  processTransaction(transaction, transactions) {
    let calculatedCommission = 0;

    switch (transaction.type) {
      case TransactionTypes.CASH_IN: {
        const cashIn = new CashIn(this.config.cashIn);
        calculatedCommission = cashIn.process(transaction.operation.amount);
        break;
      }
      case TransactionTypes.CASH_OUT: {
        switch (transaction.user_type) {
          case UserTypes.NATURAL: {
            const cashOutNatural = new CashOutNatural(
              this.config.cashOut.natural
            );
            const filteredTransactions = this.filterCashOutWeekLimit(
              transaction,
              transactions
            );
            const totalWeekAmount = this.calculateSum(filteredTransactions);
            calculatedCommission = cashOutNatural.process(
              transaction,
              totalWeekAmount
            );
            break;
          }

          case UserTypes.JURIDICAL: {
            const cashOutJuridical = new CashOutJuridical(
              this.config.cashOut.legal
            );
            calculatedCommission = cashOutJuridical.process(
              transaction.operation.amount
            );
            break;
          }
        }
      }
    }
    return calculatedCommission.toFixed(2);
  }

  filterCashOutWeekLimit(transaction, transactions) {
    return transactions.filter(
      operation =>
        operation.type === TransactionTypes.CASH_OUT &&
        operation.user_type === UserTypes.NATURAL &&
        operation.user_id === transaction.user_id &&
        this.getWeek(operation.date) === this.getWeek(transaction.date) &&
        operation.date <= transaction.date
    );
  }

  calculateSum(filteredTransactions) {
    return filteredTransactions.reduce(
      (acc, curr) => acc + curr.operation.amount,
      0
    );
  }

  getWeek(date) {
    return moment(date, 'YYYY-MM-DD').isoWeek();
  }
}

module.exports = TransactionProcessor;
