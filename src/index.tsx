import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeatherReport from './pages/WeatherReport';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<WeatherReport/>}/>
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

