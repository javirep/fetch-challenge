import ApiCaller from "./ApiCaller.ts";

export type DogFiltersType = {
    maxAge: number;
    minAge: number;
    breeds: string[];
}

export type DogType = {
    id: string;
    name: string;
    age: number;
    breed: string;
    img: string;
    zip_code: string;
}

export type SortType = {sortType: string, sortDirection: string};

export type DogQueryDataType = {
    query?: string;
    filters?: DogFiltersType;
    sort?: SortType;
    size?: number;
    page?: number;
    itemsPerPage?: number;
}

type SuccessfullGetBreedsResponse = string[];
type SuccessfullSearchDogsResponse = {
    next: string;
    resultIds: string[];
    total: number;
    prev: string;
};
type SuccessfullGetDogsResponse = DogType[];

export const getBreeds = async () => {

    const response = await ApiCaller({
      url: `/dogs/breeds`,
      method: 'GET',
    });

    if (response.success && response.data ) {
        let breeds: SuccessfullGetBreedsResponse = await response.data.json();
        
        return {
            success: true,
            breeds,
        }
    }
    else {
        return {
            success: false,
            error: response.error
        }
    }

};

export const getDogsWithFilter = async (data: DogQueryDataType ) => {

    let {filters, sort, query} = data;

    if (!query){
        let queryArray: string[] = [];
        if (data.size) {
            queryArray.push(`size=${data.size}`);
        }
        if (data.page && data.size) {
            queryArray.push(`from=${(data.page - 1) * data.size}`);
        }
        if (filters && filters.minAge) {
            queryArray.push(`ageMin=${filters.minAge}`);
        }
        if (filters && filters.maxAge) {
            queryArray.push(`ageMax=${filters.maxAge}`);
        }
        if (filters && filters.breeds.length) {
            filters.breeds.forEach(breed => queryArray.push(`breeds=${breed}`))
        }
        if (sort && sort.sortType && sort.sortDirection) {
            queryArray.push(`sort=${sort.sortType}:${sort.sortDirection}`);
        }
        query = queryArray.join('&');
    } 

    let url = `/dogs/search?${query}`;

    const response = await ApiCaller({
      url,
      method: 'GET',
    });

    if (response.success && response.data ) {
        let result: SuccessfullSearchDogsResponse = await response.data.json();
        let {next, prev, total} = result;
        let {dogs} = await getDogsByIds(result.resultIds);

        return {
            success: true,
            dogs,
            next,
            prev, 
            total
        }
    }
    else {
        return {
            success: false,
            error: response.error
        }
    }
}

export const getDogsByIds = async (ids: string[]) => {
    const response = await ApiCaller({
        url: `/dogs`,
        method: 'POST',
        body: ids
      });
  
      if (response.success && response.data ) {
          let dogs: DogType[] = await response.data.json();
          return {
              success: true,
              dogs,
          }
      }
      else {
          return {
              success: false,
              error: response.error
          }
      }
}

export const postMatch = async (ids: string[]) => {
    const response = await ApiCaller({
        url: `/dogs/match`,
        method: 'POST',
        body: ids
      });

      if (response.success && response.data ) {
          return {
              success: true,
          }
      }
      else {
          return {
              success: false,
              error: response.error
          }
      }
}