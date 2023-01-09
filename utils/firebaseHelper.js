// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyDq0PtCVzOWmulAaSvBA7F-_rXxiTsA4vk',
    authDomain: 'wazzup-d50b1.firebaseapp.com',
    projectId: 'wazzup-d50b1',
    storageBucket: 'wazzup-d50b1.appspot.com',
    messagingSenderId: '972663586546',
    appId: '1:972663586546:web:cc50cce442889dd5a49a6b',
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
