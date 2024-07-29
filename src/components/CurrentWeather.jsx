import React from "react";
import {
  BellSimpleRinging,
  BookOpenText,
  Clock,
  Drop,
  Thermometer,
  Tree,
  Warning,
  Wind,
} from "@phosphor-icons/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarkerIcon from "../assets/CustomMarkerIcon";
import "../styles/currentWeather.css";

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
  } else if (format === "time") {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else {
    throw new Error('Invalid format specified. Use "full" or "time".');
  }
}

function formatUVI(uvi) {
  if (uvi >= 0 && uvi < 3) {
    return (
      <div className="general-container--current">
        <Tree size={32} color="#099268" />
        <p>You can safely enjoy being outside</p>
      </div>
    );
  } else if (uvi >= 3 && uvi < 8) {
    return (
      <div className="general-container--current">
        <BellSimpleRinging size={32} color="#fcc419" />
        <p>Seek shade midday. Use Sunscreen</p>
      </div>
    );
  } else {
    return (
      <div className="general-container--current">
        <Warning size={32} color="#e03131" />
        <p>Avoid midday sun!! Wear protection</p>
      </div>
    );
  }
}

const CurrentWeatherComponent = ({ weather, location }) => {
  const currentWeather = weather?.current;
  const feelsLike = (currentWeather?.feels_like - 273.15).toFixed(1);
  const actualTemp = (currentWeather?.temp - 273.15).toFixed(1);
  const uviIndex = currentWeather.uvi;
  const sunsetTime = formatLocalTime(currentWeather?.sunset, "time");
  const sunriseTime = formatLocalTime(currentWeather?.sunrise, "time");
  const humidity = currentWeather?.humidity;
  const windSpeed = currentWeather?.wind_speed;
  const description = currentWeather?.weather[0]?.description;

  const latitude = location?.latitude || 51.505;
  const longitude = location?.longitude || -0.09;

  return (
    <div className="overall-container--current">
      <h1>Current Weather Information</h1>
      <div className="content-container--current">
        <div className="info-container--current">
          <div className="general-container--current">
            <Thermometer size={32} color="#05388a" />
            <p>Feels like temperature: {feelsLike}°C</p>
          </div>
          <div className="general-container--current">
            <Thermometer size={32} color="#05388a" />
            <p>Actual Temperature: {actualTemp}°C</p>
          </div>
          <div>{formatUVI(uviIndex)}</div>
          <div className="general-container--current">
            <Clock size={32} />
            <p>Sunset time: {sunsetTime}</p>
          </div>
          <div className="general-container--current">
            <Clock size={32} />
            <p>Sunrise time: {sunriseTime}</p>
          </div>
          <div className="general-container--current">
            <Drop size={32} color="#05388a" />
            <p>Humidity: {humidity}%</p>
          </div>
          <div className="general-container--current">
            <Wind size={32} />
            <p>Wind Speed: {windSpeed} m/s</p>
          </div>
          <div className="general-container--current">
            <BookOpenText size={32} />
            <p>Description: {description}</p>
          </div>
        </div>
        <div className="map-container">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={false}
            className="leaflet-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={CustomMarkerIcon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;
