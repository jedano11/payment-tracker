import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';
import { target } from '../config/env';
import firebaseCredentials from '../config/firebaseCredentials';

class FirebaseClient {
  instance: Object;

  init = () => {
    firebase.initializeApp(firebaseCredentials[target]);

    this.instance = firebase;
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
