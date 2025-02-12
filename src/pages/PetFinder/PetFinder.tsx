import React, {useState, useEffect} from "react";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar.tsx";
import { Breeds } from "../../components/Breeds/Breeds.tsx";
import { Dogs } from "../../components/Dogs/Dogs.tsx";
import { FavDogs } from "../../components/FavDogs/FavDogs.tsx";

import './PetFinder.scss';
import { InfoMessage } from "../../components/InfoMessage/InfoMessage.tsx";

const PetFinder = () => {

    return <div>
       <InfoMessage />
       <NavigationBar />

        <div className="main-container">

            <Breeds />
            <Dogs />
            <FavDogs />

        </div> 
    </div>

}

export default PetFinder;