// Bring in elements from html file
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

// Array of possible days and months to display
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Openweathermap api key
const API_KEY = 'd2baadc7f230fbdc0f72db4d932eb525';

// Variables for displaying current date and time
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Get current time
    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`;

    // Get current date
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month];

}, 1000);

// Function to get coordinates for weather location
getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude} = success.coords;

        // Fetch API
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data);
        showWeatherData(data);
        })


    })
}

function showWeatherData(data) {
    let {temp, humidity, wind_speed, uv_index} = data.current;

    currentWeatherItemsEl.innerHTML =
     `<div class="weather-item">
        <div>Temperature</div>
        <div>${temp}#176; F</div>
    </div>

    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>

    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}MPH</div>
    </div>

    <div class="weather-item">
        <div>UV Index</div>
        <div>${uv_index}</div>
    </div>`
}