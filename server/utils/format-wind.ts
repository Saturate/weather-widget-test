interface WindData {
	speed: number;
	deg: number;
}

function formatWindData(wind: WindData) {
	const unit = 'm/s';
	const speed = wind.speed;
	const angle = wind.deg;

	// A circle is 360 degs, we split this up in 8 pieces and from the angle we take the correct label.
	const cd = 360 / 8;
	const t = Math.floor(angle / cd);

	const directionStrings = [
		'↑ North',
		'↗ North East',
		'→ East',
		'↘ South East',
		'↓ South',
		'↙ South West',
		'← West',
		'↖ North West'
	]
	const direction = directionStrings[t];

	return `${speed} ${unit} ${direction}`;
}

export default formatWindData;
