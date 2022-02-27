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

function formatDay(timestamp){
  let date= new Date(timestamp*1000);
  let day= date.getDay();
  let days= ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  return days[day];
}

function displayForecast(response){
 let futureForecast = response.data.daily;
  let forecast= document.querySelector("#forecast");

 let forecastHTML= `<div class="row">`; 
 futureForecast.forEach(function(forecastDay, index){
   if (index<6){
  forecastHTML= forecastHTML + `<div class="col-2">
  <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="60px" class="forecast-emoji">
  <div class="forecast-temps">
    <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span> 
    <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
  </div>
</div>`;}});
forecastHTML= forecastHTML + `</div>`;
forecast.innerHTML= forecastHTML;}

function getForecast(coordinates){
  let apiKey= "d5051b82a85f7e540a240206a4a2fed4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrent(response) {
  console.log(response);
  let temperature = Math.round(response.data.list[0].main.temp);
  let mainTemp = document.querySelector(".mainTemp");
  let city = response.data.list[0].name;
    let h1 = document.querySelector("h1");
    let weatherConditions = response.data.list[0].weather[0].main;
    let conditions = document.querySelector("#conditions");
    let windSpeed= Math.round(response.data.list[0].wind.speed);
    let wind= document.querySelector(".wind");
    let humidity=Math.round(response.data.list[0].main.humidity);
    let humid= document.querySelector(".humid");
    let currentEmoji= document.querySelector(".currentEmoji");
    let iconCode= response.data.list[0].weather[0].icon;

    mainTemp.innerHTML = `${temperature}`;
  h1.innerHTML = `${city}`;
  conditions.innerHTML = `${weatherConditions}`;
  wind.innerHTML= `${windSpeed}`;
  humid.innerHTML=`${humidity}`;
currentEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`);

getForecast(response.data.list[0].coord);
}

function replaceCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector(".searchBar");
  let apiKey = "d5051b82a85f7e540a240206a4a2fed4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${searchBar.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurrent);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", replaceCity);