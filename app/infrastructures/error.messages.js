export default {
  networkError: 'A network error has occurred',
  requestFailed: 'Network request failed',
  tokenError: 'Invalid token',
  alreadyDeleted: 'The data has been deleted',
  serverError: 'Server error',
  invalidAccount:
    'The password is invalid or the user does not have a password.',
  usedAccount: 'The email address is already in use by another account.',
  notVerified: 'Not verified',
  noAccount:
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  noUserData: 'No user data',
  noReference: 'No reference',
  noPrefix: 'No prefix has set for database',
};

export const mapError = (error: Error) => {
  const errorObject = mappedErrors[error.message];

  return errorObject || mappedErrors.unexpectedError;
};

const mappedErrors = {
  'No user data': {
    title: 'Invalid credentials',
    message: 'No user data',
  },
  'Timeout error has occured': {
    title: 'No connection',
    message: 'Timeout error has occured',
  },
  unexpectedError: {
    title: 'Unexpected error',
    message: 'Something went wrong',
  },
};
