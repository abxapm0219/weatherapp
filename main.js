  
const api = {
    key: "e68d023922749148106e7e85a4b45c17",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox =  document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchbox.value);
    }
}
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).
    then(wr => {
        return wr.json();
    }).then(displayResults);
}

function displayResults(wr){
    document.querySelector('.location .city').innerText = `${wr.name},${wr.sys.country}`;

    let now = new Date();
    document.querySelector('.location .date').innerText = dateBuilder(now);

    document.querySelector('.current .temp').innerHTML = `${Math.round(wr.main.temp)}<span>°c</span>`;

    document.querySelector('.current .weather').innerText = wr.weather[0].main;

    document.querySelector('.hi-low').innerText = `${Math.round(wr.main.temp_max)}°c / ${Math.round(wr.main.temp_min)}°c`;
}

function dateBuilder(d){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}