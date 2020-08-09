import React from 'react';
import { SuspenseWithPerf, useUser } from 'reactfire';
import { NavDropdown } from 'react-bootstrap';

import { LoginButton, LogoutButton } from '../../modules/auth/auth-buttons';


const ProfileDropdown = () => {
    return (
        <SuspenseWithPerf
            traceId={'firebase-user-wait'}
            fallback={<p>Loading...</p>}
        >
            <AuthStateButton />
        </SuspenseWithPerf>
    );
};

export default ProfileDropdown;


const AuthStateButton = () => {
    const loggedInUser = useUser();
    console.log({ displayName: loggedInUser?.displayName });
    return (loggedInUser
        ? <UsernameDropdown user={loggedInUser} />
        : <LoginButton />
    );
};

const UsernameDropdown = ({ user }) => (
    <NavDropdown title={`Chào ${user.displayName}`}>
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <LogoutButton as={NavDropdown.Item}>
            Đăng xuất
        </LogoutButton>
    </NavDropdown>
);