function schema(config) {
  return {
    params: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
        },
      },
    },
    required: ['address'],
  };
}

function handler({ contractInteraction, identityService }) {
  return async function (req) {
    res = await identityService.getBalance(req.params.address);
    return {"eth" : identityService.weiToEth(res)};
  };
}

module.exports = { schema, handler };
