function schema(config) {
  return {
    body: {
      type: 'object',
      properties: {
        mnemonic: {
          type: 'string',
        },
        newPrice: {
          type: 'number',
        },
        roomId: {
          type: 'integer'
        }
      },
    },
    required: ['mnemonic', 'newPrice', 'roomId'],
  };
}

function handler({ contractInteraction, identityService }) {
  return async function (req) {
    const identity = await identityService.getWeb3WithIdentity(req.body.mnemonic);
    return contractInteraction.changeRoomPrice(identity, req.body.newPrice, req.body.roomId);
  };
}

module.exports = { schema, handler };
