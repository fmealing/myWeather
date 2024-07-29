import axios from "axios";

const API_KEY = "5f7754ab8209c3a91af8eb9aaa3a525b";

const handleErrors = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        return "City not found";
      case 401:
        return "Invalid API key";
      default:
        return "An error occurred";
    }
  } else if (error.request) {
    return "Network error";
  } else {
    return "An error occurred";
  }
};

export const getWeatherByCoordinates = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(handleErrors(error));
  }
};

export const getCoordinatesByCity = async (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data.length === 0) {
      throw new Error("City not found");
    }
    const { lat, lon } = response.data[0];
    return { lat, lon };
  } catch (error) {
    throw new Error(handleErrors(error));
  }
};

export const getWeatherByCity = async (city) => {
  try {
    const { lat, lon } = await getCoordinatesByCity(city);
    return await getWeatherByCoordinates(lat, lon);
  } catch (error) {
    throw new Error(handleErrors(error));
  }
};
