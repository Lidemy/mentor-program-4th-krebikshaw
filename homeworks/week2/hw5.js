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


/*

join() 接收兩個參數：一個陣列跟一個字串，會在陣列的每個元素中間插入一個字串，
最後回傳合起來的字串。

join() 的執行流程：
1. 執行第 1 行，定義函式 join()，開始尋找是否有被呼叫
2. 執行第 18 行，呼叫函式 join()，傳入引數(["a", "b", "c"],"!")
3. 執行第 1 行，join()，接收(["a", "b", "c"],"!")
4. 執行第 2 行，設定變數 result 為轉變為字串的 arr[0]: "a"，此時的 result 會是 "a"
5. 執行第 3 行，設定變數 i 為 1，檢查 i 是否小於 arr.length: 3，是，開始第一圈迴圈
6. 執行第 4 行，讓 result 等於 result 加上 concatStr: "!"，result 會變成 "a!"
7. 執行第 5 行，讓 result 等於 result 加上 arr[1]: "b"，result 會變成 "a!b"
8. 第一圈迴圈結束，回到第 3 行，i++ i 變成 2，檢查 i 是否小於 arr.length: 3，是，進入第二圈迴圈
9. 執行第 4 行，讓 result 等於 result 加上 concatStr: "!"，result 會變成 "a!b!"
10. 執行第 5 行，讓 result 等於 result 加上 arr[2]: "c"，result 會變成 "a!b!c"
11. 第二圈迴圈結束，回到第 3 行，i++ i 變成 3，檢查 i 是否小於 arr.length: 3，不是，跳出迴圈
12. 執行第 7 行，回傳 result: "a!b!c"，並跳出函式 join()
13. 執行第 18 行，印出 join() 回傳的結果："a!b!c"

repeat() 回傳重複 n 次之後的字串

repeat() 的執行流程：
1. 執行第 10 行，定義函式 repeat()，開始尋找是否有被呼叫
2. 執行第 19 行，呼叫函式 repeat()，傳入引數 ('a', 5)
3. 執行第 10 行，repeat()，接收('a', 5)
4. 執行第 11 行，設定變數 result 為空字串 ""
5. 執行第 12 行，設定變數 i 為 0，檢查 i 是否小於 times： 5，是，開始第一圈迴圈
6. 執行第 13 行，讓 result 等於 result 加上 str: 'a'， result 會變成 "a"
7. 第一圈迴圈結束，回到第 12 行，i++ i 變成 1，檢查 i 是否小於 times： 5，是，進入第二圈迴圈
8. 執行第 13 行，讓 result 等於 result 加上 str: 'a'， result 會變成 "aa"
9. 第二圈迴圈結束，回到第 12 行，i++ i 變成 2，檢查 i 是否小於 times： 5，是，進入第三圈迴圈
10. 執行第 13 行，讓 result 等於 result 加上 str: 'a'， result 會變成 "aaa"
11. 第三圈迴圈結束，回到第 12 行，i++ i 變成 3，檢查 i 是否小於 times： 5，是，進入第四圈迴圈
12. 執行第 13 行，讓 result 等於 result 加上 str: 'a'， result 會變成 "aaaa"
13. 第四圈迴圈結束，回到第 12 行，i++ i 變成 4，檢查 i 是否小於 times： 5，是，進入第五圈迴圈
14. 執行第 13 行，讓 result 等於 result 加上 str: 'a'， result 會變成 "aaaaa"
15. 第五圈迴圈結束，回到第 12 行，i++ i 變成 5，檢查 i 是否小於 times： 5，不是，跳出迴圈
16. 執行第 15 行，回傳 result： "aaaaa"，並跳出函式 repeat()
17. 執行第 19 行，印出 repeat() 回傳的結果： "aaaaa"
*/