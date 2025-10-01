import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_VYH6Fu2nVFrpWgggl5zJsKJGKk8kJv4",
  authDomain: "mobilestart-bce02.firebaseapp.com",
  projectId: "mobilestart-bce02",
  storageBucket: "mobilestart-bce02.firebasestorage.app",
  messagingSenderId: "163063231540",
  appId: "1:163063231540:web:d0111206cc19f8daee8661"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
