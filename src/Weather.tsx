import React, { useState, useEffect } from 'react';

function searchWeather(e: React.FormEvent<HTMLFormElement>, city: string, callback: (city: string) => void) {
	e.preventDefault();
	window.history.pushState({}, '', city)
	callback(city)
}

interface IWeatherProps {
	city: string;
	temperature?: string;
	humidity?: string;
	wind?: string;
	error?: string;
}

function WeatherWidget(props: IWeatherProps) {
	const [city, setCity] = useState(props.city);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [initalRender, setInitalRender] = useState(true);
	const [hasError, setHasError] = useState(props.error || false);
	const [weather, setWeather] = useState({
		city: props.city || '',
		temperature: props.temperature || '',
		humidity: props.humidity || '',
		wind: props.wind || ''
	});

	useEffect(() => {
		if(!initalRender) {
			setIsLoading(true);
			console.log('Getting weather data')
			fetch(`/api/${city}`)
				.then(res => {
					return res.json();
				})
				.then(json => {
					setWeather(json.data);
					setIsLoading(false);
				})
				.catch(err => {
					setHasError(err);
				});
		}
	}, [city]);

	console.log('weather', weather);

	return (
		<div style={{ margin: 10, width: 300}}>
			<div className="panel panel-info">
				<div className="panel-heading">Weather in <b>{city}</b></div>
					<ul className="list-group">
						{isLoading && <li className="list-group-item">Retriving weather data...</li>}
						{hasError && <li className="list-group-item">Error getting data for <b>{city}</b>.</li>}
						{!isLoading && !hasError && (
							<>
							<li className="list-group-item">Temperature: <b>{weather.temperature}°C</b></li>
							<li className="list-group-item">Humidity: <b>{weather.humidity}</b></li>
							<li className="list-group-item">Wind: <b>{weather.wind}</b></li>
							</>
						)}
						<li className="list-group-item">
							<form className="form-inline" action="/" method="post" onSubmit={(e) => searchWeather(e, search, (city) => {
								setCity(city);
								setInitalRender(false);
							})}>
								<div className="form-group">
									<input type="text" name="city" className="form-control" id="city" placeholder="City" onChange={e => setSearch(e.target.value)} />
								</div>
								<button type="submit" className="btn btn-default">Search</button>
							</form>
						</li>
					</ul>
			</div>
		</div>
	);
}

export default WeatherWidget;
