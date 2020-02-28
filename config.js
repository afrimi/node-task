const fetch = require('node-fetch');

const fetchCommissionConfigs = async function fetchConfigurations() {
  const fetchApi = function fetchRemoteApi(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  const cashIn = fetchApi(
    'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in'
  );
  const cashOutNatural = fetchApi(
    'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural'
  );
  const cashOutLegal = fetchApi(
    'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical'
  );

  const [
    cashInConfig,
    cashOutNaturalConfig,
    cashOutLegalConfig
  ] = await Promise.all([cashIn, cashOutNatural, cashOutLegal]);

  return {
    cashIn: {
      fee: cashInConfig.percents,
      maxAmount: cashInConfig.max.amount,
      currency: cashInConfig.max.currency
    },
    cashOut: {
      natural: {
        fee: cashOutNaturalConfig.percents,
        weekLimit: cashOutNaturalConfig.week_limit.amount,
        currency: cashOutNaturalConfig.week_limit.currency
      },
      legal: {
        fee: cashOutLegalConfig.percents,
        minAmount: cashOutLegalConfig.min.amount,
        currency: cashOutLegalConfig.min.currency
      }
    }
  };
};

module.exports = fetchCommissionConfigs;
