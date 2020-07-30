import React from 'react';
import ReactDOM from 'react-dom';

import Weather from './Weather';
import * as serviceWorker from './serviceWorker';

declare global {
    interface Window {
        hydrateData: {
			city: string;
			temperature: string;
			humidity: string;
			wind: string;
		};
    }
}

ReactDOM.hydrate(
	<React.StrictMode>
		<Weather {...window.hydrateData}/>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
