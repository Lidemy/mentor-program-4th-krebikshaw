請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

輸出結果：
```
i: 0
i: 1
i: 2
i: 3
i: 4
5 ( 等 i 印完出現 )
5 ( 大約一秒後 )
5 ( 大約二秒後 )
5 ( 大約三秒後 )
5 ( 大約四秒後 )
```

程式開始執行，將 main() 放進 call stack

#### 執行第一圈迴圈: i = 0

將 `console.log('i: ' + i)` 放進 call stack
執行 `console.log('i: ' + i)` 印出 i: 0 之後 call stack pop off
將 `setTimeout` 放進 call stack 
因為 `setTimeout` 是非同步函式，所以會移進 Web API 等待時間到
等待時間為 0 * 1000 = 0ms，將 `() => { console.log(i)}` 放進 Queue
此時因為 call stack 裡也有任務正在執行，所以先在 Queue 裡面等待

#### 執行第二圈迴圈: i = 1

將 `console.log('i: ' + i)` 放進 call stack
執行 `console.log('i: ' + i)` 印出 i: 1 之後 call stack pop off
將 `setTimeout` 放進 call stack 
因為 `setTimeout` 是非同步函式，所以會移進 Web API 等待
等待時間為 1 * 1000 = 1000ms，等時間到之後將 `() => { console.log(i)}` 放進 Queue 

#### 執行第三圈迴圈: i = 2

將 `console.log('i: ' + i)` 放進 call stack
執行 `console.log('i: ' + i)` 印出 i: 2 之後 call stack pop off
將 `setTimeout` 放進 call stack 
因為 `setTimeout` 是非同步函式，所以會移進 Web API 等待
等待時間為 2 * 1000 = 2000ms，等時間到之後將 `() => { console.log(i)}` 放進 Queue 

#### 執行第四圈迴圈: i = 3

將 `console.log('i: ' + i)` 放進 call stack
執行 `console.log('i: ' + i)` 印出 i: 3 之後 call stack pop off
將 `setTimeout` 放進 call stack 
因為 `setTimeout` 是非同步函式，所以會移進 Web API 等待
等待時間為 3 * 1000 = 3000ms，等時間到之後將 `() => { console.log(i)}` 放進 Queue

#### 執行第五圈迴圈: i = 4

將 `console.log('i: ' + i)` 放進 call stack
執行 `console.log('i: ' + i)` 印出 i: 4 之後 call stack pop off
將 `setTimeout` 放進 call stack 
因為 `setTimeout` 是非同步函式，所以會移進 Web API 等待
等待時間為 4 * 1000 = 4000ms，等時間到之後將 `() => { console.log(i)}` 放進 Queue

#### 第五圈迴圈結束 i++，i = 5 因為不符合 i < 5 所以跳出迴圈

#### `main()` 結束， call stack pop off

#### Event Loop 偵測 call stack 清空了

把 Queue 排在第一個的 `() => { console.log(i) }` 放進 call stack
將 `console.log(i)` 放到 call stack 上方
執行 `console.log(i)`  印出 5 之後 call stack pop off
`() => { console.log(i) }` 結束，call stack pop off

####（ 約略 1 秒後 ）第二圈迴圈的 setTimeout 時間到

`() => { console.log(i) }` 移到 Callback Queue
因為 call stack 已清空，所以 `() => { console.log(i) }` 直接放到 call stack
將 `console.log(i)` 放到 call stack 上方
執行 `console.log(i)`  印出 5 之後 call stack pop off
`() => { console.log(i) }` 結束，call stack pop off

#### (每隔一秒) ... 重複以上步驟直到 Callback Queue 跟 Call Stack 都清空，程式結束
