import axios from "axios";

const GetRequest = {
  getLocation(location) {
    const url = `https://openweathermap.org/data/2.5/weather?q=${location}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`
    const response = axios.get(url)
    return response
  },

  getData(lat, lon) {
    const url = `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`
    const response = axios.get(url)
    return response
  },
}

export default GetRequest