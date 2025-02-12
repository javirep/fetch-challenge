import React from 'react';
import { DogType } from '../../../api/Dogs';
import Typography from '../../Typography/Typography.tsx';

import './DogCard.scss';
import { Button } from '../../Button/Button.tsx';
import { useFavDogs } from '../../../provider/FavDogsProvider.tsx';

export const DogCard = (props: {dog: DogType}) => {
    const {dog} = props;
    const {favDogs, setFavDogs} = useFavDogs();

    const handleSelect = () => {
        let found = favDogs.indexOf(dog);
        let newFavDogs = [...favDogs];
        
        if (found === -1) {
            newFavDogs.push(dog);
        }
        else {
            newFavDogs.splice(found, 1);
        }

        setFavDogs(newFavDogs);
    }
    return (
        <div className="dog-card">
            <Typography variant="subtitle" className="dog-card-title"> {dog.name} </Typography>
            <Typography variant="body" className="dog-card-breed"> {dog.breed} </Typography>

            <img src={dog.img} alt={dog.name} className="dog-card-image" />

            <Typography variant="body" className="dog-card-breed"> {dog.age} years old </Typography>
            <Typography variant="body" className="dog-card-zip"> Zip code: {dog.zip_code} </Typography>

            <Button variant="primary" text="Select" onClick={()=> {handleSelect()}}/>

        </div>
    )
}
