import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthRoutes from './AuthRoutes/AuthRoutes.tsx';
import NonAuthRoutes from './NonAuthRoutes/NonAuthRoutes.tsx';
import Login from '../pages/Login/Login.tsx';
import PetFinder from '../pages/PetFinder/PetFinder.tsx';
import NotFound from '../pages/NotFound/NotFound.tsx';

const AppRouter = () => {

    return (
    <Routes>
        <Route element={<AuthRoutes />}>
            <Route path='/fetch-challenge/' element={<PetFinder />} />
        </Route>
        <Route element={<NonAuthRoutes />}>
            <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
    </Routes>
    );
    

}

export default AppRouter;