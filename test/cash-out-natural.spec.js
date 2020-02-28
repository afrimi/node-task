const CashOutNatural = require('./../src/cash-out-natural');
const TransactionProcessor = require('./../src/transaction-processor');

describe('CashOutNaturalTransaction', function () {
    let config = {fee: 0.3, weekLimit: 1000, currency: 'EUR'};
    test('should calculate weekly limit ', function () {
        const transaction0 = {
            date: '2016-11-14',
            user_id: 2,
            user_type: 'natural',
            type: 'cash_out',
            operation: {amount: 200.00, currency: 'EUR'},
        };
        const transaction1 = {
            date: '2016-11-14',
            user_id: 2,
            user_type: 'natural',
            type: 'cash_out',
            operation: {amount: 300.00, currency: 'EUR'},
        };
        const transaction2 = {
            date: '2016-11-15',
            user_id: 2,
            user_type: 'natural',
            type: 'cash_out',
            operation: {amount: 1000.00, currency: 'EUR'},
        };

        const transactions = [transaction0, transaction1, transaction2];

        const transactionProcessor = new TransactionProcessor(config);
        const filteredTransactions = transactionProcessor.filterCashOutWeekLimit(transaction2, transactions);
        const totalWeekUsage = transactionProcessor.calculateSum(filteredTransactions);
        const cashOutNatural = new CashOutNatural(config);
        const result = cashOutNatural.process(transaction2, totalWeekUsage);
        expect(result).toBe(1.5);
    });
});
