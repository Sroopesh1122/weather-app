import { FilteredLocationData, ForecastItem, LocationData } from "./WeatherData";

export function getVisibility(meters: number): number {
  return meters / 1000;
}

export function getWind(metersPerSecond: number): string {
  const result = metersPerSecond * 3.6;
  return result.toFixed(1)
}

export function getTime(time: number): string {
  const unixTimestamp = time * 1000;
  const date = new Date(unixTimestamp);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const timeIn24HoursFormat = `${hours}:${minutes}:${seconds}`
  return timeIn24HoursFormat
}

export function getTemperatue(value: number, type: string): string {

  if (type === 'C') {
    return (value - 273.15).toFixed(2);
  }

  if (type === 'K') {
    return value.toFixed(2)
  }

  if (type === 'F') {
    return ((value - 273.15) * 9 / 5 + 32).toFixed(2);
  }
  else {
    return "273"
  }

}


export function isToday(value: string): boolean {
  const givenDate = new Date(value);
  const today = new Date();
  return (givenDate.getDate() === today.getDate() || givenDate.getDate() - 1 === today.getDate()) &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getFullYear() === today.getFullYear();
}

export function getTimeInAMPM(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const timeInAMPM = hours + ':' + formattedMinutes + ' ' + ampm;
  return timeInAMPM;
};

function isOnlyToday(value: string): boolean {
  const givenDate = new Date(value);
  const today = new Date();
  return givenDate.getDate() === today.getDate() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getFullYear() === today.getFullYear();
}

const getDateOnly = (dateString: string) => {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};


export function get5DayWeatherData(dataList: Array<ForecastItem> | undefined): Array<number> {

  const dayData: Array<string> = []

  const resultData: Array<number> = []

  if (dataList) {
    dataList.forEach((data, idx) => {
      if (!isOnlyToday(data.dt_txt)) {
        const date = getDateOnly(data.dt_txt)
        if (!dayData.includes(date)) {
          dayData.push(date)
          resultData.push(idx)
        }
      }
    })
  }
  return resultData
}


export function get5DayForecastData(dataList: Array<ForecastItem> | undefined): Array<ForecastItem> {

  const dayData: Array<string> = []

  const resultData: Array<number> = []

  const resultList: Array<ForecastItem> = []

  if (dataList) {
    dataList.forEach((data, idx) => {
      if (!isOnlyToday(data.dt_txt)) {
        const date = getDateOnly(data.dt_txt)
        if (!dayData.includes(date)) {
          dayData.push(date)
          resultData.push(idx)
        }

      }
    })


    for (let i = 0; i < resultData.length - 1; i++) {
      let tempAvg = 0
      let feellike = 0
      let visibility = 0
      let humidity = 0
      let wind = 0
      let pressure = 0
      const avgDenominator = resultData[i + 1] - resultData[i]
      for (let j = resultData[i]; j < resultData[i + 1]; j++) {
        tempAvg = tempAvg + dataList[j].main.temp
        feellike = feellike + dataList[j].main.feels_like
        visibility = visibility + dataList[j].visibility
        humidity = humidity + dataList[j].main.humidity
        wind = wind + dataList[j].wind.speed
        pressure = pressure + dataList[j].main.pressure
      }
      dataList[resultData[i]].main.temp = tempAvg / avgDenominator
      dataList[resultData[i]].main.feels_like = feellike / avgDenominator
      dataList[resultData[i]].visibility = visibility / avgDenominator
      dataList[resultData[i]].main.humidity = humidity / avgDenominator
      dataList[resultData[i]].wind.speed = wind / avgDenominator
      dataList[resultData[i]].main.pressure = pressure / avgDenominator

      resultList.push(dataList[resultData[i]])
    }
  }
  return resultList


}


export function getBackgroud(val: string): string {
  if (val === 'clear') {
    return 'bg-gradient-to-b from-slate-50 via-orange-200 to-orange-400'
  }
  else if (val === 'clouds') {
    return 'bg-gradient-to-b from-slate-50 via-cyan-100 to-cyan-300'
    // return 'bg-gradient-to-b from-slate-50 to-orange-200'
  }
  else if (val === 'rain') {
    return 'bg-gradient-to-b from-slate-50 to-blue-600'
  }
  else {
    return 'bg-white'
  }


}


export const getDateTime = (val: string) => {
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


export const getTableFilteredData = (data: LocationData): FilteredLocationData[] => {

  const result: FilteredLocationData[] = [];
  if (data) {

    data.results.forEach((item): void => {
      const { geoname_id, name, ascii_name, country_code, cou_name_en, timezone, coordinates } = item
      result.push({ geoname_id, name, ascii_name, country_code, cou_name_en, timezone, coordinates })
    })
  }
  return result

}