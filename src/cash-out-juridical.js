const calculateTax = require('./utils/calculate-tax');

class CashOutJuridical {
    constructor(config) {
        this.config = config;
    }

    process(amount) {
        const taxes = calculateTax(amount, this.config.fee);

        return (taxes < this.config.minAmount) ? this.config.minAmount : taxes;
    }

}

module.exports = CashOutJuridical;
