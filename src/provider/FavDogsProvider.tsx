import React, { useContext, createContext, useState} from "react";
import { DogType } from "../api/Dogs";

type FavDogsContextType = {
    favDogs: DogType[];
    setFavDogs: (value: DogType[]) => void;
  };

const FavDogsContext = React.createContext<FavDogsContextType>({
    favDogs: [],
    setFavDogs: () => {},
});

export const FavDogsProvider = (props) => {
    const {children} = props;
    const [ favDogs, setFavDogs ] = useState<DogType[]>([]);
  
    const value = {
        favDogs,
        setFavDogs,
    };
    // @ts-ignore
    return <FavDogsContext.Provider value={value}>{children}</FavDogsContext.Provider>;
};
  
export const useFavDogs = () => {
  return useContext(FavDogsContext);
};



  