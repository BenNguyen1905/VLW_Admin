import React, { createContext, useContext } from 'react';
import * as app from 'firebase';
import 'firebase/auth';

import config from './firebase-config';


class Firebase {

    constructor() {
        app.initializeApp(config);
        this._auth = app.auth();
        this._db = app.firestore();
    }

    account(id) {
        return this._db.collection('accounts').doc(id);
    }

    accounts() {
        return this._db.collection('accounts');
    }

    student(id) {
        return this._db.collection('students').doc(id);
    }

    students() {
        return this._db.collection('students');
    }

    createUserWithEmailAndPassword(email, password) {
        return this._auth.createUserWithEmailAndPassword(email, password);
    }

    signInWithEmailAndPassword(email, password) {
        return this._auth.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return this._auth.signOut();
    }

    resetPassword(email) {
        return this._auth.sendPasswordResetEmail(email);
    }

    changePassword(password) {
        return this._auth.currentUser.updatePassword(password);
    }
}

const firebase = new Firebase();

export default firebase;


const firebaseContext = createContext(null);

export function FirebaseProvider({ children }) {
    return (
        <firebaseContext.Provider value={new Firebase()}>
            {children}
        </firebaseContext.Provider>
    );
}

export const useFirebase = () => useContext(firebaseContext);
