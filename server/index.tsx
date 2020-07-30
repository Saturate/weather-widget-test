import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import React from 'react';

import express, { Request, Response } from "express";
import ReactDOMServer from 'react-dom/server';

import getWeather from './utils/weather-api';

import App from '../src/Weather';

const PORT = process.env.PORT || 3006;
const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get(['/', '/:city'], (req: Request, res: Response) => {
	const city = req.params.city || 'Copenhagen';

	getWeather(city, (data) => {
		const app = ReactDOMServer.renderToString(<App {...data} />);

		const indexFile = path.resolve('./build/index.html');

		fs.readFile(indexFile, 'utf8', (err, fileData) => {
			if (err) {
				console.error('Read File Error:', err);
				return res.status(500).send('We are currently having problems, check the weather outside :-)');
			}

			const hydrateData = `
				<script>
					window.hydrateData=${JSON.stringify(data)}
				</script>
			`

			return res.send(
				fileData.replace('<div id="root"></div>', `${hydrateData}<div id="root">${app}</div>`)
			);
		});
	});
});

app.post(['/', '/:city'], (req: Request, res: Response) => {
	res.writeHead(301, { Location: '/' + req.body.city });
	res.end();
});

app.get('/api/:city', (req: Request, res: Response) => {
	const city = req.params.city;

	getWeather(city, (data) => {
		res.send({data})
	});
});

app.use(express.static('./build'));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
