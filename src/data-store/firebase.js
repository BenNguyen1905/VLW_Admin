import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBgsye9BlbkjS9KAsROKV9RCVXRqgJSg8Q",
    authDomain: "vanlangwallet.firebaseapp.com",
    databaseURL: "https://vanlangwallet.firebaseio.com",
    projectId: "vanlangwallet",
    storageBucket: "vanlangwallet.appspot.com",
    messagingSenderId: "537777680801",
    appId: "1:537777680801:web:c501f06e9f380744289be0",
    measurementId: "G-TD847HTMJ0"
};

firebase.initializeApp(config);

export default firebase;