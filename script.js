'use strict';

const url = 'http://api.weatherstack.com/current?access_key=707f05c875594327b5cd978294e0964a';
const node = document.querySelector('.block-result');
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__button');
const searchForm = document.querySelector('.wrap-search');
const form = document.querySelector('.form');


let database = {
    city: 'London',
    windSpeed: 0,
    feelslike: 0,
    humidity: 0,
    temperature: 0,
    country: 'United Kingdom'
};

async function fetchData() {
    const response = await fetch(`${url}&query=${database.city}`);
    // Parsing it to JSON format
    const data = await response.json();

    const { 
        current: { feelslike, wind_speed: windSpeed, humidity, temperature, weather_descriptions: description },
        location: { country },
    } = data;

    database = {
        ...database,
        windSpeed,
        feelslike,
        humidity,
        description,
        temperature,
        country,
    };

    console.log(data);

    renderComponent();
};

const markup = () => {

    const { city, windSpeed, feelslike, humidity, temperature, country, description } = database;

    return `
    <div class="result-header">
        <div class="header__title">Weather</div>
        <img src="img/search.svg" width="24px" height="24px" alt="search">
    </div>
    <div class="degree-view">
        <img src="img/cloudy.svg" width="140px" alt="sunny">
        <p class="degree js-fill">${temperature}°C</p>
        <p class="city js-fill">${city}, ${country}</p>
        <p class="position js-fill">${description}</p>
    </div>
    <div class="details">
        <div class="wind box-details">
            <p class="details__num js-fill">${windSpeed}</p>
            <img src="img/windy.svg" width="24px" alt="windy">
            <p class="details__text">Wind Flow</p>
        </div>
        <div class="feels_like box-details">
            <p class="details__num js-fill">${feelslike}</p>
            <img src="img/feels_like.svg" width="24px" alt="feels like">
            <p class="details__text">Feels Like</p>
        </div>
        <div class="humidity box-details">
            <p class="details__num js-fill">${humidity}</p>
            <img src="img/humidity.svg" width="24px" alt="humidity">
            <p class="details__text">Humidity</p>
        </div>
    </div>
    `;
};

const renderComponent = () => {
    node.innerHTML = markup();
};

const showData = () => {
    node.classList.remove('dis-none');
    searchForm.classList.add('dis-none');
};  

const handleInput = (e) => {
    database = {
        ...database,
        city: e.target.value,
    }
};

const handleSumbit = (e) => {
    e.preventDefault();
    console.log(database.city);
    fetchData();
};

searchBtn.addEventListener('click', showData);
searchInput.addEventListener('input', handleInput);
form.addEventListener('submit', handleSumbit);

fetchData();
