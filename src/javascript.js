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

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row flex-nowrap">`;

	forecast.forEach(function (forecastDay, index) {
		if (index < 5) {
			forecastHTML =
				forecastHTML +
				`
							<div class="col" style="padding: 0 0 0 10px">
								<div class="card text-center weekly-forecast">
									<div class="card-body">
										<h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
									
										<img
											src="http://openweathermap.org/img/wn/${
												forecastDay.weather[0].icon
											}@2x.png"
											alt=""
											class="dow-icon"
										/>
										<p class="card-text">
											<strong id="temperature-max">${forecastDay.temp.max.toFixed(0)}°
											</strong> 
											| 
											<span id="temperature-min">${forecastDay.temp.min.toFixed(0)}°</span>
										</p>
									</div>
								</div>
							</div>
						`;
		}
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "40351ed1d8651874e2b8721c2af41209";
	let lat = coordinates.lat;
	let lon = coordinates.lon;

	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayForecast);
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

	getForecast(response.data.coord);
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

function searchLondon(event) {
	event.preventDefault();
	search("London");
}

function searchBerlin(event) {
	event.preventDefault();
	search("Berlin");
}

function searchMadrid(event) {
	event.preventDefault();
	search("Madrid");
}

function searchLisbon(event) {
	event.preventDefault();
	search("Lisbon");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let londonWeather = document.querySelector("#london");
londonWeather.addEventListener("click", searchLondon);

let berlinWeather = document.querySelector("#berlin");
berlinWeather.addEventListener("click", searchBerlin);

let madridWeather = document.querySelector("#madrid");
madridWeather.addEventListener("click", searchMadrid);

let lisbonWeather = document.querySelector("#lisbon");
lisbonWeather.addEventListener("click", searchLisbon);

search("Valencia");
