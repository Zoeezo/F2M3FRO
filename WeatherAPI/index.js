// Units script
const kelvinButton = document.getElementById('kelvin-button');
const celsiusButton = document.getElementById('celsius-button');
const fahrenheitButton = document.getElementById('fahrenheit-button');

const btn = '986a86a85bc94246ec45b8709b69da1f';

let unit = 'kelvin';
let fetched = false;

kelvinButton.addEventListener('click', () => {
    kelvinButton.classList.add('units-button-selected');
    celsiusButton.classList.remove('units-button-selected');
    fahrenheitButton.classList.remove('units-button-selected');
    updateUnit('kelvin');
});

celsiusButton.addEventListener('click', () => {
    kelvinButton.classList.remove('units-button-selected');
    celsiusButton.classList.add('units-button-selected');
    fahrenheitButton.classList.remove('units-button-selected');
    updateUnit('celsius');
});

fahrenheitButton.addEventListener('click', () => {
    kelvinButton.classList.remove('units-button-selected');
    celsiusButton.classList.remove('units-button-selected');
    fahrenheitButton.classList.add('units-button-selected');
    updateUnit('fahrenheit');
});

function updateUnit(newUnit) {
    unit = newUnit;

    if(fetched) {
        updateTodayTemp();
        updateForecastTemps();
    }
}

// Fetch script
const settingsCityButton = document.getElementById('settings-city-button');
const settingsCityText = document.getElementById('settings-city-text');

const settingsZipButton = document.getElementById('settings-zip-button');
const settingsZipText = document.getElementById('settings-zip-text');

let url;

settingsCityButton.addEventListener('click', () => {
    let city = settingsCityText.value;

    settingsCityText.value = '';
    if(city === '') {
        return;
    }

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${btn}`)
    .then(async response => {
        if(!response.ok) {
            settingsCityText.placeholder = 'ERROR';
        } else {
            data = await response.json();

            fetched = true;

            updateLocationPanel(data);
            updateTodayPanel(data);
        }
    })

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${btn}`)
    .then(async response => {
        if(!response.ok) {
            settingsCityText.placeholder = 'ERROR';
        } else {
            data = await response.json();

            let forecasts = filterForecast(data);
            updateForecastPanel(forecasts);
        }
    });
});


// Location panel script
const locationCountryText = document.getElementById('location-country-text');
const locationCityText = document.getElementById('location-city-text');
const locationCoordinaresText = document.getElementById('location-coordinates-text');

function updateLocationPanel(data) {
    locationCountryText.innerText = getCountryName(data.sys.country);
    locationCityText.innerText = `${data.name}`;
    locationCoordinaresText.innerText = `${data.coord.lat}, ${data.coord.lon}`;
}


// Today panel script
const todayWeather = document.getElementById('today-weather');
const todayWeatherText = document.getElementById('today-weather-text');

const todayTemp = document.getElementById('today-temp');
const todayTempText = document.getElementById('today-temp-text');

const todayWind = document.getElementById('today-wind');
const todayWindText = document.getElementById('today-wind-text');

let todayTempValue;

function updateTodayPanel(data) {
    todayWeather.innerText = `${data.weather[0].main}`;
    todayWeatherText.innerText = `${data.weather[0].description}`;

    todayTempValue = data.main.temp;

    if(todayTempValue > 291.15) {
        todayTemp.innerText = 'warm';
    } else {
        todayTemp.innerText = 'cold';
    }

    todayTempText.innerText = setTemp(todayTempValue);

    let speed = data.wind.speed;

    if(speed < 1.34112) {
        todayWind.innerText = 'Calm';
        todayWindText.innerText = 'Almost no wind today.';
    } else if(speed < 8.04672) {
        todayWind.innerText = 'Breezy';
        todayWindText.innerText = 'A little bit of wind today.';
    } else if(speed < 13.8582) {
        todayWind.innerText = 'Strong';
        todayWindText.innerText = 'Watch out with the wind today';
    } else {
        todayWind.innerText = 'Very strong';
        todayWindText.innerText = 'Recommended to stay at home.';
    }
}

function updateTodayTemp() {
    todayTempText.innerText = setTemp(todayTempValue);
}

// forecast script
let temps = [];

function filterForecast(data) {
    let filteredItems = [];

    data.list.forEach(item => {
        if(item.dt_txt.includes('12:00:00')) {
            filteredItems.push(item);
        }
    });

    return filteredItems;
}

function updateForecastPanel(forecasts) {
    for(let x = 0; x < 4; x++) {
        let forecast = forecasts[x];

        let date = forecast.dt_txt.split(' ')[0];
        document.getElementById(`day-${x + 1}-title`).innerText = date;

        document.getElementById(`day-${x + 1}-weather`).innerText = forecast.weather[0].description;

        let temp = forecast.main.temp;
        temps.push(temp);
        document.getElementById(`day-${x + 1}-temp`).innerText = setTemp(temp);
    }
}

function updateForecastTemps() {
    for(let x = 0; x < 4; x++) {
        document.getElementById(`day-${x + 1}-temp`).innerText = setTemp(temps[x]);
    }
}


// Helper functions
function setTemp(temp) {
    if(unit == 'kelvin') {
        return `${temp}K`;
    } else if(unit == 'celsius'){
        return `${parseInt(temp - 273.15)}°C`;
    } else {
        return `${parseInt((temp - 273.15) * 9 / 5 + 32)}°F`
    }
}