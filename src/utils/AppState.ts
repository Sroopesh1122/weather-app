import create from 'zustand';
import { WeatherForecast } from './WeatherData';

interface MetricState {
    unit: string;
    setUnit: (newText: string) => void;
  }
  interface WeatherCoOrdinates {
    coord:{lat:number | undefined ,lon :number | undefined} 
    setUnit: (newText: {lat:number | undefined ,lon :number | undefined}) => void;
  }

  interface LoadingState {
    isLoading: boolean;
    setLoading: (newval: boolean) => void;
  }

  interface weatherState {
    weatherData : WeatherForecast | {} ,
    setWeatherData : (newData : WeatherForecast) =>void
  }

  interface themeState {
    theme : string ,
    setTheme : (newData : string) =>void
  }

  export const useWeatherState = create<weatherState>((set) => ({
    weatherData: {},
    setWeatherData: (newData) => set({ weatherData: newData }),
  }));

  export const useMetrics = create<MetricState>((set) => ({
    unit: 'C',
    setUnit: (newText) => set({ unit: newText }),
  }));

  export const useLoading = create<LoadingState>((set) => ({
    isLoading: false,
    setLoading: (newVal) => set({ isLoading: newVal }),
  }));

  export const useWeatherTheme = create<themeState>((set) => ({
    theme: 'default',
    setTheme: (newVal) => set({ theme: newVal }),
  }));

  export const useWeatherCoOrdinates = create<WeatherCoOrdinates>((set) => ({
    coord:{lat:undefined , lon:undefined},
    setUnit: (newVal) => set({coord : newVal}),
  }));