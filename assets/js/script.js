// 'use strict';

// GLOBAL VARIABLES
var searchBarEl = document.getElementById('search-bar');
var curWeather = [{ temp: '', wind: '', humidity: '', uv: '' }];
var day2 = [{ temp: '', wind: '', humidity: '' }];
var day3 = [{ temp: '', wind: '', humidity: '' }];
var day4 = [{ temp: '', wind: '', humidity: '' }];
var day5 = [{ temp: '', wind: '', humidity: '' }];
var day6 = [{ temp: '', wind: '', humidity: '' }];
var recentCities = [];

$('#search-form').submit(function (event) {
  event.preventDefault();
  var city = searchBarEl.value.trim();

  // clear old content
  $(document).ready(function () {
    $(searchBarEl).val('');
  });
});

// API URLS
var curApiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

var oneApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?';

var forApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

var apiKey = '&APPID=6c4166b2aa40bda720c59188b206ddb3';

var getCurWeather = function (city) {
  fetch(`${curApiUrl}q=${city}${apiKey}`)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          getUvi(data.coord.lat, data.coord.lon);
          getForecast(city);

          // CALL FORECAST API FUNCTION AND PASS CITY NAME
        });
      } else {
        alert(`Error: City Not Found`);
      }
    })
    .catch(function (error) {
      alert(`Unable to connect to Current Weather API`);
    });
};

getCurWeather('Vancouver');

var getUvi = function (lat, lon) {
  fetch(`${oneApiUrl}lat=${lat}&lon=${lon}${apiKey}`).then(function (response) {
    response
      .json()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        alert(`Unable to connect to One Call API`);
      });
  });
};

var getForecast = function (city) {
  fetch(`${forApiUrl}q=${city}${apiKey}`).then(function (response) {
    response
      .json()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        alert(`Unable to connect to 5 Day Forecast API`);
      });
  });
};

// check recentCities array / localstorage and call return city weather function passing first item in array / local storage.

// create function for returning city weather via One Call API

// return current temp, wind, humidity and UV Index
// save city in recentCities in local storage / array
// return day2 - day6

// on submit, pass city into return City weather function

// var formSubmitHandler = function (event) {
//   event.preventDefault();
//   // get value from input element
//   var city = searchBarEl.value.trim();
//   console.log('city');

//   if (city) {
//     getWeather(city);
//     city.value = '';
//   } else {
//     alert('Please enter a valid City name');
//   }

// };

// on click, pass city into return city weather function

// searchBarEl.addEventListener('submit', formSubmitHandler);
