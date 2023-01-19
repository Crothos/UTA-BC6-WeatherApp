var form = document.getElementById("cityform");

var timeDisplayEl = document.getElementById("timeDay");
var currentCity;
var currentWeather;
var currentTemp;
var currentWind;
var currentHumidity;
var currentIcon;
var fdIcon1;
var fdIcon2;
var fdIcon3;
var fdIcon4;
var fdIcon5;

var day1Temp;
var day1Wind;
var day1Humid;

var day2Temp;
var day2Wind;
var day2Humid;

var day3Temp;
var day3Wind;
var day3Humid;

var day4Temp;
var day4Wind;
var day4Humid;

var day5Temp;
var day5Wind;
var day5Humid;

// TO DO: ADD FIVE DAY FORECAST AND APPEND LAST 5 HISTORY BUTTONS
//5-day Forecast = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial"

function displayDate() {
    var rightNow = dayjs().format('MMM DD, YYYY');
    timeDisplayEl.textContent = rightNow;
}

form.addEventListener('submit', citySubmit);

 function citySubmit(event){
    event.preventDefault();

    displayDate();

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

        currentIcon = data.weather[0].icon
        currentCity = data.name;
        currentWeather = data.weather[0].description;
        currentTemp = data.main.temp;
        currentWind = data.wind.speed;
        currentHumidity = data.main.humidity;

        renderCurrentConditions();
        getFiveDay();
})
function renderCurrentConditions() { 
    var elem = document.getElementById("icon");
    elem.setAttribute("src", "http://openweathermap.org/img/wn/"+currentIcon+"@2x.png");
    elem.setAttribute("alt", "Weather Icon");

    document.getElementById("currentCity").innerText = "City: " + currentCity;
    document.getElementById("currentCond").innerText = "Conditions: " + currentWeather;
    document.getElementById("currentTemp").innerText = "Temperature: " + currentTemp +"F";
    document.getElementById("currentWind").innerText = "Wind Speed: " + currentWind +"mph";
    document.getElementById("currentHumid").innerText = "Humidity: " + currentHumidity + "%";
}
function getFiveDay() {
    var city = localStorage.getItem('city');
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        fdIcon1 = data.list[2].weather[0].icon;
        fdIcon2 = data.list[10].weather[0].icon;
        fdIcon3 = data.list[18].weather[0].icon;
        fdIcon4 = data.list[26].weather[0].icon;
        fdIcon5 = data.list[34].weather[0].icon;

        fdDate1 = data.list[2].dt_txt;
        fdDate2 = data.list[10].dt_txt;
        fdDate3 = data.list[18].dt_txt;
        fdDate4 = data.list[26].dt_txt;
        fdDate5 = data.list[34].dt_txt;

        day1Humid = data.list[2].main.humidity;
        day1Temp = data.list[2].main.temp;
        day1Wind = data.list[2].wind.speed;
        day2Humid = data.list[10].main.humidity;
        day2Temp = data.list[10].main.temp;
        day2Wind = data.list[10].wind.speed;
        day3Humid = data.list[18].main.humidity;
        day3Temp = data.list[18].main.temp;
        day3Wind = data.list[18].wind.speed;
        day4Humid = data.list[26].main.humidity;
        day4Temp = data.list[26].main.temp;
        day4Wind = data.list[26].wind.speed;
        day5Humid = data.list[34].main.humidity;
        day5Temp = data.list[34].main.temp;
        day5Wind = data.list[34].wind.speed;
        renderFiveDay();
    })
    function renderFiveDay() {
        var elem1 = document.getElementById("dayOne");
        var elem2 = document.getElementById("dayTwo");
        var elem3 = document.getElementById("dayThree");
        var elem4 = document.getElementById("dayFour");
        var elem5 = document.getElementById("dayFive");

        var elem6 = document.getElementById("dateOne");
        var elem7 = document.getElementById("dateTwo");
        var elem8 = document.getElementById("dateThree");
        var elem9 = document.getElementById("dateFour");
        var elem10 = document.getElementById("dateFive");

        elem1.setAttribute("src", "http://openweathermap.org/img/wn/"+fdIcon1+"@2x.png");
        elem1.setAttribute("alt", "Weather Icon");
        elem2.setAttribute("src", "http://openweathermap.org/img/wn/"+fdIcon2+"@2x.png");
        elem2.setAttribute("alt", "Weather Icon");
        elem3.setAttribute("src", "http://openweathermap.org/img/wn/"+fdIcon3+"@2x.png");
        elem3.setAttribute("alt", "Weather Icon");
        elem4.setAttribute("src", "http://openweathermap.org/img/wn/"+fdIcon4+"@2x.png");
        elem4.setAttribute("alt", "Weather Icon");
        elem5.setAttribute("src", "http://openweathermap.org/img/wn/"+fdIcon5+"@2x.png");
        elem5.setAttribute("alt", "Weather Icon");

        elem6.textContent = `Date: ${fdDate1}
        Humidity: ${day1Humid}
        Temp: ${day1Temp}
        Wind Speed: ${day1Wind}`;

        elem7.textContent = fdDate2;
        elem8.textContent = fdDate2;
        elem9.textContent = fdDate2;
        elem10.textContent = fdDate2;
    }
}
}

