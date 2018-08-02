export const createChat = ({
  id = 0,
  msg = '',
  user = 'Anonymous',
  timeStamp = 1472322852680,
} = {}) => ({
  id,
  msg,
  user,
  timeStamp,
});

export const createUser = ({
  id = 'abcdefghijkl',
  phoneNumber = '+639336372515',
} = {}) => ({
  id,
  phoneNumber,
});

export const createState = ({
  isVerifying = false,
  user = null,
  carMakers = [],
  cars = [],
  selectedCarMaker = null,
  selectedCar = null,
  isLoading = false,
  coordinates = null,
  stands = [],
  selectedStand = null,
  timestampOffset = 0,
  transactions = [],
} = {}) => ({
  isVerifying,
  user,
  carMakers,
  cars,
  selectedCarMaker,
  selectedCar,
  isLoading,
  coordinates,
  stands,
  selectedStand,
  timestampOffset,
  transactions,
});
