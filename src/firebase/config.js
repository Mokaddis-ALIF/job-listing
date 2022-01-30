import app from 'firebase/app';
import 'firebase/firestore';
// import '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCUNPihIlFlPyBTrBWwWeHtHrv44X7WSnM',
	authDomain: 'job-listing-app-7812c.firebaseapp.com',
	projectId: 'job-listing-app-7812c',
	storageBucket: 'job-listing-app-7812c.appspot.com',
	messagingSenderId: '856485857364',
	appId: '1:856485857364:web:43436f296e5cbe093605c1',
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };
