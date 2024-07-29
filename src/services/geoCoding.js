import axios from "axios";

const API_KEY = "5f7754ab8209c3a91af8eb9aaa3a525b";

const geoCoding = async (cityName) => {
  const limit = 1;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`;
  const response = await axios.get(url);
  console.log(response);

  return response;
};

export default geoCoding;
