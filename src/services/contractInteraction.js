const BigNumber = require('bignumber.js');
const BookBnBAbi = require('../../abi/BnBooking').abi;
const axios = require('axios');

const PUBLICATIONS_ENDPOINT = "https://bookbnb5-publications.herokuapp.com/v1/publications";
const BOOKINGS_ENDPOINT = "https://bookbnb5-bookings.herokuapp.com/v1/bookings";


const getContract = (web3, address) => {
  return new web3.eth.Contract(BookBnBAbi, address);
};

const toWei = (number) => { //Eth to wei
  const WEIS_IN_ETHER = BigNumber(10).pow(18);
  return BigNumber(number).times(WEIS_IN_ETHER).toFixed();
};


const createRoom = ({ config }) => async (web3, price) => {
  const accounts = await web3.eth.getAccounts();
  const bookBnb = await getContract(web3, config.contractAddress);
  const hashPromise = new Promise((resolve, reject) => {
    bookBnb.methods
      .createRoom(toWei(price))
      .send({ from: accounts[0] })
      .on('receipt', (r) => {

        if (r.events.RoomCreated) {
          const { roomId } = r.events.RoomCreated.returnValues;
          axios.
            get(PUBLICATIONS_ENDPOINT, {
              params: {
                blockchain_transaction_hash: r.transactionHash
              }
            })
            .then(function (response) {
              const id = response.data[0].id;
              axios.
                patch(PUBLICATIONS_ENDPOINT + '/' + id.toString(), { 
                  blockchain_id: parseInt(roomId, 10),
                  blockchain_status: "CONFIRMED"
                })
                .catch(function (error) {
                  console.log(error);
                })

            })
            .catch(function (error) {
              console.log(error);
            })
        }
      })
      .on('transactionHash', function (hash) {
        return resolve({"transaction_hash" : hash});
      })
      .on('error', (err) => reject(err));
  });
  return hashPromise;
};

const totalDaysBetween = (initialDate, finalDate) => {
  const totalTime = finalDate.getTime() - initialDate.getTime();
  return Math.ceil(totalTime / 86400000) + 1;
}

const createIntentBook = ({ config }) => async (web3, roomId, price, initialDate, finalDate) => {
  const bookbnbContract = await getContract(web3, config.contractAddress);
  const wallet = await web3.eth.getAccounts();

  const totalDays = totalDaysBetween(initialDate, finalDate);
  const totalPrice = price * totalDays;

  return new Promise((resolve, reject) => {
    bookbnbContract['methods'].intentBookingBatch(
      roomId,
      initialDate.getDate(),
      initialDate.getMonth() + 1,
      initialDate.getFullYear(),
      finalDate.getDate(),
      finalDate.getMonth() + 1,
      finalDate.getFullYear()
    )
    .send({
      from: wallet[0],
      value: toWei(totalPrice)
    })
    .on('transactionHash', (hash) => {
      return resolve({"transaction_hash" : hash});
    })
    .on('receipt', (r) => {
      if (r.events.BookIntentCreated) {
          axios.
            get(BOOKINGS_ENDPOINT, {
              params: {
                blockchain_transaction_hash: r.transactionHash,
                blockchain_status: "UNSET"
              }
            })
            .then(function (response) {
              const id = response.data[0].id;
              axios.
                patch(BOOKINGS_ENDPOINT + '/' + id.toString(), {
                  blockchain_status: "CONFIRMED",
                  booking_status: "PENDING"
                })
                .catch(function (error) {
                  console.log(error);
                })

            })
            .catch(function (error) {
              console.log(error);
            })

      }
    })
    .on('error', (err) => reject(err));
  });
};

const acceptBooking = ({ config }) => async (web3, bookerAddress, roomId, initialDate, finalDate, bookingId) => {
  const bookbnbContract = await getContract(web3, config.contractAddress);
  const wallet = await web3.eth.getAccounts();

  return new Promise((resolve, reject) => {
    bookbnbContract['methods'].acceptBatch(
      roomId,
      bookerAddress,
      initialDate.getDate(),
      initialDate.getMonth() + 1,
      initialDate.getFullYear(),
      finalDate.getDate(),
      finalDate.getMonth() + 1,
      finalDate.getFullYear()
    )
    .send({
      from: wallet[0]
    })
    .on('transactionHash', (hash) => {
      return resolve({"transaction_hash" : hash});
    })
    .on('receipt', (r) => {
      if (r.events.RoomBooked) {
          axios.
            patch(BOOKINGS_ENDPOINT + '/' + bookingId.toString(), {
              booking_status: "CONFIRMED",
            })
            .catch(function (error) {
              console.log(error);
            })
        
      }
    })
    .on('error', (err) => reject(err));
  });
};


const rejectBooking = ({ config }) => async (web3, bookerAddress, roomId, initialDate, finalDate, bookingId) => {
  const bookbnbContract = await getContract(web3, config.contractAddress);
  const wallet = await web3.eth.getAccounts();

  return new Promise((resolve, reject) => {
    bookbnbContract['methods'].rejectBatch(
      roomId,
      bookerAddress,
      initialDate.getDate(),
      initialDate.getMonth() + 1,
      initialDate.getFullYear(),
      finalDate.getDate(),
      finalDate.getMonth() + 1,
      finalDate.getFullYear()
    )
    .send({
      from: wallet[0]
    })
    .on('transactionHash', (hash) => {
      return resolve({"transaction_hash" : hash});
    })
    .on('receipt', (r) => {
      if (r.events.BookIntentRejected) {
          axios.
            patch(BOOKINGS_ENDPOINT + '/' + bookingId.toString(), {
              booking_status: "REJECTED",
            })
            .catch(function (error) {
              console.log(error);
            })
        
      }
    })
    .on('error', (err) => reject(err));
  });
};


module.exports = (dependencies) => ({
  createRoom: createRoom(dependencies),
  createIntentBook: createIntentBook(dependencies),
  acceptBooking: acceptBooking(dependencies),
  rejectBooking: rejectBooking(dependencies)
});
