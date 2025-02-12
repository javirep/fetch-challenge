import React from "react";

import './TextInput.scss';
import Typography from "../../Typography/Typography.tsx";

type TextInputProps = {
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
}


export const TextInput = (props: TextInputProps) => {
    const { placeholder, type='text', onChange=()=>{} } = props;
    const [value, setValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e);
    }

    return (
        <div className='text-input-container'>
            <div className='text-input'>
                <input type={type} value={value} placeholder={placeholder} onChange={(e)=> handleChange(e)}/>
            </div>
            <Typography variant='error' center={true}>{props.error}</Typography>
        </div>
    );
}