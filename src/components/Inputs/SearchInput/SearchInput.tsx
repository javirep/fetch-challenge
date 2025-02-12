import React from "react";
import searchSvg from '../../../assets/images/search.svg';

import './SearchInput.scss';

type SearchInputProps = {
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const SearchInput = (props: SearchInputProps) => {
    const { placeholder, onChange=()=>{} } = props;
    const [value, setValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e);
    }

    return (
        <div className='search-input'>
            <img src={searchSvg} alt='search' />
            <input type="text" placeholder={placeholder} onChange={(e)=> handleChange(e)}/>
        </div>
    );
}