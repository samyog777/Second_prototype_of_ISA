const form = document.querySelector('form');
const cityInput = document.querySelector('#city');
const weatherInfo = document.querySelector('#weatherInfo');

const API_KEY = '3df5f7c02170f638ee41d071731842ea';

// Set the cityInput value to "Southend-on-Sea"
cityInput.value = 'Southend-on-Sea';

// Submit the form when the page loads
window.addEventListener('load', () => {
  form.dispatchEvent(new Event('submit'));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (city.length == 0) {
      weatherInfo.innerHTML = 'Oops! It seems you forgot to enter the city name. Please provide the city name to retrieve the weather information.';
    } else if (data.cod === 200) {
      const {name, sys: {country}, dt, weather: [{description}], main: {temp, pressure, humidity}, wind: {speed}, rain} = data;
      const date = new Date(dt * 1000);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      const rainfall = rain ? `${rain['1h']} mm` : 'N/A';
      weatherInfo.innerHTML = `Day and Date: ${formattedDate} <br> Weather in ${name}, ${country}: <br> Condition${description}.<br>Temperature: ${temp}°C<br>Pressure: ${pressure} hPa<br>Wind Speed: ${speed} m/s<br>Humidity: ${humidity}%<br>Rainfall: ${rainfall}`;
    } else {
      weatherInfo.innerHTML = '  Sorry!, City not found Try Again  ';
    }
})
});