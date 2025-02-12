import React, { useContext, createContext, useState} from "react";

type BreedsContextType = {
    breeds: string[];
    setBreeds: (value: string[]) => void;
    selectedBreeds: string[];
    setSelectedBreeds: (value: string[]) => void;
  };

const BreedsContext = React.createContext<BreedsContextType>({
    breeds: [],
    setBreeds: () => {},
    selectedBreeds: [],
    setSelectedBreeds: () => {}
});

export const BreedsProvider = (props) => {
    const {children} = props;
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [ breeds, setBreeds ] = useState<string[]>([]);
  
    const value = {
        breeds,
        setBreeds,
        selectedBreeds,
        setSelectedBreeds
    };
    // @ts-ignore
    return <BreedsContext.Provider value={value}>{children}</BreedsContext.Provider>;
};
  
export const useBreeds = () => {
  return useContext(BreedsContext);
};



  