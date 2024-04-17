import React, { useContext, useEffect } from 'react'
import { WeatherDataContext } from '../App';
import { getTemperatue } from '../utils/Units';
import { useMetrics, useWeatherTheme } from '../utils/AppState';
import GetWeatherIcon from './GetWeatherIcon';


const getDateTime = (val: string) => {
    if (val) {
        const date = new Date(val);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeekNumber = date.getDay();
        const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

        const formattedDate = `${dayOfWeekName}  ${formattedDay}/${formattedMonth}/${year}`;
        return formattedDate
    }
}

const TeampDetailsCard = () => {

    const {setTheme} = useWeatherTheme()

    const weatherData = useContext(WeatherDataContext)

    const firstData = weatherData?.weatherData?.list && weatherData?.weatherData?.list[1]

    const { unit } = useMetrics()

    const weatherStatus = firstData?.weather[0].main;

    useEffect(()=>{
    if(weatherStatus)
        {  
          setTheme(weatherStatus.toLowerCase())
        }
    },[weatherStatus,setTheme])

    if (firstData) {
        return (
            <div className='card p-4'>
                <div className='my-2'>
                    <p className='text-xl font-semibold text-start'>{getDateTime(firstData?.dt_txt || "null")}</p>
                    <p className='text-3xl text-center font-bold'>{weatherData?.weatherData?.city.name}  ({weatherData?.weatherData?.city.country})</p>
                </div>
                <p className='flex items-center justify-center text-4xl'>{getTemperatue(firstData?.main.temp || 273, unit)}&deg;{unit} <span className='flex items-center text-6xl ml-2'><GetWeatherIcon id={firstData?.weather[0].icon || ""} /></span> </p>
                <div className='flex flex-col items-center text-md'>
                    <p className='text-3xl font-semibold'>{firstData?.weather[0]?.main}</p>
                    <p>{getTemperatue(firstData?.main?.feels_like || 273, unit)}&deg;</p>
                    <div className='flex gap-4'>
                        <p>{getTemperatue(firstData?.main?.temp_max || 273, unit)}&uarr;</p>
                        <p>{getTemperatue(firstData?.main?.temp_min || 273, unit)}&darr;</p>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return null
    }
}

export default TeampDetailsCard
