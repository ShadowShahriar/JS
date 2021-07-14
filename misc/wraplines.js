var string = `Hey!

I'm talking to you.

Can you hear me
No?
`

// Wrap lines with JavaScript
// There are two methods to solve this problem - 
// => split + join (golfed)
// => split + forEach + join
// I have benchmarked both code blocks and found that
// split + join function is ~47% faster than the latter one.

// https://jsben.ch/MGVtK
// https://jsben.ch/Oou8u

// == split + forEach + join
// function wraplines(txt, cls, tag = 'div'){
// 	let lines = txt.split('\n')
// 	let linesarray = []
// 	lines.forEach(line => linesarray.push(`<${tag}${cls ? ` class='${cls}'` : ''}>${line}</${tag}>`))
// 	return linesarray.join('\n')
// }


// == split + join
function wraplines(txt, cls, tag = 'div'){
	return tagstart = `<${tag}${cls ? ` class='${cls}'` : ''}>`, tagend = `</${tag}>`, 
	`${tagstart}${txt.split('\n').join(`${tagstart}${tagend}`)}${tagend}`
}

// == test
// wraplines(string)