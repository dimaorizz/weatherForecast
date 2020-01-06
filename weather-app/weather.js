let settings = {
	darkSkyApiKey: '67576ce93d3a18c6df4b6e4472f95a54',
	mapBoxApiKey: 'pk.eyJ1Ijoib3JpenoiLCJhIjoiY2s1Mm51azZ5MDAzejNtbnBxc3Q3dzhrZiJ9.aNybnkVwEWY8evkhKrPUTA',
	place: '',
	latitude: 0,
	longitude: 0,
}

function getForecast(){
	return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/
	${settings.darkSkyApiKey}/${settings.latitude},${settings.longitude}?lang=ru&units=si`)
	.then(res=>res.json());
}

async function showWeatherForecast(){
	let forecast;
	settings.place = document.getElementById('place').value;
	await getCoords(settings.place).then(data => {
			settings.latitude = data.features[0].center[1];
			settings.longitude = data.features[0].center[0];
		});
	await getForecast().then(data => {forecast = data});
	console.log(forecast);
	document.getElementById('forecast-output').innerHTML = `Погода в городе ${settings.place} сейчас:<br>${Math.round(forecast.currently.temperature)} ℃
	<br>${forecast.currently.summary}`;
}

function getCoords(place){
	return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${settings.mapBoxApiKey}`).then(res => res.json());
}

document.getElementById('show-weather').addEventListener('click', showWeatherForecast);