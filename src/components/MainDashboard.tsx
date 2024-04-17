import React, { ReactNode, useContext } from 'react'
import TeampDetailsCard from './TeampDetailsCard'
import { IoEyeOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { MdWindPower } from "react-icons/md";
import { FaTachometerAlt } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { get5DayForecastData,  getBackgroud,  getTemperatue, getTime, getTimeInAMPM, getVisibility, getWind, isToday } from '../utils/Units';
import { WeatherDataContext } from '../App';
import { useMetrics, useWeatherTheme } from '../utils/AppState';
import GetWeatherIcon from './GetWeatherIcon';
import MobileNavbar from './MobileNavbar';
import Forecast from './Forecast';



const MainDashboard = () => {

    const { unit } = useMetrics()

    const weatherData = useContext(WeatherDataContext)

    const firstData = weatherData?.weatherData?.list && weatherData?.weatherData?.list[0]

    // const forecastData = get5DayWeatherData(weatherData?.weatherData?.list);

    const {theme}  = useWeatherTheme()

    const forecastAvgData = get5DayForecastData(weatherData?.weatherData?.list); 
    

    if (weatherData?.weatherData !== null && weatherData?.weatherData !== undefined) {
        return (
            <div className={`min-h-[90vh] ${getBackgroud(theme)}`}>
                <MobileNavbar />
                <section className='max-w-7xl mx-auto p-3'>
                    <div className='flex justify-between gap-22 flex-col md:flex-row '>
                        <TeampDetailsCard />
                        {/* details */}
                        <div className='flex flex-1 px-10 ml-0 gap-8 md:ml-4  justify-start card items-center overflow-x-auto cards-wrapper'>
                            <SubInfo title='Visibility' icon={<IoEyeOutline className='text-2xl' />} value={getVisibility(firstData?.visibility || 1000) + " km"} />
                            <SubInfo title='Humidity' icon={<WiHumidity className='text-3xl' />} value={firstData?.main?.humidity + "%"} />
                            <SubInfo title='Wind Speed' icon={<MdWindPower className='text-2xl' />} value={getWind(firstData?.wind?.speed || 3000) + "km/h"} />
                            <SubInfo title='Air Pressure' icon={<FaTachometerAlt className='text-2xl' />} value={firstData?.main?.pressure + "hPa"} />
                            <SubInfo title='Sunrise' icon={<FiSunrise className='text-2xl' />} value={getTime(weatherData?.weatherData?.city?.sunrise || 1234321)} />
                            <SubInfo title='Sunset' icon={<FiSunset className='text-2xl' />} value={getTime(weatherData?.weatherData?.city?.sunset || 1234321)} />
                        </div>
                    </div>
                    <div className='mt-3 py-2  card px-2'>
                        <div className='flex time-wrapper flex-1 gap-12 justify-start items-center overflow-x-auto'>
                            {
                                weatherData?.weatherData?.list?.map((data, idx): React.ReactNode => {
                                    if (isToday(data.dt_txt)) {
                                        return <TimeInfo key={idx} title={getTimeInAMPM(data.dt_txt)} icon={<GetWeatherIcon id={data.weather[0].icon || ""} />} value={getTemperatue(data.main.temp || 273, unit)} />
                                    }
                                    else return null
                                })
                            }
                        </div>
                    </div>
                </section>
                <section className='max-w-7xl mx-auto  py-10 px-0 md:px-5 '>
                    <h1 className='text-black text-3xl font-semibold ps-4 mb-10 '>Forecast (4 Days)</h1>
                    {
                        forecastAvgData.map((data,idx)=>{
                            return <Forecast key={idx} data={data} sunrise={weatherData.weatherData?.city?.sunrise} sunset={weatherData.weatherData?.city?.sunset}/>
                        })
                    }
                   
                </section>
            </div>
        )
    }
    else {
        return <></>
    }
}

type Props = {
    title: string,
    icon: ReactNode,
    value: string
}


const SubInfo = (props: Props) => {
    return (<div className='flex flex-col gap-5 text-lg items-center p-5'>
        <p className='text-nowrap'>{props.title}</p>
        <p>{props.icon}</p>
        <p>{props.value}</p>
    </div>)
}

const TimeInfo = (props: Props) => {

    const { unit } = useMetrics()

    return (<div className='flex flex-col gap-5 text-md items-center p-5'>
        <p className='text-nowrap'>{props.title}</p>
        <p>{props.icon}</p>
        <p className='whitespace-nowrap'>{props.value}&deg; {unit}</p>
    </div>)
}


export default MainDashboard
