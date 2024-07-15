//weather app

import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

const [city, setCity] = useState('Delhi')
const [weather, setWeather] = useState(null)



const currentDate = new Date()
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
const month = months[currentDate.getMonth()]
const day = currentDate.getDate()
const year = currentDate.getFullYear()
const formatedDate = `${month} ${day}, ${year}`


const API_KEY = "bf1a0f395228fc9331e82120df23cae8"


const fetchWeatherData = async ()=>{
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
     const data = await response.json()
     console.log(data)
     setWeather(data)

  }
  catch(error){
     console.log(error)
  }
}

useEffect(()=>{
fetchWeatherData();
},[])


const handleInputChange=(event)=>{
console.log(event.target.value)
setCity(event.target.value)
}

const handleSubmit=(event)=>{
  event.preventDefault();
  fetchWeatherData();
}

const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.png"; 
      case "Rain":
        return "/rain_with_cloud.png"; 
      case "Mist":
        return "/Tornado.png"; 
      case "Haze":
        return "/sun.png"; 
      
      default:
        return null;
    }
  };


  return (
    <div className='App'>
      <div className='container'>
     {weather && (
      <>
       <h1 className='contanier_date'>{formatedDate}</h1>
      <div className='weather_data'>
        <h2 className='contanier_city'>{weather.name}</h2>
         
         <img 
         className='contanier_img'
         src={getWeatherIconUrl(weather.weather[0].main)} 
         width="180px"
         alt="weather icon" 
         />



        <h3 className='contanier_temp'>{weather.main.temp}</h3>
        <h2 className='weather'>{weather.weather[0].description}</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter City Name" className="input_box" onChange={handleInputChange} />
          <button className='btn'>Search</button>
        </form>
      </div>
      </>
     )}
      </div>
    </div>
  )
}

export default App