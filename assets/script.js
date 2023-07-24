var APIkey = bfd9e7606a4c20b7da2609119a710775;

function weatherInfo(data) {
  var url =
    "https://api.openweathermap.org/data/3.0/onecall?lat=${data.lat}&lon=${data.lon}&exclude=alerts&units&appid={APIkey}";

  // Get Data From URL Provided
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {});
}
