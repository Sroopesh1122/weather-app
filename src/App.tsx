// import { useState } from 'react';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import MainDashboard from './components/MainDashboard';
import axios from 'axios';
import { useQuery } from 'react-query';
import { WeatherForecast } from './utils/WeatherData'
import { useLoading, useWeatherCoOrdinates } from './utils/AppState';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';

type WeatherContextProps = {
  weatherData: WeatherForecast | null | undefined,
  setWeatherData: (val: WeatherForecast) => void
}

type AppProps = {
  lat?: number,
  lon?: number
}

export const WeatherDataContext = createContext<WeatherContextProps | undefined>({} as WeatherContextProps)


function App(props:AppProps) {

  const [lat, setLat] = useState<number | undefined>(0)
  const [lon, setLon] = useState<number | undefined>(0)

  const {setUnit}  =useWeatherCoOrdinates()

  const [weatherData, setWeatherData] = useState<WeatherForecast>({} as WeatherForecast)

  // const intervalHook = useInterval()



  const { setLoading, isLoading } = useLoading()




  const getWeatherData = useCallback(async () => {
    
    if(lat !==0 && lon !==0)
      {
        try {
          setLoading(true)
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9046d2f04ae04131fb68ce0fa819744e`) 
         setUnit({lat:lat,lon:lon})
          return res.data
        } catch (error: any) {
          throw new Error(error)
        }
        finally {
          setLoading(false)
        }
      }
  },[lat,lon,setLoading,setUnit])




  const { isError, error, refetch, } = useQuery<WeatherForecast>('weatherData', getWeatherData, {
    enabled: false, onSuccess: (data) => {

      setWeatherData(data)
    }
  })

  useEffect(() => { 
    if (props.lat === undefined && props.lon === undefined ) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setLat(pos.coords.latitude)
          setLon(pos.coords.longitude)
          setUnit({lat:props.lat,lon:props.lon})
        })
      }
    }
    else {
     setLat(props?.lat)
      setLon(props?.lon)
      
    }

  }, [props.lat,props.lon,setUnit])


  useEffect(() => {
    if (lat !==  undefined   && lon !== undefined ) {
      
      refetch()
    }
  }, [lat, lon, refetch])


  if (isError) return <h1>{JSON.stringify(error)}</h1>




  return (
    <>
      <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
        <Toaster />
        <div className='min-h-screen w-full'>
          <Navbar />
          {
            isLoading ? <><Loader/></> :  (weatherData?.cod ? <><MainDashboard /></> : <></>)
          }
        </div>
      </WeatherDataContext.Provider>
    </>
  );
}


export default App;
