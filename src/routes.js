const createIdentity = require('./handlers/createIdentityHandler');
const createRoom = require('./handlers/createRoomHandler');
const getBalance = require('./handlers/getBalanceHandler');

function postIdentityRoute({ services, config }) {
  return {
    method: 'POST',
    url: '/identity',
    schema: createIdentity.schema(config),
    handler: createIdentity.handler({ config, ...services }),
  };
}

function createRoomRoute({ services, config }) {
  return {
    method: 'POST',
    url: '/room',
    schema: createRoom.schema(config),
    handler: createRoom.handler({ config, ...services }),
  };
}

function getBalanceRoute({ services, config }) {
  return {
    method: 'POST',
    url: '/balance',
    schema: getBalance.schema(config),
    handler: getBalance.handler({ config, ...services }),
  };
}

module.exports = [
  postIdentityRoute,
  createRoomRoute,
  getBalanceRoute
];
