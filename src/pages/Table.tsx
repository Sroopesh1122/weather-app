import React, { useRef, useEffect, useState,ChangeEvent, useCallback } from 'react';
import { useMemo } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';
import { getTableFilteredData } from '../utils/Units';
import { Column, useTable ,useGlobalFilter} from 'react-table';

interface FilteredLocationData {
  geoname_id: string;
  name: string;
  ascii_name: string;
  country_code: string;
  cou_name_en: string;
  timezone: string;
  coordinates: { lat:number , lon : number };
}

const Table = () => {

  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, SetOffSet] = useState(0)

  const Data: FilteredLocationData[] = useMemo((): FilteredLocationData[] => [], [])
  const columns:Column<FilteredLocationData | any>[]  = useMemo(
    () => [
      {
        Header: 'Geoname ID',
        accessor: 'geoname_id',
      },
      {
        Header: 'City Name',
        accessor: 'name',
      },
      {
        Header: 'Country Name',
        accessor: 'cou_name_en',
      },
      {
        Header: 'TimeZone',
        accessor: 'timezone',
      },
      {
        Header: 'Co-Ordinates(Lat , Lon)',
        accessor: (row: FilteredLocationData) => `${row.coordinates.lon} , ${row.coordinates.lat}`,
      }
    ],
    []
  );




  const [data, setData] = useState(Data)

  const [tableData,setTableData] = useState(Data)

  const [isLoading, setIsLoading] = useState(false)

  const [search,setSearch] =useState('')
  

  function isScrollbarAtBottom(container: HTMLDivElement): boolean {
    const hasVerticalScrollbar = container.scrollHeight > container.clientHeight;

    const isAtBottom = container.scrollTop >= container.scrollHeight - container.clientHeight;

    return hasVerticalScrollbar && isAtBottom;
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollbarAtBottom(container)) {
        SetOffSet((prev) => prev + 1)
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [Data]);





  const { refetch } = useQuery('table-data', async () => {
    setIsLoading(true)
    const res = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset * 20}`)
    if (res.data) {
      const loactionFilteredData = getTableFilteredData(res.data)
      setData((prev) => [...prev, ...loactionFilteredData])
      setTableData((prev)=>[...prev,...loactionFilteredData])
      setIsLoading(false)
    }
  },{enabled:false})

  useEffect(() => {
    refetch()
  }, [offset, refetch])


  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } =  useTable({columns,data:tableData},useGlobalFilter);

 
    const handleSearchChange =(event:ChangeEvent<HTMLInputElement>)=>{
      const searchValue =event.target.value
      setSearch(searchValue)
    }

  const filterTableData =  useCallback(()=>{
      if(search !== '')
        {
           const filteredData = data.filter((row:FilteredLocationData)=>{
            return row.name.toLowerCase().includes(search.toLowerCase())
           })
             setTableData(filteredData)
             console.log(tableData);
             
            // console.log(filteredData);
            
        }
        else{
          setTableData(data)
        }
       
    },[search,data])



  return (
   <>
   <input type="text" value={search || ''} placeholder='Search Table' onChange={handleSearchChange}/>
    <div ref={containerRef} className="h-[700px] overflow-y-auto">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}

          {isLoading && (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '10px', paddingTop: '20px', paddingBottom: '20px' }}>
                <div className='flex justify-center'>
                  <div className="spinner">
                  </div></div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
   </>
  )
}

export default Table

// import React from 'react'

// const Table = () => {
//   return (
//     <div>
//       Table
//     </div>
//   )
// }

// export default Table
// import React, { useMemo } from 'react';
// import { useTable, useGlobalFilter, Column } from 'react-table';

// interface Data {
//   id: number;
//   name: string;
//   age: number;
//   country: string;
// }

// const Table: React.FC<{ data: Data[] }> = ({ data }) => {
//   const columns : Column<Data[]> = useMemo(
//     () => [
//       { Header: 'ID', accessor: 'id' },
//       { Header: 'Name', accessor: 'name' },
//       { Header: 'Age', accessor: 'age' },
//       { Header: 'Country', accessor: 'country' },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state,
//     setGlobalFilter,
//   } = useTable<Data>({ columns, data }, useGlobalFilter);

//   const { globalFilter } = state;

//   return (
//     <div>
//       <input
//         type="text"
//         value={globalFilter || ''}
//         onChange={(e) => setGlobalFilter(e.target.value)}
//         placeholder="Search..."
//       />
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;


