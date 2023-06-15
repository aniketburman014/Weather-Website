import './App.css';
import Top from './component/TopButton';
import Input from './component/Input';
import TimeandLocation from './component/TimeandLocation';
import TempAndDetail from './component/TempAndDetail';
import Forecast from './component/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [query, setQuery] = useState({q:"delhi"});
  const [units, setUnits]=useState("metric");
  const [weather, setWeather] = useState(null);


  useEffect(() =>{
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({...query,units}).then((data) => {
        if(data===-1) toast.error('errot');        
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
      
    }
    fetchWeather();
  },[query,units]);


  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const {dt,sunset}=weather;
    const threshold = units === "metric" ? 25 : 60;
    const isNight =  ( Number(dt) > Number(sunset));
    
    if (isNight) return "bg-gradient-to-b from-indigo-900 to-blue-900";
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    
    return "from-yellow-700 to-orange-700";
  };




  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <Top setQuery={setQuery} />
      <Input setQuery={setQuery} setUnits={setUnits} units={units}/>
      {weather && <div> 
      <TimeandLocation weather={weather} /> 
      <TempAndDetail weather={weather} />
      <Forecast items={weather.hourly}  />
      </div>
      }
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      
    </div>
  );
}

export default App;
