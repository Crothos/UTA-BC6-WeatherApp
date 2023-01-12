var form = document.getElementById("cityform");



//var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=benbrook&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial";

form.addEventListener('submit', citySubmit);

 function citySubmit(event){
    event.preventDefault();
    var city = document.getElementById("cityname").value;
    localStorage.setItem('city', city);
     getApi();
}

 function getApi() {
    var city = localStorage.getItem('city');
     fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial")
     .then(function (response) {
       return response.json();
     })
     .then(function (data) {
       console.log(data);
     });
};

