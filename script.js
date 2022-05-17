'use strict';

const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={615817b80933af5c558aa4fcd4a5378f}'

const api_url = "https://randomuser.me/api/";

async function getUser() {
    const response = await fetch(api_url);
    // Parsing it to JSON format
    const data = await response.json();
    const info = data.results;
    console.log(info);
    console.log(info['nat']);
}

function leySay() {
    let a = 10;
}

getUser();