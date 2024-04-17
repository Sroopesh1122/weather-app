import React from 'react'
import { IoIosSunny } from "react-icons/io";
import { IoMoonOutline ,IoThunderstormSharp } from "react-icons/io5";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsCloudMoon ,BsCloudsFill } from "react-icons/bs";
import { FaCloud ,FaCloudRain,FaRegSnowflake } from "react-icons/fa";
import { LiaCloudSunRainSolid ,LiaCloudMoonRainSolid } from "react-icons/lia";
import { MdWaves } from "react-icons/md";

const GetWeatherIcon = ({ id }: { id: string }) => {


    if (id === "01d") {
        return (
            <IoIosSunny className='text-orange-400' />
        )
    }
    else if (id === "01n") {
        return <IoMoonOutline className='text-black' />
    }

    else if (id === "02d") {
        return <TiWeatherPartlySunny className='text-black' />
    }
    else if (id === "02n") {
        return <BsCloudMoon className='text-black' />
    }
    else if (id === "03d" || id === "03n") {
        return <FaCloud className='text-black' />
    }
    else if (id === "04d" || id === "04n") {
        return <BsCloudsFill className='text-black' />
    }
    else if (id === "09d" || id === "09n") {
        return <FaCloudRain className='text-black' />
    }
    else if (id === "10d") {
        return <LiaCloudSunRainSolid className='text-black' />
    }
    else if (id === "10n") {
        return <LiaCloudMoonRainSolid className='text-black' />
    }
    else if (id === "11d" || id === "11n") {
        return <IoThunderstormSharp className='text-black' />
    }
    else if (id === "13d" || id === "13n") {
        return <FaRegSnowflake className='text-black' />
    }
    else if (id === "14d" || id === "14n") {
        return <MdWaves className='text-black' />
    }
    else {
        return <></>
    }

}

export default GetWeatherIcon
