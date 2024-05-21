import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCSfAfi38y93xhBx0o9hAZIYM1Dvk2A35A",
	authDomain: "jobfinder-b5689.firebaseapp.com",
	projectId: "jobfinder-b5689",
	storageBucket: "jobfinder-b5689.appspot.com",
	messagingSenderId: "188219372428",
	appId: "1:188219372428:web:53ae7f013e158476cb9ca9",
	measurementId: "G-3YPZM90KPS",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };
