const createIdentity = require('./handlers/createIdentityHandler');
const createRoom = require('./handlers/createRoomHandler');

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

module.exports = [
  postIdentityRoute,
  createRoomRoute,
];
