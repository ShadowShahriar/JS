// This code (CSS/JS) was written exactly 1 year ago (13 07 2020) by a novice, and it was me. Now I put the code here for historical purposes.

var colors = [
	'rgb(0,190,255)',
	'rgb(255,255,255)',
	'rgb(0,160,255)',
	'orange',
	'rgb(240,245,250)',
	'rgb(230,60,0)'
];

var cont = document.querySelector("#container");

function random(min, max, round)
{
	var p = min + Math.random() * (max - min);
	return round ? Math.round(p) : p;
}
	
function comet()
{
	var e = window.event,
	x = e.pageX || e.clientX,
	y = e.pageY || e.clientY;

	rnd = random(1, 9, true);

	for (var i = 0; i < rnd; i++)
	{
		var pp = document.createElement("div");
		pp.className = 'particle';

		// size
		var d = random(10, 60);
		pp.style.width = d + "px";
		pp.style.height = d + "px";

		pp.style.left = x + random(-15, 15) - d / 2 + "px";
		pp.style.top = y + random(-15, 15) - d / 2 + "px";

		which_color = random(0, colors.length - 1, true);
		pp.style.backgroundColor = colors[which_color];
		pp.style.borderRadius = random(10, 50) + "%";

		shiftX = random(-100, 100);
		shiftY = random(-100, 100);

		delay = random(10, 40) / 1000 + 's';

		pp.style.setProperty('--i', delay);
		pp.style.setProperty('--shiftX', shiftX + 'px');
		pp.style.setProperty('--shiftY', shiftY + 'px');

		pp.addEventListener('animationend', function () {
			this.outerHTML = "";
		});

		pp.addEventListener('webkitAnimationEnd', function () {
			this.outerHTML = "";
		});

		cont.appendChild(pp);
	}
}