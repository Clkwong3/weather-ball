var APIkey = "bfd9e7606a4c20b7da2609119a710775";

// DOM EL
var userInput = document.getElementById("user-input");
var searchBtn = document.querySelector("#search-button");
var clearBtn = document.getElementById("clear-button");
var pastSearch = document.getElementById("past-city");

var cityTemp = document.getElementById("current-temp");
var cityWind = document.getElementById("current-wind");
var cityHumidity = document.getElementById("current-humidity");
var cityName = document.getElementById("card-title");

var predictions = document.querySelector("#future-temps");

function getDate() {
  // Get the Current Date
  var date = new Date();
  var currentDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  document.getElementById("date").innerHTML = currentDate;

  // Get Prediction Dates
}
getDate();

// May need 2 different API url because of the lat and lon
// functions needs EventListener
// Navigation
// User input -> array -> json.stringify

// Get City From User
function handleSearchFormSubmit(event) {
  event.preventDefault();

  const currentCity = document.querySelector("#user-input").value;
  console.log(currentCity);
  // getCity(currentCity);
  getCity(currentCity);
}
searchBtn.addEventListener("click", handleSearchFormSubmit);

function getCity(currentCity) {
  console.log(currentCity);
  // GeoURL To Ask For The Weather For The City
  var userCityUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=` +
    currentCity +
    `&appid=` +
    APIkey +
    `&units=imperial`;
  var cityStorage = JSON.parse(localStorage.getItem("city"));

  fetch(userCityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // weatherInfo(data);
      console.log(data);
      renderCurrentWeather(data);
      renderPrediction(data);
    });
  return;
}

function renderCurrentWeather(data) {
  cityName.textContent = data.city.name;
  cityTemp.textContent = data.list[0].main.temp;
  cityWind.textContent = data.list[0].wind.speed;
  cityHumidity.textContent = data.list[0].main.humidity;
}

function renderPrediction(data) {
  for (var i = 0; i <= data.list.length - 1; i = i + 8) {
    console.log(i);
    console.log(data.list[i]);
    var html = `          <section id="day1" class="card">
    <p id="firstDay">Date</p>
    <p class="text-top">Temp: ${data.list[i].main.temp} <span id="city-temp"></span> °F</p>
    <p class="text-top">Wind: <span id="city-wind"></span> 12 MPH</p>
    <p class="text-top">Humidity: <span id="city-humidity"></span>5 %
    </p>
  </section>`;
    predictions.insertAdjacentHTML("beforeend", html);
  }
}
