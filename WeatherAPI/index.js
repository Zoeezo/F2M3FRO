const weatherButton = document.getElementById('weather-button');
const weatherText = document.getElementById('weather-text');

weatherButton.addEventListener('click', () => {
    let city = 'Amsterdam';
    let APIkey = '986a86a85bc94246ec45b8709b69da1f';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`)
        .then(response => response.json())
        .then(data => formatData(data));
});

function formatData(data) {
    let text = `It's ${data.main.temp - 273.15}°C in ${data.name}, it feels like  ${data.main.feels_like - 273.15}°C and there are ${data.weather[0].description}.`

    weatherText.innerText = text;
}