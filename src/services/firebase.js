// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCg_5HPeHPufnnAVCvvKkRHc1NQKoBtwCg',
  authDomain: 'boardy-4a983.firebaseapp.com',
  projectId: 'boardy-4a983',
  storageBucket: 'boardy-4a983.firebasestorage.app',
  messagingSenderId: '1056502438989',
  appId: '1:1056502438989:web:350136506dc4e3133dd004',
  measurementId: 'G-TWWD7MMVN6'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);