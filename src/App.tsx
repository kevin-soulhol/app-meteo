import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';



interface IWeatherDay {
  morning: string;
  afternoon: string;
}


function App() {  
  
  const [weatherDay, setWeatherDay] = useState<IWeatherDay>()
  const [tomorrow, setTomorrow] = useState<boolean>(true)

  let baseUrl =  'https://api.open-meteo.com/v1/meteofrance?&hourly=temperature_2m,weathercode'
  const latitude = 43.60
  const longitude = 1.44

  const fetchWeather = () => {

    let day = new Date()
    if(tomorrow){
      day.setDate(day.getDate() + 1)
    }


    let date = day.getDay()
    let stringDay = date<10 ? `0${date}` : `${date}`
    let month = day. getMonth()
    let stringMonth = month<10 ? `0${month}` : `${month}`
    let year = day.getFullYear()

    let url = `${baseUrl}&latitude=${latitude}&longitude=${longitude}`
     url = `${url}&start_date=${year}-${stringMonth}-${stringDay}`
     url = `${url}&end_date=${year}-${stringMonth}-${stringDay}`

    fetch(url).then(response => response.json()).then(data => {
      let tempDay = parseWeather(data)
      setWeatherDay(tempDay);
      console.log(data)
    })
  }

  const parseWeather = (data : any) => {

    let morningMoyenne = 0
    let afternoonMoyenne = 0

    if(data && data.hourly){

      let morningTemp = data.hourly.temperature_2m.slice(9, 13)
      let AfternoonTemp = data.hourly.temperature_2m.slice(14, 18)

      morningMoyenne = getMoyenne(morningTemp)
      afternoonMoyenne = getMoyenne(AfternoonTemp)

    }

    return {
      morning : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 2, style : 'unit', unit : 'celsius' }).format(morningMoyenne),
      afternoon : new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 2, style : 'unit', unit : 'celsius' }).format(afternoonMoyenne) 
    }

  }

  const getMoyenne = (arr : number[]) => {
    return arr.reduce((acc : number , curr : number) => acc + curr, 0)/arr.length;
  }

  const toggleTomorrow = () => {
    setTomorrow(!tomorrow)
  }


  useEffect(() => {
    fetchWeather()
  }, [tomorrow])

  return (
    <div className="App">
      
      <div>
        Temp Matin : {weatherDay?.morning}
        Temp Aprem : {weatherDay?.afternoon}
      </div>

      <button onClick={toggleTomorrow}>{tomorrow ? 'Today' : 'Demain'}</button>
    
    </div>
  );
}

export default App;