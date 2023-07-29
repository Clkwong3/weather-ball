var APIkey = "bfd9e7606a4c20b7da2609119a710775";

// DOM EL
var userInput = document.getElementById("#user-input");
var searchBtn = document.querySelector("#search-button");
var clearBtn = document.getElementById("#clear-button");
var pastSearch = document.getElementById("#past-city");

var cityName = document.getElementById("#card-title");
var city = [];

function getDate() {
  // Get the Current Date
  var date = new Date();
  var currentDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  document.getElementById("date").innerHTML = currentDate;

  // Get Prediction Dates
  for (var i = 0; i <= 5; i++) {}
}
getDate();

// May need 2 different API url because of the lat and lon
// functions needs EventListener
// Navigation
// User input -> array -> json.stringify

// Get City From User
function handleSearchFormSubmit(event) {
  event.preventDefault();

  document.getElementById("card-title").innerHTML = userInput;
  console.log(userInput);

  var currentCity = document.querySelector("#search-button").value;
  console.log(currentCity);
  // getCity(currentCity);
}
searchBtn.addEventListener("click", handleSearchFormSubmit);

function getCity(currentCity) {
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
      localStorage.setItem("city", JSON.stringify(cityStorage));

      console.log(cityInfo);
      return cityInfo();
    })
    .then(function (data) {
      weatherInfo(data);
      console.log(weatherInfo);
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
      var todayTemp = getElementById("#current-temp");

      todayTemp.text("Temp: ", cityTemp);
      today.append(todayTemp);

      // Current Wind
      var cityWind = data.current.wind;
      var todayWind = getElementById("#current-wind");

      todayWind.text("Wind: ", cityWind);
      today.append(todayWind);

      // Current Humidity
      var cityHumidity = data.current.Humidity;
      var todayHumidity = getElementById("#current-humidity");

      todayHumidity.text("Humidity: ", cityHumidity);
      today.append(todayHumidity);
    });
  return;
}
