import React from "react";

import { DogType } from "../../../api/Dogs.ts";
import Typography from "../../Typography/Typography.tsx";
import './FavDogCard.scss';
import { Button } from "../../Button/Button.tsx";

type FavDogCardProps = {
    dog: DogType;
    handleRemove: () => void;
}

export const FavDogCard = (props: FavDogCardProps ) => {
    const {dog, handleRemove} = props;

    return (
        <div className="fav-dog-card">
            <img src={dog.img} alt={dog.name} className="fav-dog-card-img"/>
            <div>
                <Typography variant="body" className="fav-dogs-title"> {dog.name} </Typography>
                <div className="fav-dog-card-info">
                    <Typography variant="body" className="fav-dog-card-breed"> {dog.breed} </Typography>
                    <Typography variant="body" className="fav-dog-card-breed"> {dog.age} years old </Typography>
                </div>
            </div>

            <Button variant="secondary" text="Remove" onClick={handleRemove}/>
        </div>
    );
}