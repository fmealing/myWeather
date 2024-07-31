import React from "react";
import {
  BellSimpleRinging,
  Drop,
  Sunglasses,
  Thermometer,
  Tree,
  Warning,
  Wind,
  CloudRain,
  Clock,
  BookOpenText,
} from "@phosphor-icons/react";
import "../styles/fourDayWeatherComponent.css";

function formatLocalTime(utcTime, format) {
  const date = new Date(utcTime * 1000);
  if (format === "full") {
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else if (format === "date") {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  } else if (format === "time") {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else {
    throw new Error('Invalid format specified. Use "full", "date", or "time".');
  }
}

function formatUVI(uvi) {
  if (uvi >= 0 && uvi < 3) {
    return (
      <div className="general-container--four-day">
        <Tree size={32} color="#099268" />
        <p>You can safely enjoy being outside</p>
      </div>
    );
  } else if (uvi >= 3 && uvi < 8) {
    return (
      <div className="general-container--four-day">
        <BellSimpleRinging size={32} color="#fcc419" />
        <p>Seek shade midday. Use sunscreen</p>
      </div>
    );
  } else {
    return (
      <div className="general-container--four-day">
        <Warning size={32} color="#e03131" />
        <p>Avoid midday sun!! Wear protection</p>
      </div>
    );
  }
}

const FourDayWeatherComponent = ({ weather }) => {
  const dailyWeather = weather.daily.slice(0, 4);

  return (
    <div className="overall-container--four-day">
      {dailyWeather.map((day, index) => (
        <div key={index} className="day-container">
          <h2 className="heading--four-day">
            {formatLocalTime(day.dt, "date")}
          </h2>
          <div className="description-container">
            <BookOpenText size={32} />
            <p className="paragraph--four-day">{day.summary}</p>
          </div>
          <div className="temp-container">
            <Thermometer size={32} />
            <p>Day: {Math.round(day.temp.day - 273.15)}°C</p>
            <p>Night: {Math.round(day.temp.night - 273.15)}°C</p>
            <p>Min: {Math.round(day.temp.min - 273.15)}°C</p>
            <p>Max: {Math.round(day.temp.max - 273.15)}°C</p>
          </div>
          <div className="wind-container">
            <Wind size={32} />
            <p>Speed: {day.wind_speed} m/s</p>
            <p>Direction: {day.wind_deg}°</p>
            <p>Gust: {day.wind_gust} m/s</p>
          </div>
          <div className="humidity-container">
            <Drop size={32} />
            <p>Humidity: {day.humidity}%</p>
          </div>
          <div className="precipitation-container">
            <CloudRain size={32} />
            <p>Precipitation: {day.pop * 100}%</p>
            {day.rain && <p>Rain: {day.rain} mm</p>}
          </div>
          <div className="uvi-container">{formatUVI(day.uvi)}</div>
          <div className="sun-times-container">
            <Clock size={32} />
            <p>Sunrise: {formatLocalTime(day.sunrise, "time")}</p>
            <p>Sunset: {formatLocalTime(day.sunset, "time")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FourDayWeatherComponent;
