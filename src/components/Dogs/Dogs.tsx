import React, {useState, useEffect} from "react";
import Typography from "../Typography/Typography.tsx";
import { getDogsWithFilter, DogFiltersType , DogType, SortType  } from "../../api/Dogs.ts";

import './Dogs.scss';
import { DogCard } from "./DogCard/DogCard.tsx";
import { DoubleRangeSlider } from "../Inputs/DoubleRangeSlider/DoubleRangeSlider.tsx";
import { useBreeds } from "../../provider/BreedsProvider.tsx";
import { Paginator } from "../Paginator/Paginator.tsx";
import { Button } from "../Button/Button.tsx";
import { useInfoMessage } from "../../provider/InfoMessageProvider.tsx";

interface QueryData {
    filters: DogFiltersType;
    size: number;
    page: number;
    sort: SortType;
}

export const Dogs = () => {

    const [dogs, setDogs] = useState<DogType []>([]);
    const dogMaxAge = 15;
    const [totalPages, setTotalPages] = useState<number>(0);
    const { setInfoMessage } = useInfoMessage();

    const [queryData, setQueryData] = useState<QueryData>({
        filters:{ 
            maxAge: dogMaxAge,
            minAge: 0,
            breeds: []
        },
        size: 9,
        page: 1,
        sort: {sortType: 'breed', sortDirection: 'asc'}
    });

    const { selectedBreeds } = useBreeds();

    const fetchDogs = async (data: QueryData ) => {
        
        const fetchedDogs = await getDogsWithFilter(data);

        if (fetchedDogs.success && fetchedDogs.dogs) {
            setDogs(fetchedDogs.dogs);
            setTotalPages(Math.ceil(fetchedDogs.total / queryData.size));
            setQueryData(data);
        }
        else{
            console.log(fetchedDogs.error);
            setInfoMessage('Something went wrong, please try again later');
        }
    }

    useEffect(() => {
        let newQueryData = {...queryData};
        newQueryData.filters.breeds = selectedBreeds;
        newQueryData.page = 1;

        fetchDogs(newQueryData);

    }, [selectedBreeds]);

    const handlePage = (action:'next' | 'prev') => {
        let newQueryData = {...queryData};
        if (action === 'next') {
            newQueryData.page = newQueryData.page + 1;
        } else {
            newQueryData.page = newQueryData.page - 1;
        }

        fetchDogs(newQueryData);
    }

    const handleSort = async (sortType: string) => {
        let newQueryData = {...queryData};
        let newSort = {sortType, sortDirection: 'asc'};

        if (newQueryData.sort && newQueryData.sort.sortType === sortType) {
            if (newQueryData.sort.sortDirection === 'asc') {
                newSort = {sortType, sortDirection: 'desc'}
            }
            else {
                newSort = {sortType:'', sortDirection: ''};
            }
        }

        newQueryData.sort = newSort;

        fetchDogs(newQueryData);

    }

    const handleAgeFilters = async (filters: DogFiltersType) => {
        let newQueryData = {...queryData};
        newQueryData.filters = filters;

        fetchDogs(newQueryData);
    }
    const {sort, filters, page} = queryData;
    const sortByBreedText = sort && sort.sortType === 'breed' ? sort.sortDirection === 'asc' ? 'Sort by Breed (asc)' : 'Sort by Breed (desc)' : 'Sort by Breed';
    const sortByAgeText = sort && sort.sortType === 'age' ? sort.sortDirection === 'asc' ? 'Sort by Age (asc)' : 'Sort by Age (desc)' : 'Sort by Age';
    const sortByNameText = sort && sort.sortType === 'name' ? sort.sortDirection === 'asc' ? 'Sort by Name (asc)' : 'Sort by Name (desc)' : 'Sort by Name';

    return (
        <div className="dogs-container section-container">
            <Typography variant="title" className="dogs-title" center={true}> 2 - Select Your Favorites </Typography>

            <div className="dogs-filters">
                <div className="dogs-filter">
                    <DoubleRangeSlider 
                        id="age" 
                        min={0} 
                        max={dogMaxAge} 
                        onChange={(min, max) => handleAgeFilters({...filters, minAge: min, maxAge: max})} 
                        labels={{min: 'Min Age:', max: 'Max Age:'}}
                    />
                    <div className="dogs-sort">
                        <Button variant="secondary" text={sortByBreedText} onClick={()=> handleSort('breed')} />
                        <Button variant="secondary" text={sortByAgeText} onClick={()=> handleSort('age')} />
                        <Button variant="secondary" text={sortByNameText} onClick={()=> handleSort('name')} />
                    </div>
                </div>
            </div>

            <div className="dogs-main">
                {dogs.map((dog, index) => (
                    <DogCard key={index} dog={dog} />
                ))}
            </div>
            
            <Paginator currentPage={page} totalPages={totalPages} nextPage={()=>{handlePage('next')}} previousPage={()=>{handlePage('prev')}}/> 
        </div>
    );
}