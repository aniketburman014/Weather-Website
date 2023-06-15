import { DateTime } from "luxon";

const TIMEZONE_API_BASE_URL = "https://api.ipgeolocation.io/timezone";
const API_KEY="bee4658ee99291b45e44a9611f279e59";
const BASE_URL="https://api.openweathermap.org/data/2.5";
let timezone;
const getTimeZoneData = async (city) => {
    const url = new URL(TIMEZONE_API_BASE_URL);
    url.search = new URLSearchParams({
      apiKey: "a821f4b7960d4414b56873d5624a7b17",
      location: city,
    });
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    return fetch(url)
        .then((res) => res.json());
};

const formatCurrentWeather= (data) =>{
    const {
        coord : {lat, lon},
        main : {temp, feels_like, temp_min, temp_max, pressure, humidity},
        visibility,
        wind : {speed},
        sys : {country , sunrise, sunset},
        weather,
        name,
        dt,
    } = data
    
    const {main: details,icon} =weather[0];

    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,visibility,pressure,name,dt,country,sunrise,sunset,details,icon,speed};
};

const formatForecastWeather = (data) => {
    let { 
        list
        } = data;
    
    let hourly = list.slice(0, 5).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
        temp: d.main.temp,
        icon: d.weather[0].icon,
      };

    });

  
    return { hourly };
  };


const getFormattedWeatherData = async (searchParams) => {
  
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
    if(formattedCurrentWeather===-1 ) return -1;
    const {lat,lon,name} =formattedCurrentWeather

    

    const timeZoneData = await getTimeZoneData(name);
    timezone = timeZoneData.timezone;

    const formattedForecastWeather = await getWeatherData('forecast',{lat,lon,units:searchParams.units}).then(formatForecastWeather);

 

    return {...formattedCurrentWeather,...formattedForecastWeather,timezone};
};
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const iconUrlFromCode = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode};


