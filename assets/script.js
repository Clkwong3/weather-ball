var APIkey = "bfd9e7606a4c20b7da2609119a710775";

// DOM EL
var userInput = document.getElementById("user-input");
var searchBtn = document.querySelector("#search-button");
var clearBtn = document.querySelector("#clear-button");
var pastSearch = document.getElementById("past-cities"); // IT WAS YOU!

var cityName = document.getElementById("city-name");
var date = document.getElementById("date");
var cityTemp = document.getElementById("current-temp");
var cityWind = document.getElementById("current-wind");
var cityHumidity = document.getElementById("current-humidity");

var predictions = document.querySelector("#future-temps");

// Get City From User
function handleSearchFormSubmit(event) {
  event.preventDefault();

  const currentCity = userInput.value;

  if (!currentCity) {
    return;
  }

  const userInputData = localStorage.getItem("userInputData");

  if (userInputData) {
    const cities = JSON.parse(userInputData);
    const existingCity = cities.find((city) => city.name === currentCity);
    // Move to pastSearches()
    if (!existingCity) {
      cities.push({ name: currentCity });
      localStorage.setItem("userInputData", JSON.stringify(cities));
    }
  } else {
    localStorage.setItem(
      "userInputData",
      JSON.stringify([{ name: currentCity }])
    );
  }
  userInput.value = "";
  predictions.innerHTML = "";

  pastSearches();
  getCity(currentCity);
}
searchBtn.addEventListener("click", handleSearchFormSubmit);

// Display Search History
function pastSearches() {
  const pastCities = localStorage.getItem("userInputData");
  pastSearch.innerHTML = "";

  if (pastCities) {
    const cities = JSON.parse(pastCities);

    if (Array.isArray(cities)) {
      cities.reverse;

      cities.forEach((userInputData, index) => {
        const cityBtns = document.createElement("button");

        cityBtns.textContent = userInputData.name;
        cityBtns.addEventListener("click", () => handleBtnClick(index));
        pastSearch.appendChild(cityBtns);
      });
    }
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

  localStorage.removeItem("userInputData");
  pastSearches();
}
clearBtn.addEventListener("click", handleHistoryClearSubmit);

// Fetch Weather Of City From API
function getCity(currentCity) {
  var userCityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${APIkey}&units=imperial`;

  fetch(userCityUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showCurrentWeather(data);
      showPrediction(data);
    });
  return;
}

// Show Date As MMM D, YYYY
function formatDateLetters(lettersString) {
  const options = { year: "numeric", month: "short", day: "numeric" };

  return new Date(lettersString).toLocaleDateString(undefined, options);
}

// Show the Current Weather Icon
function showSkyIcon(data) {
  const iconCode = data.list[0].weather[0].icon;
  const skyIconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  const currentSkyIconEl = document.createElement("img");
  const existingSkyIcon = document.getElementById("weather-icon-img");

  currentSkyIconEl.setAttribute("id", "weather-icon-img");
  currentSkyIconEl.setAttribute("src", skyIconUrl);

  if (existingSkyIcon) {
    existingSkyIcon.remove();
  }

  document.getElementById("weather-icon").appendChild(currentSkyIconEl);
}

// Show Current Data From API
function showCurrentWeather(data) {
  cityName.textContent = data.city.name;
  (date.textContent = formatDateLetters(data.list[0].dt_txt.substring(0, 10))),
    showSkyIcon(data);
  cityTemp.textContent = data.list[0].main.temp;
  cityWind.textContent = data.list[0].wind.speed;
  cityHumidity.textContent = data.list[0].main.humidity;
}

// Show Date As MM/DD/YY
function formatDateNum(numString) {
  const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
  return new Date(numString).toLocaleDateString(undefined, options);
}

// Show the Future Weather Icon
function displaySkyImg(data, i) {
  const iconCode = data.list[i].weather[0].icon;
  const skyImgUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  const futureSkyImgEl = document.createElement("img");

  futureSkyImgEl.setAttribute("src", skyImgUrl);
  return futureSkyImgEl;
}

// Show Data For The Next 5 Days
function showPrediction(data) {
  predictions.innerHTML = "";

  for (var i = 0; i <= data.list.length - 1; i = i + 8) {
    var html = `<section id="FiveDays" class="card col-3 m-1 d-inline-block bg-info">
    <h4 class="date p-2">${formatDateNum(
      data.list[i].dt_txt.substring(0, 10)
    )}</h4>
    <div class="weather-icon-container">${
      displaySkyImg(data, i).outerHTML
    }</div>
    <p class="text-top">Temp: ${data.list[i].main.temp} °F</p>
    <p class="text-top">Wind: ${data.list[i].wind.speed} MPH</p>
    <p class="text-top">Humidity: ${data.list[i].main.humidity} %</p>
    </section>`;

    predictions.insertAdjacentHTML("beforeend", html);
  }
}

// Call pastSearches initially to display search history if available
pastSearches();
