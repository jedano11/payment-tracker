import firebase from 'react-native-firebase';

import CollectionInfrastructure from './collection.infrastructure';
import CollectionOption from '../utils/denormalization-helpers/collection.option';
import DenormalizationOption from '../utils/denormalization-helpers/collection.denormalization.option';

const collections = {
  USERS: 'usersList',
  STANDS: 'standsList',
  USAGE: 'usagesList',
  USER_USAGE: 'userUsagesList',
  CARMAKERS: 'carMakersList',
  RESERVATIONS: 'reservationsList',
};

export const UsersCollection = new CollectionInfrastructure(
  firebase,
  collections.USERS,
);

export const StandsCollection = new CollectionInfrastructure(
  firebase,
  collections.STANDS,
  new CollectionOption(
    [],
    [new DenormalizationOption('reservationsList', 'stand')],
  ),
);

export const UsageCollection = new CollectionInfrastructure(
  firebase,
  collections.USAGE,
);

export const ReservationCollection = new CollectionInfrastructure(
  firebase,
  collections.RESERVATIONS,
);

export const CarMakersCollection = new CollectionInfrastructure(
  firebase,
  collections.CARMAKERS,
  new CollectionOption(['cars'], []),
);

export const UserUsageCollection = new CollectionInfrastructure(
  firebase,
  collections.USER_USAGE,
  new CollectionOption(['usagesList'], []),
);
