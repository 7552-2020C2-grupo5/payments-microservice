const createIdentity = require('./handlers/createIdentityHandler');
const createRoom = require('./handlers/createRoomHandler');
const getBalance = require('./handlers/getBalanceHandler');
const sendTransaction = require('./handlers/sendTransactionHandler');
const createIntentBook = require('./handlers/createIntentBookHandler');
const acceptBooking = require('./handlers/acceptBookingHandler');
const rejectBooking = require('./handlers/rejectBookingHandler');

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

function sendTransactionRoute({ services, config }) {
  return {
    method: 'POST',
    url: '/balance/:address',
    schema: sendTransaction.schema(config),
    handler: sendTransaction.handler({ config, ...services }),
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

function rejectBookingRoute({ services, config }) {
  return {
    method: 'POST',
    url: '/bookings/reject',
    schema: rejectBooking.schema(config),
    handler: rejectBooking.handler({ config, ...services }),
  };
}

module.exports = [
  postIdentityRoute,
  createRoomRoute,
  getBalanceRoute,
  sendTransactionRoute,
  createIntentBookRoute,
  acceptBookingRoute,
  rejectBookingRoute
];
