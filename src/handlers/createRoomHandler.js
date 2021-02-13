function schema(config) {
  return {
    params: {
      type: 'object',
      properties: {
        mnemonic: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
        address: {
          type: 'string',
        },
      },
    },
    required: ['mnemonic', 'price', 'address'],
  };
}

function handler({ contractInteraction, identityService }) {
  return async function (req) {
    const identity = await identityService.getWeb3WithIdentity(req.body.mnemonic);
    res = await identityService.getBalance(req.body.address);
    console.log(identityService.weiToEth(res));
    return contractInteraction.createRoom(identity, req.body.price);
  };
}

module.exports = { schema, handler };
