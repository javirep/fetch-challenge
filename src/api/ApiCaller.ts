import Axios from 'axios';
import { redirect } from 'react-router-dom';

type ApiCallerParams = {
    url: string,
    method: string,
    body?: object
}

export const ApiCaller = async (params: ApiCallerParams) => {
    try {

        let baseURL = process.env.REACT_APP_BASE_URL;
        const {url, method, body} = params;

        const response = await fetch(baseURL + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })

        if (response.status == 200){

            return {
                success: true,
                data: response
            }
        }
        if (response.status == 401){
            
            window.location.href ='/login'
            return {
                success: false, 
                data: response
            }
        }
        else {
            return {
                success: false, 
                data: response
            }
        }
            
    }
    catch (error) {
        console.error(error)
        return {
            success: false,
            error,
            customMessage: 'Failed to fetch patients'
        }
    }
}

export default ApiCaller;
