const createIdentity = require('./handlers/createIdentityHandler');
const createRoom = require('./handlers/createRoomHandler');
const getBalance = require('./handlers/getBalanceHandler');
const createIntentBook = require('./handlers/createIntentBookHandler');
const acceptBooking = require('./handlers/acceptBookingHandler');

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
    method: 'GET',
    url: '/balance/:address',
    schema: getBalance.schema(config),
    handler: getBalance.handler({ config, ...services }),
  };
}

function createIntentBookRoute({ services, config }) {
  return {
    method: 'POST',
    url: '/bookings',
    schema: createIntentBook.schema(config),
    handler: createIntentBook.handler({ config, ...services }),
  };
}

function acceptBookingRoute({ services, config }) {
  return {
    method: 'POST',
    url: '/bookings/accept',
    schema: acceptBooking.schema(config),
    handler: acceptBooking.handler({ config, ...services }),
  };
}

module.exports = [
  postIdentityRoute,
  createRoomRoute,
  getBalanceRoute,
  createIntentBookRoute,
  acceptBookingRoute
];
