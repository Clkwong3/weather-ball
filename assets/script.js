var APIkey = "bfd9e7606a4c20b7da2609119a710775";

var currentCity;

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
      var today = document.getElementById("current-temp");

      // City Name
      var cityName = document.createElement("<h2>");
      cityName.textContent(currentCity);
      today.append(cityName);
    });
}
