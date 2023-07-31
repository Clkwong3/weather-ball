var APIkey = "bfd9e7606a4c20b7da2609119a710775";

// DOM EL
var userInput = document.getElementById("user-input");
var searchBtn = document.querySelector("#search-button");
var clearBtn = document.querySelector("#clear-button");
var pastSearch = document.getElementById("past-city");

var cityName = document.getElementById("city-name");
var date = document.getElementById("date");
var cityTemp = document.getElementById("current-temp");
var cityWind = document.getElementById("current-wind");
var cityHumidity = document.getElementById("current-humidity");

var section = document.getElementById("5Days");
var fiveDates = document.getElementById("future-dates");
var fiveTemp = document.getElementById("future-temp");
var fiveWind = document.getElementById("future-wind");
var fiveHumidity = document.getElementById("future-humidity");

var predictions = document.querySelector("#future-temps");

// Get City From User
function handleSearchFormSubmit(event) {
  event.preventDefault();

  const currentCity = document.querySelector("#user-input").value;
  localStorage.setItem("userInputData", JSON.stringify({ name: currentCity }));
  predictions.innerHTML = "";

  getCity(currentCity);
  pastSearches();
}
searchBtn.addEventListener("click", handleSearchFormSubmit);

// Display Search History
function pastSearches() {
  const pastCities = localStorage.getItem("userInputData");
  pastSearch.innerHTML = "";

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
    const currentCity = cities[index].name;

    getCity(currentCity);
  }
}

// Clear History
function handleHistoryClearSubmit(event) {
  event.preventDefault();

  localStorage.removeItem("userObjectsData");

  pastSearches();
}
clearBtn.addEventListener("click", handleHistoryClearSubmit);

// Fetch Weather Of City From API
function getCity(currentCity) {
  // URL To Ask For The Forecast For The City In Imperial
  var userCityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${APIkey}&units=imperial`; // switch to metric for Celsius

  fetch(userCityUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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

    // var html = `<section id="5Days" class="card col-3 m-1 d-inline-block bg-info">
    // <p class="date p-2">${data.list[i].dt_txt.substring(0, 10)}</p>
    // <p class="text-top">Temp: ${data.list[i].main.temp}°F</p>
    // <p class="text-top">Wind: ${data.list[i].wind.speed}MPH</p>
    // <p class="text-top">Humidity: ${data.list[i].main.humidity}%</p>
    // </section>`;

    // predictions.insertAdjacentHTML("beforeend", html);

    fiveDates.textContent = data.dt_txt.substring(0, 10);
    section.appendChild(fiveDates);

    fiveTemp.textContent = `Temp: ${data.main.temp}°F`;
    section.appendChild(fiveTemp);

    fiveWind.textContent = `Wind: ${data.wind.speed}MPH`;
    section.appendChild(fiveWind);

    fiveHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    section.appendChild(fiveHumidity);

    predictions.appendChild(section);
  }
}
