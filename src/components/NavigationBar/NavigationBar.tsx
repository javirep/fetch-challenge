import React from 'react'
import './NavigationBar.scss'
import logo from '../../assets/images/PurpleDog.png';
import { useAuth } from '../../provider/AuthProvider.tsx'
import { Button } from '../Button/Button.tsx';
import { submitLogout } from '../../api/Login.ts';
import { useInfoMessage } from '../../provider/InfoMessageProvider.tsx';

export const NavigationBar = () => {

    const { authName } = useAuth();
    const { setInfoMessage } = useInfoMessage();
    const { setAuthenticated } = useAuth();

    const logOut = async () => {
        const response = await submitLogout();

        if (response) {
            await setAuthenticated(false);
            
        }
        else {
            setInfoMessage('Something went wrong, please try again');
        }
    }

    return (
        <div className="NavigationBar">
            <nav className="navbar">
                <img src={logo} alt='Tech.care logo' height={48}/>

                <Button onClick={logOut} variant='secondary' text='Log out' />

            </nav>
        </div>
    );
}