import React from 'react'
import { ForecastItem } from '../utils/WeatherData'
import { getDateTime, getTemperatue, getTime, getVisibility, getWind } from '../utils/Units'
import { IoEyeOutline } from 'react-icons/io5'
import { WiHumidity } from 'react-icons/wi'
import { MdWindPower } from 'react-icons/md'
import { FaTachometerAlt } from 'react-icons/fa'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { useMetrics } from '../utils/AppState'

type ForecastProps = {
    data: ForecastItem,
    sunrise :number | undefined,
    sunset :number | undefined
}

const Forecast = (props: ForecastProps) => {

    const {unit} = useMetrics()

    return (
        <>
            <div className='w-full mt-4 px-5 flex flex-col md:flex-row'>
                <div className='card p-4 flex flex-col justify-center items-center'>
                    <p className='font-bold text-[1rem] whitespace-nowrap'>{getDateTime(props.data.dt_txt)}</p>
                    <div className='flex justify-center gap-3'>
                        <p className='text-2xl'>{getTemperatue(props.data.main.temp || 273 ,unit )}&deg; {unit}</p>
                    </div>
                    <p className='text-[0.9rem] whitespace-nowrap'>Feels like {getTemperatue(props.data.main.feels_like||273,unit)}&deg;{unit}</p>
                </div>
                <div className='carousal-wrapper flex my-4 gap-8 px-3 overflow-x-auto md:ms-8'>
                  <SubContent title={'Visibility'} icon={<IoEyeOutline className='text-2xl' />} value={getVisibility(props.data.visibility || 1000)+'km'}/>
                  <SubContent title={'Humidity'} icon={<WiHumidity className='text-3xl' />} value={props.data.main.humidity.toFixed(2) + '%'}/>
                  <SubContent title={'WindSpeed'} icon={<MdWindPower className='text-2xl' />} value={getWind(props.data.wind.speed)+'km/h'}/>
                  <SubContent title={'Air Pressure'} icon={<FaTachometerAlt className='text-2xl' />} value={props.data.main.pressure.toFixed(2)+'hPa'}/>
                  <SubContent title={'Sunrise'} icon={<FiSunrise className='text-2xl' />} value={getTime(props.sunrise || 123321)}/>
                  <SubContent title={'Sunset'} icon={<FiSunset className='text-2xl' />} value={getTime(props.sunset || 123321)}/>
                </div>
            </div>
            <hr className='mt-10' />

        </>
    )
}

export default Forecast

type SubContentProps = {
    title :string,
    icon :React.ReactNode,
    value :string
}

const SubContent = (props:SubContentProps) => {
    return <div className='card p-2 px-5 w-fit h-fit flex flex-col justify-center items-center gap-4 min-w-[150px]'>
        <p>{props.title}</p>
        <p>{props.icon}</p>
        <p>{props.value}</p>
    </div>
}
