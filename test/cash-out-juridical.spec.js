const CashOutJuridical = require('./../src/cash-out-juridical');

let config = {fee: 0.3, minAmount: 0.5, currency: 'EUR'};

test('should calculate taxes according to juridical config', function () {
    let juridicalCashOut = {
        date: '2016-01-05',
        user_id: 1,
        user_type: 'juridical',
        type: 'cash_out',
        operation: {amount: 200.00, currency: 'EUR'},
    };

    let cashOutJuridicalTransaction = new CashOutJuridical(config);
    expect(cashOutJuridicalTransaction.process(juridicalCashOut.operation.amount)).toBe(0.6);
});

test('should set max value', function () {
    let juridicalCashOut = {
        date: '2016-01-05',
        user_id: 1,
        user_type: 'juridical',
        type: 'cash_out',
        operation: {amount: 100.00, currency: 'EUR'},
    };

    let cashOutJuridicalTransaction = new CashOutJuridical(config);
    expect(cashOutJuridicalTransaction.process(juridicalCashOut.operation.amount)).toBe(0.5);
});
