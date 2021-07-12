// transform a value from one range to another
// usage- map(28, 0, 100, 100, 200)
const map = (value, inMin, inMax, outMin, outMax) => {
	return (
	((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
	)
}