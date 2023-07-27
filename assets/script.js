var APIkey = "bfd9e7606a4c20b7da2609119a710775";

// DOM EL
var userInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-button");
var clearBtn = document.getElementById("clear-button");
var pastSearch = document.getElementById("past-city");

var currentCity;

// May need 2 different API because of the lat and lon
// functions needs EventListener
// Navigation
// User input -> array -> json.stringify

// Get City From User
function handleLocationFormSubmit(event) {
  event.preventDefault();
  currentCity = userInput.val().trim();

  getCity();
  return;
}

function getCity() {
  // URL To Ask For The Weather For The City
  var userCityUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    currentCity +
    `&appid=` +
    APIkey;
  var cityStorage = json.parse(localStorage.getItem("city"));

  fetch(userCityUrl)
    .then(function (data) {
      var cityInfo = {
        city: currentCity,
        lon: data.coord.lon,
        lat: data.coord.lat,
      };

      cityStorage.push(cityInfo);
      localStorage.setItem("city", json.stringify(cityStorage));

      return cityInfo();
    })
    .then(function (data) {
      weatherInfo(data);
    });
  return;
}

function weatherInfo(data) {
  var url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${" +
    APIkey +
    "}";
  // Get Data From URL Provided
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Current Weather
      var today = document.createElement("current-temp");

      // City Name
      var cityName = document.createElement("<h2>");
      cityName.text(currentCity);
      today.append(cityName);

      // Current Date
      var cityDate = data.current.dt;
      currentCity = dayjs(cityDate).format("MMMM D, YYYY");

      var todayDate = document.createElement("<span>");
      todayDate.text(currentCity);
      cityName.append(cityDate);

      // Weather Icons
      var cityIcon = data.currrent.weather[0].icon;
      var weatherIcon = document.createElement("<img>");
      weatherIcon.attributeStyleMap(
        "src",
        "http://openweathermap.org/img/wn/" + cityIcon + ".png"
      );
      cityName.append(weatherIcon);

      // Current Temp
      var cityTemp = data.current.temp;
      var todayTemp = getElementById("<span>");

      todayTemp.text("Temp: ", cityTemp);
      today.append(todayTemp);

      // Current Wind
      var cityWind = data.current.wind;
      var todayWind = getElementById("<span>");

      todayWind.text("Wind: ", cityWind);
      today.append(todayWind);

      // Current Humidity
      var cityHumidity = data.current.Humidity;
      var todayHumidity = getElementById("<span>");

      todayHumidity.text("Humidity: ", cityHumidity);
      today.append(todayHumidity);
    });
  return;
}

searchBtn.addEventListener("click", handleLocationFormSubmit);
