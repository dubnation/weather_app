import React, { useState, useEffect } from 'react';
import axios from 'axios';
import search_icon from './assets/search.png';

function App() {
  const default_location = "Berkeley";
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(default_location);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchDefaultData() {
      try {
        const response = await axios.get(getURL(default_location));
        setData(response.data); // Set the data for the default location
      } catch (error) {
        console.error("Error fetching default location data:", error);
        alert("Failed to fetch default location data. Please try again.");
      }
    }
    fetchDefaultData();
  }, []);

  function getURL(location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  }

  function tempConvert(temp) {
    return temp ? ((temp - 273.15) * 9 / 5 + 32).toFixed(0) : null;
  }

  return (
    <div className="app">
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
              const response = await axios.get(getURL(inputValue));
              setData(response.data);
              setLocation(response.data.name);
            } catch (error) {
              console.error("Error fetching data:", error);
              alert("Failed to fetch data. Please try again.");
            }
          }}
        >
          <img src={search_icon} alt="Search Icon" className="search-icon" />
        </button>
      </div>
      <div className="container">
        {data ? (
          <>
            <div className="top">
              <div className="location">
                <p>{location}</p>
              </div>
              <div className="temp">
                <h1>{tempConvert(data?.main?.temp)}°F</h1>
              </div>
              <div className="description">
                <p>{data?.weather?.[0]?.description}</p>
              </div>
            </div>

            <div className="bottom">
              <div className="feels">
                <p className="bold">{tempConvert(data?.main?.feels_like)}°F</p>
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                <p className="bold">{data?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className="bold">{data?.wind?.speed} MPH</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
