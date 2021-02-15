function schema(config) {
  return {
    body: {
      type: 'object',
      properties: {
        mnemonic: {
          type: 'string',
        },
        blockchainId: {
          type: 'integer',
        },
        price: {
          type: 'number'
        },
        initialDate: {
          type: 'string'
        },
        finalDate: {
          type: 'string'
        }
      },
    },
    required: ['mnemonic', 'blockchainId', 'price', 'initialDate', 'finalDate'],
  };
}

function handler({ contractInteraction, identityService }) {
  return async function (req, reply) {
    const identity = await identityService.getWeb3WithIdentity(req.body.mnemonic);

    let ini = req.body.initialDate.split('-');
    let fin = req.body.finalDate.split('-');


    const initialDate = new Date(ini[0], ini[1] - 1, ini[2]);
    const finalDate = new Date(fin[0], fin[1] - 1, fin[2]);

    return contractInteraction.createIntentBook(
      identity,
      req.body.blockchainId,
      req.body.price,
      initialDate,
      finalDate
    );

  };
}

module.exports = { schema, handler };
