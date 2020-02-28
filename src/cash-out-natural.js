const calculateTax = require('./utils/calculate-tax');

class CashOutNatural {
  constructor(config) {
    this.config = config;
  }

  process({ operation: { amount } }, total) {
    return calculateTax(this.getTaxableAmount(total, amount), this.config.fee);
  }

  isLimitReached(total) {
    return total > this.config.weekLimit;
  }

  getTaxableAmount(total, amount) {
    if (this.isLimitReached(total)) {
      return Math.min(total - this.config.weekLimit, amount);
    }
    return 0;
  }
}

module.exports = CashOutNatural;
