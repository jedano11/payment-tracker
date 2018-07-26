import firebase, { RNFirebase } from 'react-native-firebase';
import ErrorMessages from './error.messages';

class AuthInfrastructure {
  phoneAuthResult: RNFirebase.ConfirmationResult;

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
          const { phoneNumber, uid } = user;

          resolve({
            phoneNumber,
            id: uid,
          });
        } else {
          reject(ErrorMessages.noUserData);
        }
      });
    });

    return loginPromise;
  };

  loginWithPhone = async (phoneNumber: string) => {
    this.phoneAuthResult = await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber);

    return this.phoneAuthResult;
  };

  confirmLogin = async (verificationCode: string) => {
    if (!this.phoneAuthResult) {
      throw new Error(ErrorMessages.noPhoneSent);
    }
    const user = await this.phoneAuthResult.confirm(verificationCode);
    const userObject = {
      id: user.uid,
      phone: user.phoneNumber,
    };

    return userObject;
  };
}

export default new AuthInfrastructure();
