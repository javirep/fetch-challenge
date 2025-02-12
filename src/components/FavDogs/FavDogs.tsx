import React from 'react';
import { useFavDogs } from '../../provider/FavDogsProvider.tsx';
import './FavDogs.scss';
import Typography from '../Typography/Typography.tsx';
import { FavDogCard } from './FavDogCard/FavDogCard.tsx';
import { Button } from '../Button/Button.tsx';
import { postMatch } from '../../api/Dogs.ts';
import { useInfoMessage } from '../../provider/InfoMessageProvider.tsx';

export const FavDogs = () => {
    const { favDogs, setFavDogs } = useFavDogs();
    const { setInfoMessage } = useInfoMessage();

    const handleMatch = async () => {
        // Match the dogs
        let result = await postMatch(favDogs.map(dog => dog.id));

        if (result.success) {
            // Clear the favorites
            setInfoMessage('Match successful');
        }
        else {
            console.log(result.error);
            setInfoMessage('Match failed, please try later');
        }
    }

    const handleRemove = (dog) => {
        // Remove the dog from the favorites
        setFavDogs(favDogs.filter(favDog => favDog.id !== dog.id));
    }
    

    return (
        <div className="favdogs-container section-container">
            <Typography variant="title" className="patient-profile-title">3 - Match with them</Typography>
            <div className="fav-dogs-container">
                
                {favDogs.length ? (
                    favDogs.map((dog, index) => (
                    <FavDogCard key={index} dog={dog} handleRemove={() => handleRemove(dog)}/>
                ))) : (
                    <Typography variant="body" className="no-fav-dogs">No favorite dogs selected</Typography>
                )}
            </div>

            
            <Button variant="primary" text="Match" disabled={!favDogs.length} onClick={()=> {handleMatch()}}/>
        </div>
    );
}