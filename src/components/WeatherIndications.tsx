import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';



interface IWeatherDay {
  morning: string;
  afternoon: string;
}


function App() {  
  
  const [weatherDay, setWeatherDay] = useState<IWeatherDay>()


  return (
    <div className="WeatherIndications">
    </div>
  );
}

export default App;