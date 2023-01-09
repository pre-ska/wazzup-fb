import { getFirebaseApp } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { child, getDatabase, ref, set, update } from 'firebase/database';
import { authenticate, logout } from '../../store/authSlice';
import { getUserData } from './userActions';

let timer;

export const signUp = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const millisecondsUntilExpiry = expiryDate - timeNow;

      const userData = await createUser(firstName, lastName, email, uid);

      dispatch(authenticate({ token: accessToken, userData }));

      // spremi usera u local storage
      staveDataToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      const errorCode = error.code;

      let message = 'Something went wrong';
      if (errorCode === 'auth/email-already-in-use') {
        message = 'Email already in use';
      }

      throw new Error(message);
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const millisecondsUntilExpiry = expiryDate - timeNow;

      const userData = await getUserData(uid);

      dispatch(authenticate({ token: accessToken, userData }));

      // spremi usera u local storage
      staveDataToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      const errorCode = error.code;

      let message = 'Something went wrong';

      if (
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/wrong-password'
      ) {
        message = 'Please check your credentials';
      }

      throw new Error(message);
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  };
};

export const updateSignInUserData = async (userId, newData) => {
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  newData.firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase();
  await update(childRef, newData);
};

const createUser = async (firstName, lastName, email, userId) => {
  const firstLast = `${firstName} ${lastName}`.toLowerCase();

  const userData = {
    firstName,
    lastName,
    email,
    firstLast,
    userId,
    signUpDate: new Date().toISOString(),
  };

  const dbRef = ref(getDatabase()); // referenca na cijelu DB

  const childRef = child(dbRef, `users/${userId}`); // referenca na node, ako ne postoji- kreirat će ga

  await set(childRef, userData); // spremi userData na childRef

  return userData;
};

const staveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};
