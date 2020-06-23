function reverse(str) {
	var result = ""
	for(var i=str.length-1; i>=0; i--){
		result += str[i]
	}
	console.log(result)
}

reverse('hello');


/*
反轉字串

執行流程：
1. 執行第 1 行，定義函式 reverse()，開始尋找是否有被呼叫
2. 執行第 9 行，呼叫函式 reverse()，傳入字串 "hello"
3. 執行第 1 行，reverse()，接收字串 "hello"
4. 執行第 2 行，設定變數 result 為空字串 ""
5. 執行第 3 行，設定變數 i 為 str.length-1: 4，檢查 i 是否大於等於 0，是，開始第一圈迴圈
6. 執行第 4 行，讓變數 result 等於 result 加上 str[4]: o ，result 會變成 "o"
7. 第一圈迴圈結束，回到第 3 行，i-- i 變成 3，檢查 i 是否大於等於 0，是，開始第二圈迴圈
8. 執行第 4 行，讓變數 result 等於 result 加上 str[3]: l ，result 會變成 "ol"
9. 第二圈迴圈結束，回到第 3 行，i-- i 變成 2，檢查 i 是否大於等於 0，是，開始第三圈迴圈
10. 執行第 4 行，讓變數 result 等於 result 加上 str[2]: l ，result 會變成 "oll"
11. 第三圈迴圈結束，回到第 3 行，i-- i 變成 1，檢查 i 是否大於等於 0，是，開始第四圈迴圈
12. 執行第 4 行，讓變數 result 等於 result 加上 str[1]: e ，result 會變成 "olle"
13. 第四圈迴圈結束，回到第 3 行，i-- i 變成 0，檢查 i 是否大於等於 0，是，開始第五圈迴圈
14. 執行第 4 行，讓變數 result 等於 result 加上 str[0]: h ，result 會變成 "olleh"
15. 第二圈迴圈結束，回到第 3 行，i-- i 變成 -1，檢查 i 是否大於等於 0，不是，跳出迴圈
16. 執行第 6 行，印出 result: "olleh"
17. 跳出函式 reverse()
18. 執行結束
*/