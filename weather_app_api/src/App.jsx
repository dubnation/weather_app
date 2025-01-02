import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import search_icon from './assets/search.png'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('Berkeley')
  const [inputValue, setInputValue] = useState('')
  const default_location = "Berkeley"

  function getURL(location) {
    if (!location) {
      return `https://api.openweathermap.org/data/2.5/weather?q=${default_location}&appid=your_api_key`;
    }
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=517feb39adde6738e7a29aefca6a4bfe`;
  }

  function tempConvert(temp) {
    return ((temp - 273.15) * 9/5 + 32).toFixed(0);
  }


  return (
    <div className = 'app'> 
<div className="search">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter Location"
      className="search-input"
    />
<button
  className="search-button"
  onClick={async () => {
    try {
      const response = await axios.get(getURL(inputValue)); // Wait for the response
      console.log(response); // Log the full response
      setData(response.data); // Safely store the data
      setLocation(response.data.name)
    } catch (error) {
      console.error("Error fetching data:", error); // Log the error
      alert("Failed to fetch data. Please try again."); // Optional: Display user-friendly message
    }
  }}
>
  <img src={search_icon} alt="Search Icon" className="search-icon" />
</button>
  </div>
    <div className = 'container'>
      <div className = 'top'>
        <div className = 'location'>
          <p>{location}</p>
        </div>
        <div className = 'temp'>
          <h1> 
            {tempConvert(data.main.temp)}°F
          </h1>
        </div>
        <div className = 'description'> 
          <p>{data.weather[0].description}</p>
        </div>
      </div>

      <div className = "bottom">
        <div className = 'feels'>
          <p className = 'bold'>{tempConvert(data.main.feels_like)}°F</p>
          <p>Feels Like</p>
        </div>
        <div className = 'humidity'>
          <p className = 'bold'>{data.main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className = 'wind'>
          <p className = 'bold'>{data.wind.speed} MPH</p>
          <p>Wind Speed</p>
        </div>
      </div>


    </div>

    </div>
  )
}

export default App;