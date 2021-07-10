const questionContainer = document.getElementById('question-container'),  
      weatherDataContainer = document.getElementById('weather-data-container'),  
      loader = document.getElementById('loader'),  
      currentCityBtn = document.getElementById('current-location-btn'),
      anotherCityBtn = document.getElementById('another-city-btn'),
      cityName = document.getElementById('city-name'),  
      temperature = document.getElementById('current-temperature'),
      humidity = document.getElementById('current-humidity'),
      windSpeed = document.getElementById('current-wind-speed'),
      pressure = document.getElementById('current-pressure'),
      cityInput = document.getElementById('city-input'),
      searchBtn = document.getElementById('search-btn'),
      coordsBtn = document.getElementById('coords-btn'),
      form = document.querySelector('form'),
      list = document.querySelector('ul'),
      apiKey = 'e78ccf6f31ad51ffa9f2549f7ec140cb';

currentCityBtn.addEventListener('click', toggleModal)
anotherCityBtn.addEventListener('click', toggleModal)
coordsBtn.addEventListener('click', getCoordinates);
form.addEventListener('submit', handleCitySearch);

function toggleModal(e) {
  if (e.target.getAttribute('id') === 'current-location-btn') {
    getCoordinates()
  } else if (e.target.getAttribute('id') === 'another-city-btn') {
    list.classList.add('invisible')
    weatherDataContainer.classList.toggle('invisible')
  }
   
  questionContainer.classList.toggle('invisible')
}

function displayLoader() {
  loader.classList.remove('invisible')
 
  setTimeout(function () {
    loader.classList.add('invisible')
    list.classList.remove('invisible')
  }, 1000)
}

function displayWeatherData(data) {
  cityName.innerHTML = data.name;
  temperature.innerHTML = `${Math.round(data.main.temp)}ºC`;
  humidity.innerHTML = `${Math.round(data.main.humidity)}%`;
  windSpeed.innerHTML = `${Math.round(data.wind.speed)}m/s`;
  pressure.innerHTML = `${Math.round(data.main.pressure)}hPa`;

  weatherDataContainer.classList.remove('invisible')
}

function getWeatherData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => displayWeatherData(data))
    .catch(err => console.log(err))
  
  list.classList.add('invisible')
    
  displayLoader()
}

function getWeatherByCoords(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  getWeatherData(apiUrl)
}

function getWeatherByCity(city) {
  cityInput.value = '';
  cityName.innerHTML = "";
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  getWeatherData(apiUrl)
}

function getCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => getWeatherByCoords(position.coords.latitude, position.coords.longitude))
  } else {
    return alert('Could not find you current location')
  }
}

function handleCitySearch(e) {
  e.preventDefault();

  if (cityInput.value) {
    getWeatherByCity(cityInput.value)
  } else {
    alert('Please, enter city name')
  }
}