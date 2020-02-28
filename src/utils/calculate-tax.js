
const calculateTaxValue = (amount, fee) => {
    const taxValue = amount * fee / 100;

    return Math.ceil(taxValue * 100) / 100;
};

module.exports = calculateTaxValue;
