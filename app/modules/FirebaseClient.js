// import firebase from 'react-native-firebase';

class FirebaseClient {
  instance: Object;

  init = () => {
    // this.instance = firebase;
    this.instance = {
      firestore: () => ({
        collection: () => ({
          get: () => ({
            docs: [],
          }),
        }),
      }),
    };
  };

  askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = this.instance.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();

      return { token, error: null };
    } catch (error) {
      return { token: null, error };
    }
  };
}

export default new FirebaseClient();
