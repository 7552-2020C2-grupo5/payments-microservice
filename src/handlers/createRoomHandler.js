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
      },
    },
    required: ['mnemonic', 'price', 'address'],
  };
}

function handler({ contractInteraction, identityService }) {
  return async function (req) {
    const identity = await identityService.getWeb3WithIdentity(req.body.mnemonic);
    return contractInteraction.createRoom(identity, req.body.price);
  };
}

module.exports = { schema, handler };
