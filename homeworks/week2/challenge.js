function search(arr, n){
	var left = 0
	var right = arr.length - 1
	var middle = Math.floor((left + right)/2)

	while(left <= right){
		if(arr[middle] === n){
			return middle
		}else if(arr[middle] < n){
			left = middle + 1
		}else if(arr[middle] > n){
			right = middle - 1
		}
		middle =  Math.floor((left + right)/2)
	}
	return -1
}

console.log(search([1, 3, 10, 14, 39], 14))
console.log(search([1, 3, 10, 14, 39], 299))