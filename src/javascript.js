//Feature #2 Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

//Bonus Feature Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day}, ${hours}:${minutes}`;
}

function displayWeather(response) {
	let cityElement = document.querySelector("h1");
	let temperatureElement = document.querySelector("#temperature");
	let dateElement = document.querySelector("span.date");
	let descriptionElement = document.querySelector("#description");
	let windElement = document.querySelector("#wind");
	let humidityElement = document.querySelector("#humidity");
	let imageElement = document.querySelector("#main-image");

	celsiusTemperature = response.data.main.temp.toFixed(0);

	cityElement.innerHTML = response.data.name;
	temperatureElement.innerHTML = response.data.main.temp.toFixed(0);
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	descriptionElement.innerHTML = response.data.weather[0].description;
	windElement.innerHTML = `Wind: ${response.data.wind.speed.toFixed(
		0
	)}km/h`;
	humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
	imageElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	imageElement.setAttribute(
		"alt",
		response.data.weather[0].description
	);
}

function search(city) {
	let apiKey = "40351ed1d8651874e2b8721c2af41209";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#search-text-input");
	search(cityInputElement.value);
}

function showFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = fahrenheit.toFixed(0);
}

function showCelsius(event) {
	event.preventDefault();
	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-option");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-option");
celsiusLink.addEventListener("click", showCelsius);

search("Valencia");
