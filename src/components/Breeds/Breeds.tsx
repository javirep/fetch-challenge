import React from 'react';
import './Breeds.scss'
import { useEffect, useState } from 'react';
import { getBreeds } from '../../api/Dogs.ts';
import Typography from '../Typography/Typography.tsx';
import classNames from 'classnames';
import { SearchInput } from '../Inputs/SearchInput/SearchInput.tsx';
import { Button } from '../Button/Button.tsx';
import { useBreeds } from '../../provider/BreedsProvider.tsx';
import { useInfoMessage } from '../../provider/InfoMessageProvider.tsx';

export const Breeds = () => {
    
    const [ sortAlph, setSortAlph ] = useState(true);
    const { breeds, setBreeds, selectedBreeds, setSelectedBreeds} = useBreeds();
    const [ showingBreeds, setShowingBreeds ] = useState<string[]>([]);
    const { setInfoMessage } = useInfoMessage();

    const onLoad = async () => {
        const fetchedBreeds = await getBreeds();

        if (fetchedBreeds.success && fetchedBreeds.breeds) {

            setBreeds(fetchedBreeds.breeds)
            setShowingBreeds(fetchedBreeds.breeds);
        }
        else{
            console.log(fetchedBreeds.error);
            setInfoMessage('Something went wrong, please try again later');
        }
    }

    useEffect(() => {   
        onLoad();
    }, []);

    const selectBreed = (breed: string) => {
        let found = selectedBreeds.indexOf(breed);
        let newSelectedBreeds = [...selectedBreeds];
        
        if (found === -1) {
            newSelectedBreeds.push(breed);
        }
        else {
            newSelectedBreeds.splice(found, 1);
        }

        setSelectedBreeds(newSelectedBreeds);
    }
    
    if (!sortAlph) {
        showingBreeds.reverse()
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ( !e.target.value ) setShowingBreeds(breeds);
        else {
            let newShowingBreeds = breeds.filter((breed) => breed.toLowerCase().includes(e.target.value.toLowerCase()));
    
            setShowingBreeds(newShowingBreeds);
        }
    }

    const mapFn = (breed: string, index: number) => {
        return <div key={index} onClick={() => {selectBreed(breed)}} className={classNames('breed-tag', { selected: selectedBreeds.indexOf(breed) !== -1 })}>
            <Typography key={index} variant='body'>{breed}</Typography>
        </div>
    }

    return (
        <div className="section-container breeds-container">
            <div className='breeds-title'>
                <Typography variant='title' center={true}>1 - Find Your Breed</Typography>
            </div>

            <div className='breeds-search'>
                <SearchInput placeholder='Search for a breed' onChange={handleSearch}/>
                <Button text='Sort' variant='secondary' onClick={() => setSortAlph(!sortAlph)}/>
            </div>

            <div className='breeds-main' >
                {
                    sortAlph ? showingBreeds.map(mapFn) : [... showingBreeds].reverse().map(mapFn)
                }
            </div>
        </div>
    );
}