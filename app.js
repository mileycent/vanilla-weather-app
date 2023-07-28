function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  
if (hours < 10) {
  hours = `0${hours}`;
}
  let minutes = date.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
}
  let days = ["Sunday","Monday", "Tuesday","Wednesday", "Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  return `${day} | ${hours}:${minutes}`;
}

function displayForcast(response) {
  console.log(response.data);
  let forcastElement = document.querySelector("#forcast");

  let forcastHTML = `<div class="row>`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {

    forcastHTML = forcastHTML + `
  <div class="col-2">
     <div class="weather-forcast-day">${day}</div>
      <img src="icons8-rain-48.png" alt="clear" width="46"/>
     <div class="weather-forcast-temperature">
      <span class="weather-forcast-temperature-max">18°</span>
      <span class="weather-forcast-temperature-min">12°</span>
  </div>
</div>`;
  });


  



  forcastElement.innerHTML = forcastHTML;

}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}


function displayCurrentTemperature(response) {


  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsuisTemperature);

  celsuisTemperature = response.data.main.temp;


  // to change the city written in html doc to API version 
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML =  response.data.name;
  // to change the desription writen in html doc to API version
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  // to change the wind, preciptitation and wind description written in html doc
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  // to change the date
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  // to change the icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  // to change the alternative icon text
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForcast(response.data.coord);

}
function search(city) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input"); 
  search(cityInputElement.value);   
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsuisTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsuisTemperature(event) {
  event.preventDefault();
  celsuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsuisTemperature);
}
 
let celsuisTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsuisLink = document.querySelector("#celsuis-link");
celsuisLink.addEventListener("click", displayCelsuisTemperature);



search("New York");