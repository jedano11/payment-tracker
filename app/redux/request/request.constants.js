export const SAMPLE = 'SAMPLE';
export const LOGIN = 'LOGIN';
export const SAMPLE_DEBOUNCE = 'SAMPLE_DEBOUNCE';
export const SAMPLE_REQUEST = 'SAMPLE_REQUEST';
export const SAMPLE_REQUEST_LATEST = 'SAMPLE_REQUEST_LATEST';

export default {
  [LOGIN]: {
    loaderMessage: 'Signing In...',
    defaultErrorMessage: 'Failed to Sign In',
    successMessage: 'Logged In',
  },
  [SAMPLE]: {
    loaderMessage: 'Loading...',
    defaultErrorMessage: 'Failed on purpose',
    successMessage: 'Success',
  },
  [SAMPLE_DEBOUNCE]: {
    loaderMessage: 'Loading...',
    defaultErrorMessage: 'Failed on purpose',
    successMessage: 'Success',
  },
  [SAMPLE_REQUEST_LATEST]: {
    loaderMessage: 'Loading...',
    defaultErrorMessage: 'Failed on purpose',
    successMessage: 'Success',
  },
  [SAMPLE_REQUEST]: {
    loaderMessage: 'Loading...',
    defaultErrorMessage: 'Failed on purpose',
    successMessage: 'Success',
  },
};
