// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import cloudy_icon from './assets/cloudy.png';
import drizzle_icon from './assets/drizzle.png';
import rain_icon from './assets/rain.png';
import snow_icon from './assets/snow.png';
import clear_icon from './assets/clear.png';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherIcons = {                              // måtte hjelpe her og feilsøke konsoll for endepunkter og skrive inn riktig ID for iconene. Det skjønte den ikke.
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": drizzle_icon,
    "50n": drizzle_icon,
};

const App = () => {
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async (location) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: location,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
            alert("Could not find the location.");
        }
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<SearchPage onSearch={fetchWeather} />} />
                    <Route path="/weather" element={<WeatherPage weatherData={weatherData} />} />
                </Routes>
            </div>
        </Router>
    );
};

const SearchPage = ({ onSearch }) => {
    const navigate = useNavigate();

    const handleSearch = (location) => {
        onSearch(location);
        navigate('/weather');
    };

    return <SearchBar onSearch={handleSearch} />;
};

const WeatherPage = ({ weatherData }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <>
            <button onClick={handleBack} className="back-button">← Back</button>
            <WeatherDisplay weatherData={weatherData} icons={weatherIcons} />
        </>
    );
};

export default App;
