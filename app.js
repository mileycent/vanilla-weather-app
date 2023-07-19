function displayCurrentTemperature(response) {

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  // to change the city written in html doc to API version 
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML =  response.data.name;
  // to change the desription writen in html doc to API version
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  // to change the win, preciptitation and wind description written in html doc
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

}
let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayCurrentTemperature);