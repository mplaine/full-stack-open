import axios from 'axios'

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'
const units = 'metric'
const lang = 'en'
const mode = 'json'

const getWeather = (api_key, latitude, longitude) => {
  return axios
    .get(`${baseUrl}?units=${units}&lang=${lang}&mode=${mode}&lat=${latitude}&lon=${longitude}&APPID=${api_key}`)
    .then(response => response.data)
}

export default { getWeather }
