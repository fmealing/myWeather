import React, { useState, useEffect } from "react";
import {
  getWeatherByCoordinates,
  getWeatherByCity,
} from "../services/weatherService";
import CurrentWeather from "./CurrentWeather";
import { PulseLoader } from "react-spinners";

const Weather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchWeatherByCoordinates(latitude, longitude);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    const fetchWeatherByCoordinates = async (latitude, longitude) => {
      try {
        setLoading(true);
        const weatherData = await getWeatherByCoordinates(latitude, longitude);
        setWeather(weatherData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  console.log(weather);

  return (
    <div>
      {loading && <PulseLoader color="#007bff" size={150} />}
      {error && <p>Error: {error}</p>}
      {weather && <CurrentWeather weather={weather} location={location} />}
    </div>
  );
};

export default Weather;
