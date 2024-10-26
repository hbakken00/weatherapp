// src/components/WeatherDisplay.jsx
import React from 'react';
import humidityIcon from '../assets/humidity.png'; // import humidity icon
import windIcon from '../assets/wind.png'; // import wind icon

const WeatherDisplay = ({ weatherData, icons }) => {
    if (!weatherData) return null;

    const { name, main, weather, wind } = weatherData;
    const iconSrc = icons[weather[0].icon] || icons['default'];

    return (
        <div className="weather-display">
            <div className="location">{name}</div>
            <div className="temperature">{Math.round(main.temp)}°C</div>
            <img src={iconSrc} alt={weather[0].description} className="weather-icon" />
            <div className="details">
                <div className="humidity">
                    <img src={humidityIcon} alt="humidity icon" className="detail-icon" />
                    {main.humidity}% Humidity
                </div>
                <div className="wind">
                    <img src={windIcon} alt="wind icon" className="detail-icon" />
                    {wind.speed} m/s Wind
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
