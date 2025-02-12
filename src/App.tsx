import React from 'react';

import AppRoutes from './routes/AppRoutes.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './provider/AuthProvider.tsx';
import './App.scss';
import { BreedsProvider } from './provider/BreedsProvider.tsx';
import { FavDogsProvider } from './provider/FavDogsProvider.tsx';
import { InfoMessage } from './components/InfoMessage/InfoMessage.tsx';
import { InfoMessageProvider } from './provider/InfoMessageProvider.tsx';
import dotenv from  'dotenv'


function App() {

  return (
    <div className="App">
      <AuthProvider>
        <InfoMessageProvider>
          <BreedsProvider >
            <FavDogsProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </FavDogsProvider>
          </BreedsProvider>
        </ InfoMessageProvider>
      </AuthProvider>

      <style>
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
      </style>
    </div>
  );
}

export default App;
