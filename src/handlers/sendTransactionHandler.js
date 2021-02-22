const BigNumber = require('bignumber.js');

function schema(config) {
  return {
    params: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
        }
      },
    },
    body: {
      type: 'object',
      properties: {
        value: {
          type: 'number',
        },
        mnemonic: {
          type: 'string'
        },
      },
    },
    required: ['address', 'value', 'mnemonic'],
  };
}

const toWei = (number) => { //Eth to wei
  const WEIS_IN_ETHER = BigNumber(10).pow(18);
  return BigNumber(number).times(WEIS_IN_ETHER).toFixed();
};

function handler({ identityService }) {
  return async function (req) {
    const web3 = await identityService.getWeb3WithIdentity(req.body.mnemonic);
    const accounts = await web3.eth.getAccounts();
    return await web3.eth.sendTransaction({ to: req.params.address, value: toWei(req.body.value), from: accounts[0]})
  };
}

module.exports = { schema, handler };
