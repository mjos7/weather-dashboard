// 'use strict';

// GLOBAL VARIABLES
var now = dayjs();
var today = $('.date').append(now.format('dddd, MMMM D, YYYY'));
var searchBarEl = document.getElementById('search-bar');
var curWeather = [{ temp: '', wind: '', humidity: '', uv: '' }];
var day2 = [{ temp: '', wind: '', humidity: '' }];
var day3 = [{ temp: '', wind: '', humidity: '' }];
var day4 = [{ temp: '', wind: '', humidity: '' }];
var day5 = [{ temp: '', wind: '', humidity: '' }];
var day6 = [{ temp: '', wind: '', humidity: '' }];

$('#search-form').submit(function (event) {
  event.preventDefault();
  var city = searchBarEl.value.trim();
  if (city == '') {
    alert('Please enter a city');
    return;
  } else {
    getCurWeather(city);
  }
  // clear old content
  $(document).ready(function () {
    $(searchBarEl).val('');
  });
});

var setLocal = function () {
  // 1. "Get list"
  var recentCities = JSON.parse(localStorage.getItem('city')) || [];

  recentCities.push({ city: city });
  // 2: "Filter"
  recentCities.filter((item, index) => recentCities.indexOf(item) === index);
  // 3: "Reduce"
  recentCities.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );
  // 4: "Set item"
  localStorage.setItem('city', JSON.stringify(recentCities));
  console.log(recentCities);
};

// API URLS
var curApiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

var oneApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?';

var forApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

var apiKey = '&APPID=6c4166b2aa40bda720c59188b206ddb3';

var getCurWeather = function (city) {
  fetch(`${curApiUrl}q=${city}&units=imperial${apiKey}`)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          // console.log('Current Weather');
          // console.log(data);
          getUvi(data.coord.lat, data.coord.lon);
          getForecast(city);
          displayCurWeather(data);
        });
      } else {
        alert(`Error: City Not Found`);
      }
    })
    .catch(function (error) {
      alert(`Unable to connect to Current Weather API`);
    });
};

var getUvi = function (lat, lon) {
  fetch(`${oneApiUrl}lat=${lat}&lon=${lon}${apiKey}`).then(function (response) {
    response
      .json()
      .then(function (data) {
        displayCurUvi(data);
        // console.log('UVI');
        // console.log(data);
      })
      .catch(function (error) {
        alert(`Unable to connect to One Call API`);
      });
  });
};

var getForecast = function (city) {
  fetch(`${forApiUrl}q=${city}&units=imperial${apiKey}`).then(function (
    response
  ) {
    response
      .json()
      .then(function (data) {
        displayForecast(data);
      })
      .catch(function (error) {
        alert(`Unable to connect to 5 Day Forecast API`);
      });
  });
};

// Display Current Weather
var displayCurWeather = function (data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('cur-temp').textContent = data.main.temp + ' ˚F';
  document.getElementById('cur-wind').textContent = data.wind.speed + ' MPH';
  document.getElementById('cur-humidity').textContent =
    data.main.humidity + ' %';
};

// Display Current UVI
var displayCurUvi = function (data) {
  var curUviEl = document.getElementById('cur-uvi');
  curUviEl.innerHTML = data.current.uvi;
  curUviEl.classList.add('uv-background');
};

// Display Future Forecast
var displayForecast = function (data) {
  // Day 1
  document.getElementById('day-1-temp').textContent =
    data.list[0].main.temp + ' ˚F';
  document.getElementById('day-1-wind').textContent =
    data.list[0].wind.speed + ' MPH';
  document.getElementById('day-1-humidity').textContent =
    data.list[0].main.humidity + ' %';
  // Day 2
  document.getElementById('day-2-temp').textContent =
    data.list[1].main.temp + ' ˚F';
  document.getElementById('day-2-wind').textContent =
    data.list[1].wind.speed + ' MPH';
  document.getElementById('day-2-humidity').textContent =
    data.list[1].main.humidity + ' %';
  // Day 3
  document.getElementById('day-3-temp').textContent =
    data.list[2].main.temp + ' ˚F';
  document.getElementById('day-3-wind').textContent =
    data.list[2].wind.speed + ' MPH';
  document.getElementById('day-3-humidity').textContent =
    data.list[2].main.humidity + ' %';
  // Day 4
  document.getElementById('day-4-temp').textContent =
    data.list[3].main.temp + ' ˚F';
  document.getElementById('day-4-wind').textContent =
    data.list[3].wind.speed + ' MPH';
  document.getElementById('day-4-humidity').textContent =
    data.list[3].main.humidity + ' %';
  // Day 5
  document.getElementById('day-5-temp').textContent =
    data.list[4].main.temp + ' ˚F';
  document.getElementById('day-5-wind').textContent =
    data.list[4].wind.speed + ' MPH';
  document.getElementById('day-5-humidity').textContent =
    data.list[4].main.humidity + ' %';
};

// console.log($('#cur-temp'));

// Display Forecast Function

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
