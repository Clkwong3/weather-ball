var APIkey = "bfd9e7606a4c20b7da2609119a710775";

// DOM EL
var userInput = document.getElementById("user-input");
var searchBtn = document.querySelector("#search-button");
var clearBtn = document.querySelector("#clear-button");
var pastSearch = document.getElementById("past-city");

var cityName = document.getElementById("card-title");
var date = document.getElementById("date");
var cityTemp = document.getElementById("current-temp");
var cityWind = document.getElementById("current-wind");
var cityHumidity = document.getElementById("current-humidity");

var predictions = document.querySelector("#future-temps");

// Get City From User
function handleSearchFormSubmit(event) {
  event.preventDefault();

  const currentCity = document.querySelector("#user-input").value;
  localStorage.setItem("userInputData", currentCity);
  currentCity.innerHTML = "";
  predictions.innerHTML = "";

  getCity(currentCity);
  pastSearches();
}
searchBtn.addEventListener("click", handleSearchFormSubmit);

// Display Search History
function pastSearches() {
  const pastCities = localStorage.getItem("userInputData");

  if (pastCities) {
    const cities = JSON.parse(pastCities);

    cities.forEach((userInputData, index) => {
      const cityBtns = document.createElement("button");

      cityBtns.textContent = userInputData.name;
      cityBtns.addEventListener("click", () => handleBtnClick(index));
      pastSearch.appendChild(cityBtns);
    });
  }
}

// History Buttons
function handleBtnClick(index) {
  const cityRetrieval = localStorage.getItem("userInputData");

  if (cityRetrieval) {
    const cities = JSON.parse(cityRetrieval);
    const currentCity = cities[index];

    getCity(currentCity);
  }
}

// Clear History
function wipedClean() {
  localStorage.removeItem("userObjectsData");

  const dataContainer = document.getElementById("dataContainer");
  dataContainer.innerHTML = "";
}
clearBtn.addEventListener("click", wipedClean);

// Fetch Weather Of City From API
function getCity(currentCity) {
  // URL To Ask For The Forecast For The City In Imperial
  var userCityUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=` +
    currentCity +
    `&appid=` +
    APIkey +
    `&units=imperial`; // switch to metric for Celsius

  fetch(userCityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      showCurrentWeather(data);
      showPrediction(data);
    });
  return;
}

// Show Current Data From API
function showCurrentWeather(data) {
  // console.log(data);
  cityName.textContent = data.city.name;
  date.textContent = data.list[0].dt_txt.substring(0, 10);
  cityTemp.textContent = data.list[0].main.temp;
  cityWind.textContent = data.list[0].wind.speed;
  cityHumidity.textContent = data.list[0].main.humidity;
}

// Show Data For The Next 5 Days
function showPrediction(data) {
  for (var i = 0; i <= data.list.length - 1; i = i + 8) {
    // console.log(i);
    // console.log(data.list[i]);
    // console.log(data.list[i].dt_text);

    var html = `<section id="day1" class="card">
    <p class="date">${data.list[i].dt_txt.substring(0, 10)}</p>
    <p class="text-top">Temp: ${
      data.list[i].main.temp
    } <span id="city-temp"></span> °F</p>
    <p class="text-top">Wind: ${
      data.list[i].wind.speed
    } <span id="city-wind"></span>  MPH</p>
    <p class="text-top">Humidity: ${
      data.list[i].main.humidity
    } <span id="city-humidity"></span> %</p>
    </section>`;

    predictions.insertAdjacentHTML("beforeend", html);
  }
}
