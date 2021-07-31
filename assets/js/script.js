'use strict';

// GLOBAL VARIABLES
var recentSearches = JSON.parse(localStorage.getItem('searches')) || [];
var now = dayjs();
var today = $('.date').append(now.format('dddd, MMMM D, YYYY'));
var searchBarEl = document.getElementById('search-bar');
var srchItemsEl = document.getElementById('search-items');
var cityHistoryEl = document.querySelector('.city-history');

// When user inputs City and submits
$('#search-form').submit(function (event) {
  event.preventDefault();
  var city = searchBarEl.value.trim();
  if (city == '') {
    alert('Please enter a city');
    return;
  } else {
    $('html, body').animate(
      {
        scrollTop: $('#city-name').offset().top - 70,
      },
      500
    );
    startWeather(city);
  }
  // clear old content
  $(document).ready(function () {
    $(searchBarEl).val('');
  });
});

// Mobile scroll on submit
$('a[href^="#"]').on('click', function (event) {
  var target = $($(this).attr('href')),
    navBarHeight = $('.nav').height();

  if (target.length) {
    event.preventDefault();
    $('html, body').animate(
      {
        scrollTop: target.offset().top - navBarHeight,
      },
      1000
    );
  }
});

// Displaying Recent Search items
var recentSearchItems = function () {
  // empty out recent search items (parent div)
  srchItemsEl.innerHTML = '';
  recentSearches = JSON.parse(localStorage.getItem('searches')) || [];
  // create a for loop going through recentSearches
  recentSearches.forEach(city => {
    var srchItemDiv = document.createElement('div');
    srchItemDiv.textContent = city;
    srchItemDiv.classList.add('btn', 'city-history');
    srchItemsEl.appendChild(srchItemDiv);
  });
};
recentSearchItems();

// Function that takes either search input or recent search click value and begings retrieving weather data
var startWeather = function (city) {
  var tempArray = JSON.parse(localStorage.getItem('searches')) || [];
  var uniqueSearches = [];
  if (tempArray.length > 4) {
    tempArray.shift();
  }
  tempArray.push(city);

  tempArray.forEach(item => {
    if (!uniqueSearches.includes(item)) {
      uniqueSearches.push(item);
    }
  });
  tempArray === uniqueSearches;

  localStorage.setItem('searches', JSON.stringify(tempArray));
  getCurWeather(city);
  recentSearchItems();
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
  document.getElementById('cur-icon').innerHTML =
    '<img src="http://openweathermap.org/img/wn/' +
    data.weather[0].icon +
    '@2x.png" width="90" height="90">';
  document.getElementById('cur-temp').textContent =
    Math.round(data.main.temp) + ' ˚F';
  document.getElementById('cur-wind').textContent = data.wind.speed + ' MPH';
  document.getElementById('cur-humidity').textContent =
    data.main.humidity + ' %';
};

// Display Current UVI
var displayCurUvi = function (data) {
  var curUviEl = document.getElementById('cur-uvi');
  var curUvi = data.daily[0].uvi;
  curUviEl.innerHTML = curUvi;
  emptyClass(curUviEl);

  if (curUvi <= 2) {
    curUviEl.classList.add('uv-background-low');
  } else if (curUvi > 2 && curUvi <= 5) {
    curUviEl.classList.add('uv-background-moderate');
  } else if (curUvi > 5 && curUvi <= 7) {
    curUviEl.classList.add('uv-background-high');
  } else if (curUvi > 7 && curUvi < 11) {
    curUviEl.classList.add('uv-background-very-high');
  } else if (curUvi >= 11) {
    curUviEl.classList.add('uv-background-extreme');
  }
};

var emptyClass = function (element) {
  element.className = '';
};

// Display Future Forecast
var displayForecast = function (data) {
  // Day 1
  document.getElementById('day-1-icon').innerHTML =
    '<img src="http://openweathermap.org/img/wn/' +
    data.list[6].weather[0].icon +
    '@2x.png" width="70" height="70">';
  document.getElementById('day-1-temp').textContent =
    Math.round(data.list[6].main.temp_max) + ' ˚F';
  document.getElementById('day-1-wind').textContent =
    data.list[6].wind.speed + ' MPH';
  document.getElementById('day-1-humidity').textContent =
    data.list[6].main.humidity + ' %';
  // Day 2
  document.getElementById('day-2-icon').innerHTML =
    '<img src="http://openweathermap.org/img/wn/' +
    data.list[14].weather[0].icon +
    '@2x.png" width="70" height="70">';
  document.getElementById('day-2-temp').textContent =
    Math.round(data.list[14].main.temp_max) + ' ˚F';
  document.getElementById('day-2-wind').textContent =
    data.list[14].wind.speed + ' MPH';
  document.getElementById('day-2-humidity').textContent =
    data.list[14].main.humidity + ' %';
  // Day 3
  document.getElementById('day-3-icon').innerHTML =
    '<img src="http://openweathermap.org/img/wn/' +
    data.list[22].weather[0].icon +
    '@2x.png" width="70" height="70">';
  document.getElementById('day-3-temp').textContent =
    Math.round(data.list[22].main.temp_max) + ' ˚F';
  document.getElementById('day-3-wind').textContent =
    data.list[22].wind.speed + ' MPH';
  document.getElementById('day-3-humidity').textContent =
    data.list[22].main.humidity + ' %';
  // Day 4
  document.getElementById('day-4-icon').innerHTML =
    '<img src="http://openweathermap.org/img/wn/' +
    data.list[30].weather[0].icon +
    '@2x.png" width="70" height="70">';
  document.getElementById('day-4-temp').textContent =
    Math.round(data.list[30].main.temp_max) + ' ˚F';
  document.getElementById('day-4-wind').textContent =
    data.list[30].wind.speed + ' MPH';
  document.getElementById('day-4-humidity').textContent =
    data.list[30].main.humidity + ' %';
  // Day 5
  document.getElementById('day-5-icon').innerHTML =
    '<img src="http://openweathermap.org/img/wn/' +
    data.list[38].weather[0].icon +
    '@2x.png" width="70" height="70">';
  document.getElementById('day-5-temp').textContent =
    Math.round(data.list[38].main.temp_max) + ' ˚F';
  document.getElementById('day-5-wind').textContent =
    data.list[38].wind.speed + ' MPH';
  document.getElementById('day-5-humidity').textContent =
    data.list[38].main.humidity + ' %';
};

srchItemsEl.addEventListener('click', function (event) {
  var srchItemVal = event.target.innerText;
  console.log(srchItemVal);
  startWeather(srchItemVal);
});
