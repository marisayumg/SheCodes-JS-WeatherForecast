// Get date and time

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = date.getDay();

  let days = [
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]}, ${hours}:${minutes}`;
}

function formatDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let year = date.getUTCFullYear();
  let month = months[date.getMonth()];
  let calendarDay = date.getDate();

  return `${calendarDay} ${month} ${year}`;
}

document.querySelector("#date").innerHTML = formatDate();

// integrate with OneCall API for 5 day forecast

function getForecast(coordinates) {
  let apiKey = "aceadeb80a4efbf529fde452b5da3c54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// integrate with Open Weather API

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#number").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;

  function changeBackground() {
    if (description.innerHTML === "Clear") {
      document.body.style.background = "#FFD774";
    }
    if (description.innerHTML === "Clouds") {
      document.body.style.background = "#92B3C2";
    }
    if (description.innerHTML === "Rain") {
      document.body.style.background = "#0E86D4";
    }
    if (description.innerHTML === "Mist") {
      document.body.style.background = "#C3D6DB";
    }
    if (description.innerHTML === "Snow") {
      document.body.style.background = "#fff";
    }
    if (description.innerHTML === "Fog") {
      document.body.style.background = "#BBC4C2";
    }
    if (description.innerHTML === "Drizzle") {
      document.body.style.background = "#68BBE3";
    }
    if (description.innerHTML === "Thunderstorm") {
      document.body.style.background = "#9B9896";
    }
    if (description.innerHTML === "Haze") {
      document.body.style.background = "#B9B7BD";
    }
  }

  changeBackground();

  getForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "aceadeb80a4efbf529fde452b5da3c54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

// update city on form submit

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
  cityInput.value = "";
}

// change between Celsius and Fahrenheit

// function showFahrenheit(event) {
//   event.preventDefault();
//   let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let temperatureElement = document.querySelector("#number");
//   temperatureElement.innerHTML = fahrenheitTemperature;
// }

// function showCelsius(event) {
//   event.preventDefault();
//   fahrenheitLink.classList.remove("active");
//   celsiusLink.classList.add("active");
//   let temperatureElement = document.querySelector("#number");
//   temperatureElement.innerHTML = celsiusTemperature;
// }

// let celsiusTemperature = null;

// let fahrenheitLink = document.querySelector("#fahrenheit");
// fahrenheitLink.addEventListener("click", showFahrenheit);

// let celsiusLink = document.querySelector("#celsius");
// celsiusLink.addEventListener("click", showCelsius);

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

// display forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<ul>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <li>
      <div class="day-icon">
        <span class="forecast-date">${formatDay(forecastDay.dt)}</span>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="48"/>
      </div>
      <p class="forecast-temperatures">
        <span class="forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        /
        <span class="forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </p>
    </li>
  `;
    }
  });
  forecastHTML = forecastHTML + "</ul>";
  forecastElement.innerHTML = forecastHTML;
}

// format dt into days e.g. "Thursday"

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Call a city to display as default on page load
search("Tokyo");
