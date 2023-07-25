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

      // Current Date
      var cityDate = data.current.dt;
      currentCity = dayjs(cityDate).format("MMMM D, YYYY");

      var todayDate = document.createElement("<span>");
      todayDate.textContent(currentCity);
      cityName.append(cityDate);

      // Weather Icons
      var cityIcon = data.currrent.weather[0].icon;
      var weatherIcon = document.createElement("<img>");
      weatherIcon.attributeStyleMap(
        "src",
        "http://openweathermap.org/img/wn/" + cityIcon + ".png"
      );
      cityName.append(weatherIcon);
    });
}
