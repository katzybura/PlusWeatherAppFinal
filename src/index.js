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

function displayForecast(){
  let forecast= document.querySelector("#forecast");
  let days = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thurs"];
 let forecastHTML= `<div class="row">`; 
 days.forEach(function(day){
  forecastHTML= forecastHTML + `<div class="col-2">
  <div class="forecast-day">${day}</div>
  <img src="http://openweathermap.org/img/wn/10d@2x.png" width="60px" class="forecast-emoji">
  <div class="forecast-temps">
    <span class="max-temp">35°</span> 
    <span class="min-temp">28°</span>
  </div>
</div>`;});
forecastHTML= forecastHTML + `</div>`;
forecast.innerHTML= forecastHTML;}

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

function switchToCelcius(response){
  console.log(response);
  let mainTemp=document.querySelector(".mainTemp");
  let celciusTemperature=Math.round(response.data.list[0].main.temp);
  mainTemp.innerHTML=`${celciusTemperature}`;
}
function fetchTemp(event){event.preventDefault(); 
  let searchBar = document.querySelector(".searchBar");
let apiKey = "d5051b82a85f7e540a240206a4a2fed4";
let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${searchBar.value}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(switchToCelcius);}

let cel=document.querySelector(".cel");
cel.addEventListener("click", fetchTemp);

function switchToFahren(response){
  console.log(response);
  let mainTemp=document.querySelector(".mainTemp");
  let farTemperature=Math.round(response.data.list[0].main.temp);
  mainTemp.innerHTML=`${farTemperature}`;
}
function fetchTempFar(event){event.preventDefault(); 
  let searchBar = document.querySelector(".searchBar");
let apiKey = "d5051b82a85f7e540a240206a4a2fed4";
let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${searchBar.value}&units=imperial`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(switchToFahren);}

let faren =document.querySelector(".faren");
faren.addEventListener("click", fetchTempFar);

displayForecast();