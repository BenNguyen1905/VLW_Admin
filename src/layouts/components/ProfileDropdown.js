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
    return (loggedInUser
        ? <UsernameDropdown user={loggedInUser} />
        : <LoginButton />
    );
};

const UsernameDropdown = ({ user }) => (
    <NavDropdown title={`Chào ${user.email}`}>
        {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider /> */}
        <LogoutButton as={NavDropdown.Item}>
            Đăng xuất
        </LogoutButton>
    </NavDropdown>
);