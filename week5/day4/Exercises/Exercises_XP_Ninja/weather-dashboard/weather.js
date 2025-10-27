require('dotenv').config();
const axios = require('axios');
const {chalk} = require('chalk');
async function getWeather(cityName) {
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
  try {
    const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
    const geoData = geoResponse.data;
    if (geoData.length === 0) {
      console.log(chalk.red('City not found!'));
      return;
    }
    const { lat, lon, name, country } = geoData[0];
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const weatherData = weatherResponse.data;
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    console.log(chalk.blue(`\nWeather for ${name}, ${country}:`));
    console.log(chalk.yellow(`Temperature: ${temp}°C`));
    console.log(chalk.green(`Description: ${description}\n`));
  } catch (error) {
    console.error(chalk.red('Error fetching weather data:'), error.message);
  }
}
module.exports = { getWeather };