import React from 'react'
import { useMetrics } from '../utils/AppState'

const UnitSelect = () => {

    const {unit ,setUnit}  = useMetrics()

    const unitData = [{name:"Celcius",sys:"C"} ,{name:"Kelvin",sys:"K"}, {name:"Farenhite",sys:"F"}]

  return (
    <div className='mr-4 text-black'>
       <div className='flex gap-1'>
        <p>Unit</p>
        <select className='unit-selector rounded-md' name="" id="" value={unit} onChange={(e)=>setUnit(e.target.value)}>
             {
                unitData.map((data,idx)=><option key={idx} value={data.sys}  selected ={data.sys === unit } >{data.name}</option> )
             }
        </select>        
       </div>
    </div>
  )
}

export default UnitSelect
