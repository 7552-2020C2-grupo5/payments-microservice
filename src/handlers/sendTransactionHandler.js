function schema(config) {
  return {
    params: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
        },
        value: {
          type: 'number',
        },
        mnemonic: {
          type: 'string'
        },
      },
    },
    required: ['string', 'value'],
  };
}

function handler({ identityService }) {
  return async function (req) {
    const web3 = await identityService.getWeb3WithIdentity(req.body.mnemonic);
    const accounts = await web3.eth.getAccounts();
    return await web3.eth.sendTransaction({ to: req.body.address, value: req.body.value, from: accounts[0]})
  };
}

module.exports = { schema, handler };
