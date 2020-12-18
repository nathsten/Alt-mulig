/**
 * @param {string} id
 */
const $ = (id) => document.getElementById(id);

const inputSearchCity = $("inputSearchCity");
const searchBtn = $("searchIcon");
const useGeolocation = $("useGeolocation");
const weatherDiv = $("weatherDiv");

const key = "";

const getWeatherByCoords = async () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( async (p) => {
            const lat = await p.coords.latitude;;
            const lon = await p.coords.longitude;

            const getWeatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
            const WeatherData = await getWeatherData.json();
            const weatherImg = WeatherData.weather[0].icon;
            const mainDescription = WeatherData.weather[0].main;
            const description = WeatherData.weather[0].description;
            const temp = Number(WeatherData.main.temp).toFixed(1);
            const feelsLike = Number(WeatherData.main.feels_like).toFixed(1);
            const maxTemp = Number(WeatherData.main.temp_max).toFixed(1);
            const minTemp = Number(WeatherData.main.temp_min).toFixed(1);
            const wind = Number(WeatherData.wind.speed).toFixed(1);
            console.log(WeatherData);
        })
    }
}

const getWeatherBySearch = async () => {
    const city = inputSearchCity.value;
    inputSearchCity.value = "";

    const getWeatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`);
    const WeatherData = await getWeatherData.json();
    const weatherImg = WeatherData.weather[0].icon;
    const mainDescription = WeatherData.weather[0].main;
    const description = WeatherData.weather[0].description;
    const temp = Number(WeatherData.main.temp).toFixed(1);
    const feelsLike = Number(WeatherData.main.feels_like).toFixed(1);
    const maxTemp = Number(WeatherData.main.temp_max).toFixed(1);
    const minTemp = Number(WeatherData.main.temp_min).toFixed(1);
    const wind = Number(WeatherData.wind.speed).toFixed(1);

    console.log({mainDescription}, {description}, {temp})
}

inputSearchCity.addEventListener("keydown", e => {
    if(e.keyCode === 13){
        getWeatherBySearch();
    }
});
searchBtn.addEventListener("click", getWeatherBySearch);

useGeolocation.addEventListener("click", getWeatherByCoords);

// Bilde link http://openweathermap.org/img/wn/{bildeID}@2x.png
// API for lat og long api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// API for søkt by http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}
