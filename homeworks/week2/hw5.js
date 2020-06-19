function join(arr, concatStr) {
	var result = arr[0].toString()
	for(var i=1; i<arr.length; i++){
		result += concatStr
		result += arr[i]
	}  
	return result
}

function repeat(str, times) {
	var result = ""
	for(var i=0; i<times; i++){
		result += str
	}
	return result
}

console.log(join(["a"], '!'));
console.log(repeat('a', 5));
