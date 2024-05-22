import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBPWYFikL-lZjfR45IO3GXeMzOCcWnyHM4",
	authDomain: "jobfinder-3e361.firebaseapp.com",
	projectId: "jobfinder-3e361",
	storageBucket: "jobfinder-3e361.appspot.com",
	messagingSenderId: "295818541454",
	appId: "1:295818541454:web:d7b90340c7b29c05028cdf",
	measurementId: "G-XFRY2N183C",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };
