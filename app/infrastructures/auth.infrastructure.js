import firebase from 'react-native-firebase';
import ErrorMessages from './error.messages';

class AuthInfrastructure {
  login = async (email: string, password: string) => {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return { id: user.uid };
  };

  logout = () => firebase.auth().signOut();

  getLoginUser = () => {
    const loginPromise: Promise<any> = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        if (user) {
          resolve({
            id: user.uuid,
          });
        } else {
          reject(ErrorMessages.noUserData);
        }
      });
    });

    return loginPromise;
  };
}

export default new AuthInfrastructure();
