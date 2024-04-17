import Search from "./Search";
import { MdOutlineMyLocation } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoPartlySunny } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import UnitSelect from "./UnitSelect";
import { useContext } from "react";
import {  WeatherDataContext } from "../App";
import { useGetCoOrd } from "../utils/GetCoord";



const Navbar = () => {



  const weatherContext = useContext(WeatherDataContext)

  const {getCoOrd} = useGetCoOrd()


  return (
    <nav className="bg-white  sticky top-0 left-0 shadow-md z-50">
      <div className="flex gap-2 px-3 justify-between items-center w-full h-[10vh] mx-auto max-w-7xl">
        <div className="flex gap-1 items-center">
          <p className="text-2xl text-black sm:text-3xl font-semibold ">
            Weather
          </p>
          <p className="text-2xl sm:text-4xl text-yellow-300">
            <IoPartlySunny />
          </p>
        </div>
        <div className="flex gap-1 h-[30px] items-center">
          <p
            data-tooltip-id="my-tooltip-1"
            className="cursor-pointer flex items-center text-2xl me-6 relative"
            onClick={()=>{getCoOrd()}}
          >
            <MdOutlineMyLocation />
          </p>
          <ReactTooltip
            id="my-tooltip-1"
            place="bottom-start"
            content="Current Location"
          />
          <p className=" flex items-center text-2xl">
            <IoLocationOutline />
          </p>
          <p className="me-3 h-full max-w-[100px] overflow-hidden text-ellipsis flex items-center pointer-events-none">
            {
              weatherContext?.weatherData?.city?.name
            }
          </p>
          <div className="hidden gap-1 h-full md:flex  md:items-center">
            <UnitSelect />
            <Search  />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
