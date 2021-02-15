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


    const initialDate = new Date(ini[2], ini[1], ini[0]);
    const finalDate = new Date(fin[2], fin[1], fin[0]);

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
