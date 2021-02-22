function schema(config) {
  return {
    body: {
      type: 'object',
      properties: {
        roomOwnerMnemonic: {
          type: 'string',
        },
        bookerAddress: {
          type: 'string'
        },
        blockchainId: {
          type: 'integer',
        },
        initialDate: {
          type: 'string'
        },
        finalDate: {
          type: 'string'
        },
        bookingId: {
          type: 'integer'
        }
      },
    },
    required: ['roomOwnerMnemonic', 'bookerAddress', 'blockchainId', 'initialDate', 'finalDate', 'bookingId'],
  };
}

function handler({ contractInteraction, identityService }) {
  return async function (req, reply) {
    const identity = await identityService.getWeb3WithIdentity(req.body.roomOwnerMnemonic);

    let ini = req.body.initialDate.split('-');
    let fin = req.body.finalDate.split('-');


    const initialDate = new Date(ini[0], ini[1] - 1, ini[2]);
    const finalDate = new Date(fin[0], fin[1] - 1, fin[2]);

    return contractInteraction.rejectBooking(
      identity,
      req.body.bookerAddress,
      req.body.blockchainId,
      initialDate,
      finalDate,
      req.body.bookingId
    );

  };
}

module.exports = { schema, handler };
