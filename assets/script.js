var form = document.getElementById("cityform");

var currentCity;
var currentWeather;
var currentTemp;
var currentWind;
var currentHumidity;


//5-day Forecast = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial"

form.addEventListener('submit', citySubmit);

 function citySubmit(event){
    event.preventDefault();
    var city = document.getElementById("cityname").value;
    localStorage.setItem('city', city);
     getApi();
}

 function getApi() {
    var city = localStorage.getItem('city');
     fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial")
     .then(function (response) {
       return response.json();
     })
     .then(function (data) {
        currentCity = data.name;
        currentWeather = data.weather[0].main;
        currentTemp = data.main.temp;
        currentWind = data.wind.speed;
        currentHumidity = data.main.humidity;

        renderCurrentConditions();
    
})
function renderCurrentConditions() { 
    var elem = document.createElement("img");
    elem.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
    elem.setAttribute("alt", "Weather Icon");
    document.getElementById("weather-list").append(elem);
    document.getElementById("currentCity").innerText = "City: " + currentCity;
    document.getElementById("currentCond").innerText = "Conditions: " + currentWeather;
    document.getElementById("currentTemp").innerText = "Temperature: " + currentTemp +"F";
    document.getElementById("currentWind").innerText = "Wind Speed: " + currentWind +"mph";
    document.getElementById("currentHumid").innerText = "Humidity: " + currentHumidity + "%";
}
}

