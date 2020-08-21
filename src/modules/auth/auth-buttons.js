import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth } from 'reactfire';

import accountSvc from './AccountService';

export const LoginButton = () => {
    const auth = useAuth;

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult({ user }) {
                accountSvc.importGoogleAccount(user).catch(console.error);
                // Avoid redirects after sign-in.
                return false;
            },
        }
    };

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
    );
};

export const LogoutButton = ({ as: Component = "button", children }) => {
    const auth = useAuth();
    return (
        <Component onClick={() => auth.signOut()}>
            {children}
        </Component>
    );
}