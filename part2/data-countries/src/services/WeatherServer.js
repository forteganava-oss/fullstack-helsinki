import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast?'


const getWeather = (lat,lon) => {
    return axios
        .get(`${baseUrl}latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m`)
        .then(response => response.data.current)
    
} 

export default {getWeather}