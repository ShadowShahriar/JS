const elem = document.querySelector('textarea')
const output = document.querySelector('output')
var debouncetimer = setTimeout(() => {}, 1)

;['mousedown', 'keyup', 'click', 'input'].forEach(evnt => {
	elem.addEventListener(evnt, e => {
		if(debouncetimer)
			clearTimeout(debouncetimer)
	
		debouncetimer = setTimeout(() => {
			findcaret(e)
		}, 100)
	})	
})

function findcaret(e){
	let elem = e.target
	let data = elem.value

	// substract text up to the current caret position.
	let partialselection = data.substr(0, elem.selectionStart)

	// count the line breaks.
	let lines = partialselection.split("\n")
	let linenum = lines.length

	// cache the lines to line array and remove the last item.
	// simplified from https://stackoverflow.com/a/31817625
	let linearray = lines
	linearray.pop()

	// the current caret position (selectionStart) also includes the characters in the current line, 
	// which is great. Finally, we substract the characters in the line array from the current caret 
	// position.
	let remainingcharacters = linearray.join("\n").length

	// if the line number is 1, we want to add a column because we have already removed the last line 
	// in the remainingcharacters, which in this case, the first line as well.
	let colnum = elem.selectionStart - remainingcharacters + (linenum === 1 ? 1 : 0)

	let status = `ln ${linenum}, col ${colnum}, dir ${elem.selectionDirection}`

	// let the user know whether they're selecting the text
	if(elem.selectionStart !== elem.selectionEnd)
		status += `, selected`

	output.innerText = status
}