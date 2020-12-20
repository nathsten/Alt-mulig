/**
 * @param {string} id
 * @returns {object}
 */
const $ = (id) => document.getElementById(id);

const ce = (element) => document.createElement(element)

const inputSearchCity = $("inputSearchCity");
const mainDiv = $("mainDiv");
const searchBtn = $("searchIcon");
const useGeolocation = $("useGeolocation");
const weatherDiv = $("weatherDiv");

const loadingScreenDiv = $("loadingScreenDiv");

const getWeatherByCoords = async () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( async (p) => {
            const lat = await p.coords.latitude;;
            const lon = await p.coords.longitude;
            const getWeatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
            const WeatherData = await getWeatherData.json();

            displayCurrentWeather(WeatherData);
            console.log(WeatherData);
        })
    }
}

const getWeatherBySearch = async () => {
    const city = inputSearchCity.value;
    if(city !== ""){
        const getWeatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`);
        const WeatherData = await getWeatherData.json();
        displayCurrentWeather(WeatherData);
        console.log(WeatherData);
        inputSearchCity.value = "";
    }
    else{
        alert("Please fill inn city name!");
    }
}

const displayCurrentWeather = (WeatherData) => {
    weatherDiv.innerHTML = "";
    weatherDiv.innerHTML += '<div id="weatherDivHeader"></div>';
    weatherDiv.innerHTML += '<div id="weatherDivDescription"></div>';
    const city = WeatherData.name;
    const weatherImg = WeatherData.weather[0].icon;
    const mainDescription = WeatherData.weather[0].main;
    const description = WeatherData.weather[0].description;
    const temp = Number(WeatherData.main.temp).toFixed(1);
    const feelsLike = Number(WeatherData.main.feels_like).toFixed(1);
    const maxTemp = Number(WeatherData.main.temp_max).toFixed(1);
    const minTemp = Number(WeatherData.main.temp_min).toFixed(1);
    const wind = Number(WeatherData.wind.speed).toFixed(1);

    const mainDescriptionDiv = ce("div");
    mainDescriptionDiv.id = "weatherDescription";   
    mainDescriptionDiv.className = "weatherDataHeader"
    mainDescriptionDiv.innerHTML = `${mainDescription} in ${city}`;
    $("weatherDivHeader").append(mainDescriptionDiv);

    const weatherImgDiv = ce("div");
    weatherImgDiv.id = "weatherImg";
    weatherImgDiv.className = "weatherDataHeader"
    weatherImgDiv.style.backgroundImage = `url(http://openweathermap.org/img/wn/${weatherImg}@2x.png)`;
    $("weatherDivHeader").append(weatherImgDiv);

    const descriptionDiv = ce("div");
    descriptionDiv.id = "description";
    descriptionDiv.className = "weatherData"
    descriptionDiv.innerHTML = `Description:  ${description}`;
    $("weatherDivDescription").append(descriptionDiv);

    const tempDiv = ce("div");
    tempDiv.id = "temp";
    tempDiv.className = "weatherData";
    tempDiv.innerHTML = `Temperature: ${temp}°C`;
    $("weatherDivDescription").append(tempDiv);

    const feelsLikeDiv = ce("div");
    feelsLikeDiv.id = "feelsLike";
    feelsLikeDiv.className = "weatherData";
    feelsLikeDiv.innerHTML = `Feels like: ${feelsLike}°C`;
    $("weatherDivDescription").append(feelsLikeDiv);

    const maxTempDiv = ce("div");
    maxTempDiv.id = "maxTemp";
    maxTempDiv.className = "weatherData";
    maxTempDiv.innerHTML = `Highest temperature: ${maxTemp}°C`;
    $("weatherDivDescription").append(maxTempDiv);

    const minTempDiv = ce("div");
    minTempDiv.id = "minTemp";
    minTempDiv.className = "weatherData";
    minTempDiv.innerHTML = `Lowest temperature: ${minTemp}°C`;
    $("weatherDivDescription").append(minTempDiv);

    const windDiv = ce("div");
    windDiv.id = "wind";
    windDiv.className = "weatherData";
    windDiv.innerHTML = `Wind: ${wind}m/s`;
    $("weatherDivDescription").append(windDiv);
}

let scanElement;
const loadingScreen = () => {
    if($("description")){
        loadingScreenDiv.style.display = "none";
        clearInterval(scanElement);
    }

}

inputSearchCity.addEventListener("keydown", e => {
    if(e.keyCode === 13){
        loadingScreenDiv.style.display = "block";
        scanElement = setInterval(() => {
            loadingScreen();
        }, 10);
        getWeatherBySearch();
    }
});
searchBtn.addEventListener("click", () => {
    loadingScreenDiv.style.display = "block";
    scanElement = setInterval(() => {
        loadingScreen();
    }, 10);
    getWeatherBySearch();
});


useGeolocation.addEventListener("click", () => {
    loadingScreenDiv.style.display = "block";
    scanElement = setInterval(() => {
        loadingScreen();
    }, 10);
    getWeatherByCoords();
});

// Bilde link http://openweathermap.org/img/wn/{bildeID}@2x.png
// API for lat og long api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// API for søk by http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}
