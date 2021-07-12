/*
 * 12 July 2021
 * Motion Trail pt. II
 * Performs better in Chrome (90.0.4430.93/WinNT10/x64)
 * This project is based on my first CodePen (https://codepen.io/shadow-scientist/pen/xxZJyXo), and was done as a revisit to it.

 * Simplex Noise by Jonas Wagner 
	- (REPO) https://github.com/jwagner/simplex-noise.js
	- (NPM) https://www.npmjs.com/package/simplex-noise

 * I learned to use Perlin noise from 
	- https://youtu.be/8ZEMLCnn8v0
	- https://youtu.be/ZI1dmHv3MeM
	- https://css-tricks.com/simulating-mouse-movement

 * The 3D-like/neumorphism design was inspired by Gabi's beautiful work (https://codepen.io/enxaneta/pen/mJoPgo)
 * The earlier version of this project (Marshmallow Comet Effect) was inspired by a Sketch.js demo (https://soulwire.github.io/sketch.js/examples/particles.html)
 */

const options = {
	rainbow: false,
	circles: false,
	shadows: true,
	depth: false,
	organicShape: false,
	insetBorders: false,

	noiseFactor: 0.0005,
	maxParticlesPerFrame: 9, // set options.maxParticlesPerFrame = 9 for a smoother* performance in Firefox
	minParticleSize: 10,
	maxParticleSize: 90,
	zoomFactor: 1/5
}

const container = document.querySelector('.particles')
const controls = document.querySelectorAll('.controls input[type="checkbox"]')
const colors = [
	'rgb(0, 190, 255)',
	'rgb(255, 255, 255)',
	'rgb(0, 160, 255)',
	'rgb(255, 165, 0)',
	'rgb(240, 245, 250)',
	'rgb(230, 60, 0)'
]

const random = (min, max, round) => {
	let value = min + Math.random() * (max - min)
	return round ? Math.round(value) : value
}

const color = () => {
	return colors[random(0, colors.length - 1, true)]
}

const map = (value, inMin, inMax, outMin, outMax) => {
	return (
		((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
	)
}

const simplex = new SimplexNoise()

const createParticle = (index, x, y, hue, diameter) => {
	let particle = document.createElement('div')
	let particleCSS = particle.style
	particle.classList.add('particle')

	let size = options.organicShape ? diameter : options.maxParticleSize
	let diameter_ = Math.max(options.minParticleSize, size) * options.zoomFactor
	let color_ = options.rainbow ? `hsl(${hue}deg, 60%, 70%)` : color()

	particleCSS.width = `${diameter_}vmin`
	particleCSS.height = `${diameter_}vmin`

	if(options.insetBorders){
		particleCSS.border = `${10 * options.zoomFactor}vmin solid transparent`
		particleCSS.backgroundClip = `border-box`

	}

	if(!options.shadows)
		particleCSS.setProperty('--shadow-opacity', '0')

	if(!options.depth)
		particleCSS.setProperty('--depth-opacity', '0')

	particleCSS.backgroundColor = color_
	particleCSS.color = color_
	particleCSS.borderRadius = options.circles ? '50%' : `${random(10, 50)}%`
	particleCSS.left = `${x}px`
	particleCSS.top = `${y}px`

	let shiftX = random(-100, 100) * options.zoomFactor
	let shiftY = random(-100, 100) * options.zoomFactor
	let delay = `${random(10, 40)}ms`

	particle.style.setProperty('--i', delay);
	particle.style.setProperty('--shiftX', shiftX + 'vmin');
	particle.style.setProperty('--shiftY', shiftY + 'vmin');

	particle.addEventListener('animationend', () => particle.remove())

	return particle
}

const drawParticles = (x, y, hue, d) => {
	let particleCount = random(1, options.maxParticlesPerFrame, true),
	particleFragment = new DocumentFragment()

	for(let i = 0; i < particleCount; ++i)
		particleFragment.appendChild(createParticle(i, x, y, hue, d))

	container.appendChild(particleFragment)
}

const render = time => {
	const noiseX = (simplex.noise2D(0, time * options.noiseFactor) + 1) / 2
	const noiseY = (simplex.noise2D(1, time * options.noiseFactor) + 1) / 2

	const posX = map(noiseX, 0, 1, 0, window.innerWidth)
	const posY = map(noiseY, 0, 1, 0, window.innerHeight)
	const hue = map(noiseX, 0, 1, 0, 360) // hue is essentially based on X axis movement
	const diameter = map(noiseY, 0, 1, 0, options.maxParticleSize) // diameter is essentially based on Y axis movement

	drawParticles(posX, posY, hue, diameter)
	requestAnimationFrame(render)
}

const initControls = () => {
	controls.forEach(control => {
		applyControl(control)
		control.addEventListener('change', () => applyControl(control))
	})
}

const applyControl = control => {
	let optionsPrefix = control.dataset['changes']
	let classPrefix = control.dataset['class']
	let bodyclassList = document.body.classList

	if(optionsPrefix){
		options[optionsPrefix] = !!control.checked
		console.log('=>', optionsPrefix, options[optionsPrefix])
	}
	else{
		if(control.checked)
			bodyclassList.add(classPrefix)
		else
			bodyclassList.remove(classPrefix)

		console.log('=>', classPrefix, [...bodyclassList].indexOf(classPrefix))
	}
}

window.addEventListener('load', () => {
	initControls()
	setTimeout(() => requestAnimationFrame(render), 400)
})

document.querySelector('.controls').addEventListener('mouseover', () => {
	document.body.setAttribute('data-hint-shown', 'yes')
})

/* Made with Coffee, Care, and Curiosity by @ShadowShahriar */