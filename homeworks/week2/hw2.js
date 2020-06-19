function capitalize(str) {
	var result = ""
	if(str[0] >= "a" && str[0] < "z"){
		result += str[0].toUpperCase()
	} else {
		result += str[0]
	}
	for(var i=1; i<str.length; i++){
		result += str[i]
	}
	return result
}

console.log(capitalize('hello'));



