import React from 'react'
import App from '../App'
import { useWeatherCoOrdinates } from '../utils/AppState'

const WeatherReport = () => {

    const {coord} =useWeatherCoOrdinates()

    
    
  return (
    <div>
      <App lat={coord.lat} lon={coord.lon}/>
    </div>
  )
}

export default WeatherReport
