function displayCurrentTemperature(response) {

  let temperatureElement.innerHTML = document.querySelector("#temperature");
  temperatureElement.innerHTML = response.data.main.temp;
  console.log(response.data.main.temp);

}
let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayCurrentTemperature);