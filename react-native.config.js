// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-config': {
      platforms: {
        ios: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
  },
};
