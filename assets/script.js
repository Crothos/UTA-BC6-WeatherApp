var form = document.getElementById("cityform");

var timeDisplayEl = document.getElementById("timeDay");
var cityName;
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


var historyList = [];
var savedHistoryList = JSON.parse(localStorage.getItem("history"));
console.log(savedHistoryList);
if (savedHistoryList === null){
    console.log("Empty!")
} else {
    printBtn();
}
function printBtn() {
    for (var i = 0; i < savedHistoryList.length; i++) {
       var btn = document.createElement("button");
       var t = document.createTextNode(savedHistoryList[i]);
       var history = document.getElementById("history");
       history.appendChild(btn);
       btn.appendChild(t);
    }}

function displayDate() {
    var rightNow = dayjs().format('MMM DD, YYYY');
    timeDisplayEl.textContent = rightNow;
}

form.addEventListener('submit', citySubmit);

 function citySubmit(event){
    event.preventDefault();
    displayDate();
    var city = document.getElementById("cityname").value;
    cityName = city;
    historyList.push(cityName);
    var btn = document.createElement("button");
    var t = document.createTextNode(cityName);
    var history = document.getElementById("history");
    history.appendChild(btn);
    btn.appendChild(t);
    localStorage.setItem("history", JSON.stringify(historyList));
    getApi();
}

 function getApi() {
    var city = cityName;
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
    var city = cityName;
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

        fdDate6 = fdDate1.substring(0, 10);
        fdDate7 = fdDate2.substring(0, 10);
        fdDate8 = fdDate3.substring(0, 10);
        fdDate9 = fdDate4.substring(0, 10);
        fdDate10 = fdDate5.substring(0, 10);

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

        var elem11 = document.getElementById("dOne");
        var elem12 = document.getElementById("dTwo");
        var elem13 = document.getElementById("dThree");
        var elem14 = document.getElementById("dFour");
        var elem15 = document.getElementById("dFive");

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

        elem6.textContent = fdDate6;
        elem7.textContent = fdDate7;
        elem8.textContent = fdDate8;
        elem9.textContent = fdDate9;
        elem10.textContent = fdDate10;

        var li = document.createElement('li');
        li.textContent = "Humidity: " + day1Humid + "%";
        var li2 = document.createElement('li');
        li2.textContent = "Temp: " + day1Temp + "F";
        var li3 = document.createElement('li');
        li3.textContent = "Wind Speed: " + day1Wind + "mph";
        elem11.appendChild(li);
        elem11.appendChild(li2);
        elem11.appendChild(li3);

        var li4 = document.createElement('li');
        li4.textContent = "Humidity: " + day2Humid + "%";
        var li5 = document.createElement('li');
        li5.textContent = "Temp: " + day2Temp + "F";
        var li6 = document.createElement('li');
        li6.textContent = "Wind Speed: " + day2Wind + "mph";
        elem12.appendChild(li4);
        elem12.appendChild(li5);
        elem12.appendChild(li6);

        var li7 = document.createElement('li');
        li7.textContent = "Humidity: " + day3Humid + "%";
        var li8 = document.createElement('li');
        li8.textContent = "Temp: " + day3Temp + "F";
        var li9 = document.createElement('li');
        li9.textContent = "Wind Speed: " + day3Wind + "mph";
        elem13.appendChild(li7);
        elem13.appendChild(li8);
        elem13.appendChild(li9);

        var li10 = document.createElement('li');
        li10.textContent = "Humidity: " + day4Humid + "%";
        var li11 = document.createElement('li');
        li11.textContent = "Temp: " + day4Temp + "F";
        var li12 = document.createElement('li');
        li12.textContent = "Wind Speed: " + day4Wind + "mph";
        elem14.appendChild(li10);
        elem14.appendChild(li11);
        elem14.appendChild(li12);

        var li13 = document.createElement('li');
        li13.textContent = "Humidity: " + day5Humid + "%";
        var li14 = document.createElement('li');
        li14.textContent = "Temp: " + day5Temp + "F";
        var li15 = document.createElement('li');
        li15.textContent = "Wind Speed: " + day5Wind + "mph";
        elem15.appendChild(li13);
        elem15.appendChild(li14);
        elem15.appendChild(li15);
    }
}
}

