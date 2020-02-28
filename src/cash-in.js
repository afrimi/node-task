const calculateTax = require('./utils/calculate-tax');

class CashIn {
    constructor(config) {
        this.config = config;
    }

    process(amount) {

        const taxes = calculateTax(amount, this.config.fee);

        return (taxes > this.config.maxAmount) ? this.config.maxAmount : taxes;

    }

}

module.exports = CashIn;
