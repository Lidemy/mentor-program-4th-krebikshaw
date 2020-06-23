const fun = {
	and: (a,b) => a && b,
	or: (a,b) => a || b,
	xor: (a,b) => a ^ b
}


function fullAdder(a,b,c){
	return {
		c: fun.or(fun.and(fun.xor(a,b),c),fun.and(a,b)),    // c 指的是進位
		s: fun.xor(fun.xor(a,b),c)                          // s 指的是加總
	}
}

function adder4(a,b,c){            // 4-bit 加法器
	var adder_1 = fullAdder(a[3], b[3], c),
	    adder_2 = fullAdder(a[2], b[2], adder_1.c),
	    adder_3 = fullAdder(a[1], b[1], adder_2.c),
	    adder_4 = fullAdder(a[0], b[0], adder_3.c);
	return {
		s: [adder_4.s, adder_3.s, adder_2.s, adder_1.s].join(""),
		c: adder_4.c
	}    
}

function adder16(a,b,c){          // 16-bit 加法器 由 4 個 4-bit 加法器組成
	var adder_1 = adder4(
			[a[12],a[13],a[14],a[15]],
			[b[12],b[13],b[14],b[15]],
			c
		),
		adder_2 = adder4(
			[a[8],a[9],a[10],a[11]],
			[b[8],b[9],b[10],b[11]],
			adder_1.c
		),
		adder_3 = adder4(
			[a[4],a[5],a[6],a[7]],
			[b[4],b[5],b[6],b[7]],
			adder_2.c
		),
		adder_4 = adder4(
			[a[0],a[1],a[2],a[3]],
			[b[0],b[1],b[2],b[3]],
			adder_3.c
		)
	return {
		s: [adder_4.s, adder_3.s, adder_2.s, adder_1.s].join(""),
		c: adder_4.c
	}	
}

function transform(num){         // 把輸入的數字，轉成 16-bit 的二進位陣列
	var arr = num.toString("2").split("")

	while(arr.length < 16){
		arr.unshift('0')
	}
	return arr
}


function add(a,b){               // 加法
	var num1 = transform(a),
		num2 = transform(b)
	var ans = adder16(num1, num2, '0')
	return parseInt(ans.s, 2)
}


//  測資
console.log(add(15, 20))
console.log(add(1, 4))
console.log(add(8, 7))
console.log(add(16, 25))
console.log(add(27, 38))
console.log(add(70, 87))

