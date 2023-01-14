const WEATHER_API_KEY = "892ac83f0531dc894c7765295ef856e0";
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

let cities = localStorage.getItem('cities') !== null
    ? JSON.parse(localStorage.getItem('cities'))
    : ['Baku', 'London'];

for (const city of cities) {
    createCityTemplate(city);
}

function createCityTemplate(cityName) {
    let template = `<li class="list-group-item">${cityName}<i class="fa fa-trash text-danger"></i></li>`
    $('#cityList').append(template);
    $('#cityList>li').last().on('click', getWeatherInfo);
    $('#cityList>li>i').last().on('click', removeCity);
}

$('#addCity').on('click', function () {
    let city = $('#cityInput').val();

    if(city.length > 0){
        cities.push(city)
       updateLS();
        createCityTemplate(city);
        $('#cityInput').val('');
    }
})


function removeCity() {
    let city = $(this).parent().text().trim();

    cities = cities.filter(c=>c !== city);
    updateLS();
   
    $(this).parent().remove();
}


$('#cityList>li').on('click', getWeatherInfo)
function getWeatherInfo() {
    let cityName = ($(this).text());
    let parameters = {
        appid: WEATHER_API_KEY,
        q: cityName,
        units: 'metric'
    };

    $.get(API_URL, parameters, function (data) {
        $("#weather").attr('hidden', false);
        $("#weatherName").text(data.name)
        $("#weatherDesc").text(data.weather[0].description);
        $("#weatherTemperature").text(data.main.temp + " ℃");
    });
}

function updateLS(){
    localStorage.setItem('cities', JSON.stringify(cities));
}