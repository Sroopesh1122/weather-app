import { useContext} from "react"
import { useLoading, useWeatherCoOrdinates } from "./AppState"
import axios from "axios"
import toast from "react-hot-toast"
import { WeatherDataContext } from "../App"

export const useGetCoOrd = () =>{


    const weatherDataContext =useContext(WeatherDataContext)
    const {setLoading} = useLoading()

    const {setUnit} = useWeatherCoOrdinates()

    const getCoOrd =()=>{
        if(navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(async(pos)=>{
                    
                    try {
                        setLoading(true)
                        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=9046d2f04ae04131fb68ce0fa819744e`)
                        setUnit({lat:pos.coords.latitude , lon:pos.coords.longitude})
                        if(res.data)
                            {
                              weatherDataContext?.setWeatherData(res.data)
                            }
                    } catch (error) {
                       toast.error("Something Went Wrong")   
                    }
                    finally{
                        setLoading(false)
                    }
                })
            }
    }

  return {getCoOrd}

}