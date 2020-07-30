import fetch from 'node-fetch';
import formatWindData from './format-wind';

const UNITS = 'metric';
const APIKEY = '166d00e26d3ff2c6149e89feccc5c59a'; // Should not really be in GIT :-)

interface IWeatherData {
	city: string;
	temperature: string;
	humidity: string;
	wind: string;
	error?: string
}

function getWeather(city: string, callback: (data: IWeatherData) => void) {
	const uri = `http://api.openweathermap.org/data/2.5/weather?q=${city},dk&appid=${APIKEY}&units=${UNITS}`;
	return fetch(uri)
		.then(res => {

			if(!res.ok) {
				console.log(uri)
				console.error(`${res.status} ${res.statusText}`)
				return {
					error: `${res.status} ${res.statusText}`
				};
			}

			return res.json();
		})
		.then(weatherJson => {
			console.log(weatherJson);

			if(weatherJson.error) {
				return callback({
					city: city,
					error: weatherJson.error,
					temperature: 'N/A',
					humidity: 'N/A',
					wind: 'N/A'
				});
			}

			return callback({
				city: weatherJson.name,
				temperature: weatherJson.main.temp,
				humidity: weatherJson.main.humidity,
				wind: formatWindData(weatherJson.wind)
			});
		})
		.catch(err => console.error(err));
}

export default getWeather;
