import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLoading, useWeatherCoOrdinates } from "../utils/AppState";
import { WeatherDataContext } from "../App";

import { toast } from 'react-hot-toast'


const Search = () => {

  const { setLoading } = useLoading()

  const [val, setValue] = useState("")

  const weatherDataContext = useContext(WeatherDataContext)

  const {setUnit}  = useWeatherCoOrdinates()

  const [isError,setIsError] =useState(false)

  const [errrMsg,setErrMsg] =useState('')
  
  const getData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${val}&appid=9046d2f04ae04131fb68ce0fa819744e`)
      setUnit({lat:res.data.city.coord.lat,lon:res.data.city.coord.lon})
      
      weatherDataContext?.setWeatherData(res.data)
    } catch (error: any) {
      setIsError(true)
      setErrMsg(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
    }
    finally {
      setValue('')
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (val.length >= 3) {
      
      getData()
    }
    else{
      toast("Provide Atleast 3 letter to search")
    }
  }


  const ref = useRef<HTMLFormElement>(null)

  if(isError)
    {
      return <div className="min-h-screen flex items-center justify-center">{errrMsg}</div>
    }

  return (
    <form ref={ref} onSubmit={handleFormSubmit} className='flex search-container h-full'>
      <input type="text" placeholder='Seach City...' value={val} onChange={(e) => setValue(e.target.value)} className='text-sm border-1 border-gray-900 rounded-l-md focus:outline-none px-2' />
      <div className='h-full'>
        <button type="submit" className="w-full h-[25px] md:h-full">
          <CiSearch className='w-full h-full cursor-pointer search-icon rounded-r-md' />
        </button>
      </div>
    </form>
  )
}

export default Search

