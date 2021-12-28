// get day and time

let currentTime = new Date();
let year = currentTime.getUTCFullYear();
let hours = currentTime.getHours();

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let timeElement = document.querySelector("#time");
timeElement.innerHTML = `Friday ${year}, ${hours}:${minutes} AM`;
