import { getFirebaseApp } from '../firebaseConfig';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { child, getDatabase, ref, set } from 'firebase/database';
import { authenticate } from '../../store/authSlice';

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
      const { accessToken } = stsTokenManager;
      const userData = await createUser(firstName, lastName, email, uid);

      dispatch(authenticate({ token: accessToken, userData }));
    } catch (error) {
      // console.error(error.code);
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
  console.log(email, password);
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
