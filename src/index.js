// get date and time

let currentTime = new Date();
let year = currentTime.getUTCFullYear();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let timeElement = document.querySelector("#time");
timeElement.innerHTML = `${hours}:${minutes} AM`;

let dateElement = document.querySelector("#date");
dateElement.innerHTML = `Friday, 27 Dec 2021`;

// integrate with Open Weather API

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let city = "Lisbon";
let units = "metric";

let apiKey = "aceadeb80a4efbf529fde452b5da3c54";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showWeather);
