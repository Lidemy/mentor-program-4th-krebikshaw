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

console.log(capitalize('nick'));


/*
首字母大寫

執行流程：
1. 執行第 1 行，定義函式 capitalize()，開始尋找是否有被呼叫
2. 執行第 14 行，呼叫函式 capitalize()，傳入字串 "nick"
3. 執行第 1 行，capitalize()，接收字串 "nick"
4. 執行第 2 行，設定變數 result 為空字串 ""
5. 執行第 3 行，判斷 str[0]: n 是否介於 a ~ z 之間，是，
   讓變數 result 等於 result 加上轉換為大寫的 atr[0]: n ，
   result 會變成 "N"
6. 執行第 8 行，設定變數 i 為 １，檢查 i 是否小於 str.length: 4，是，開始第一圈迴圈
7. 執行第 9 行，讓變數 result 等於 result 加上 str[1]: i ，result 會變成 "Ni"
8. 第一圈迴圈結束，回到第 8 行，i++ i 變成 2，檢查 i 是否小於 str.length: 4，是，進入第二圈迴圈
9. 執行第 9 行，讓變數 result 等於 result 加上 str[2]: c ，result 會變成 "Nic"
10. 第二圈迴圈結束，回到第 8 行，i++ i 變成 3，檢查 i 是否小於 str.length: 4，是，進入第三圈迴圈
11. 執行第 9 行，讓變數 result 等於 result 加上 str[3]: k ，result 會變成 "Nick"
12. 第三圈迴圈結束，回到第 8 行，i++ i 變成 4，檢查 i 是否小於 str.length: 4，不是，跳出迴圈
13. 執行第 11 行，回傳 result： "Nick"，跳出函式 capitalize()
14. 執行 14 行，印出回傳的 result: "Nick"
15. 執行結束
*/

 

