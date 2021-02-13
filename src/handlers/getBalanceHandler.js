function schema(config) {
  return {
    body: {
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

function handler({ identityService }) {
  return async function (req) {
    process.stdout.write('\n');
    process.stdout.write('\n');
    process.stdout.write(req.param('address') + '\n');
    process.stdout.write('\n');
    process.stdout.write('\n');
    const res = await identityService.getBalance(req.body.address);
    return {"ethers": res};
  };
}

module.exports = { schema, handler };
