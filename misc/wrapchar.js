let string = "01234567890"

// Wrap a specific character in a string with JavaScript
// There two methods to approach this problem - split and substring.
// I have benchmarked both code blocks with the string above and 
// found that the substring method is faster* than the split one.

// recent - https://jsben.ch/RxWKO
// old - https://jsben.ch/k7WbY

/* === #1 Wrap character with split */
// function wrapchar(at){
// 	let chararray = string.split("")
// 	chararray[at] = `<span>${chararray[at]}<\/span>`
// 	return chararray.join("")
// }

/* === #2 Wrap character with substring */
function wrapchar(at){
	let start = string.substring(0, at)
	let target = `<span>${string.substring(at, at + 1)}<\/span>`
	let end = string.substring(at + 1)
	let html = start + target + end

	return html
}

// test
// wrapchar(8)