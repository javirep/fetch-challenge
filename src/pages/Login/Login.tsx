import React, {useState} from "react";
import { submitLogin } from "../../api/Login.ts";
import { useAuth } from "../../provider/AuthProvider.tsx";
import { useInfoMessage } from "../../provider/InfoMessageProvider.tsx";

import './Login.scss';
import { TextInput } from "../../components/Inputs/TextInput/TextInput.tsx";
import { Button } from "../../components/Button/Button.tsx";
import Typography from "../../components/Typography/Typography.tsx";


const Login = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const emailRegexValidation = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const { setAuthenticated } = useAuth();
    const { setInfoMessage } = useInfoMessage();

    const onSubmit = async () => {
        setNameError('');
        setEmailError('');
        if (!name) {
            setNameError('Name is required');
            return;
        }
        if (!email) {
            setEmailError('Email is required');
            return;
        } else 
        if (!emailRegexValidation.test(email)) {
            setEmailError('Email is not valid');
            return;
        }

        const response = await submitLogin({name, email});

        if (response) {
            setAuthenticated(true);
        }
        else {
            setInfoMessage('Something went wrong, please try again');
        }
    }

    return <div className="login">
        <Typography variant='title'> Find Your perfect pet dog </Typography>
        <Typography variant='body'> but we need you to log in first </Typography>

        <div className="inputs-container">
            <TextInput placeholder='Name' onChange={(e) => setName(e.target.value)} error={nameError}/>
            <TextInput placeholder='Email' onChange={(e) => setEmail(e.target.value)} error={emailError}/>

            <Button onClick={onSubmit} variant='primary' text='Submit' />
        </div>
    </div>

}

export default Login;