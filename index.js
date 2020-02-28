const readFile = require('./src/utils/read-data');
const TransactionProcessor = require('./src/transaction-processor');
const fetchCommissionConfigs = require('./config');

(async () => {

    if (!process.argv[2]) {
        console.error('JSON file not provided');
        process.exit(1);
        return;
    }
    const file = process.argv[2];
    const inputData = readFile(file);

    if (inputData.length === 0) {
        console.log(`File that you have provided doesn't exist or the content of it is bad!`);
    } else {
        const commissionConfigs = await fetchCommissionConfigs();
        const transactionProcessor = new TransactionProcessor(commissionConfigs);
        inputData.forEach(transaction => {
            process.stdout.write(`${transactionProcessor.processTransaction(transaction, inputData)}\n`);
        })

    }

})();


