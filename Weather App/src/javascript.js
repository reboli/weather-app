//#1 In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let day = days[now.getDay()];

let today = document.querySelector("div.today");
today.innerHTML = `${day}`;

let time = document.querySelector("div.time");
time.innerHTML = `${hour}:${minutes}`;

//Feature #2 Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

//Bonus Feature Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function showCelsius(event) {
	event.preventDefault();
	let celsius = document.querySelector("#temperature");
	celsius.innerHTML = `25`;
}

let celsius = document.querySelector("#celsius-option");
celsius.addEventListener("click", showCelsius);

function showFarenheight(event) {
	event.preventDefault();
	let farenheight = document.querySelector("#temperature");
	farenheight.innerHTML = `77`;
}

let farenheight = document.querySelector("#farenheight-option");
farenheight.addEventListener("click", showFarenheight);

function displayWeather(response) {
	console.log(response.data);
	document.querySelector("h1").innerHTML = response.data.name;
	document.querySelector("h2").innerHTML =
		response.data.main.temp.toFixed(0);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;

	document.querySelector(
		"#wind"
	).innerHTML = `Wind: ${response.data.wind.speed.toFixed(0)}km/h`;
	document.querySelector(
		"#humidity"
	).innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function searchCity(event) {
	event.preventDefault();
	let city = document.querySelector("#search-text-input").value;

	let apiKey = "40351ed1d8651874e2b8721c2af41209";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#update-button");

currentLocationButton.addEventListener("click", getCurrentLocation);
