let now = new Date();
let dayTime = document.querySelector("#dayTime");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
dayTime.innerHTML = `${day} ${hour}:${minutes}`;

function displayCurrent(response) {
  console.log(response);
  let temperature = Math.round(response.data.list[0].main.temp);
  let mainTemp = document.querySelector(".mainTemp");
  mainTemp.innerHTML = `${temperature}`;
}

function replaceCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let searchBar = document.querySelector(".searchBar");
  h1.innerHTML = `${searchBar.value}`;
  let apiKey = "d5051b82a85f7e540a240206a4a2fed4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${searchBar.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurrent);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", replaceCity);

function showLocation(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  let apiKey = "d5051b82a85f7e540a240206a4a2fed4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeCurrentTemp);
}
