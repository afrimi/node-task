const CashIn = require('./../src/cash-in');
const calculateTax = require('./../src/utils/calculate-tax');
let config = {fee: 0.03, maxAmount: 5, currency: 'EUR'};

test('should calculate taxes according to config', function () {
    let transaction = {
        date: '2016-01-05',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_in',
        operation: {amount: 200.00, currency: 'EUR'},
    };

    let cashInTransaction = new CashIn(config);
    expect(cashInTransaction.process(transaction.operation.amount)).toBe(0.06);
});

it('should set max value', function () {
    let transaction = {
        date: '2016-01-05',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_in',
        operation: {amount: 200000.00, currency: 'EUR'},
    };

    let cashInTransaction = new CashIn(config);
    expect(cashInTransaction.process(transaction.operation.amount)).toBe(5);
});

test('should return ceiled number', () => {
    const taxes = calculateTax(345, config.fee);
    expect(taxes).toBe(0.11)
});
