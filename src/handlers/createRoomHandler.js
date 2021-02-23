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
        publicationId: {
          type: 'integer'
        }
      },
    },
    required: ['mnemonic', 'price', 'publicationId'],
  };
}

function handler({ contractInteraction, identityService }) {
  return async function (req) {
    const identity = await identityService.getWeb3WithIdentity(req.body.mnemonic);
    return contractInteraction.createRoom(identity, req.body.price, req.body.publicationId);
  };
}

module.exports = { schema, handler };
