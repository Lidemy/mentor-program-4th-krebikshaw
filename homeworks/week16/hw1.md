請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

輸出結果：
```
1
3
5
2
4
```

程式開始執行，將 main() 放進 call stack

#### line 1: `console.log(1)`

把 `console.log(1)` 放進 call stack
執行 `console.log(1)` 印出 1 之後 call stack pop off

#### line 2-4: `setTimeout(() => { console.log(2) }, 0)`

把 `setTimeout` 放進 call stack
因為 `setTimeout` 是非同步函式，所以會移進 Web API 等待時間到
經過 0 ms 之後，將 `() => { console.log(2)}` 放進 Queue 
此時因為 call stack 裡也有任務正在執行，所以先在 Queue 裡面等待

#### line 5: `console.log(3)`

把 `console.log(3)` 放進 call stack
執行 `console.log(3)` 印出 3 之後 call stack pop off

#### line 6-8: `setTimeout(() => { console.log(4) }, 0)`

把 `setTimeout` 放進 call stack
因為 `setTimeout` 是非同步函式，所以會移進 Web API 等待時間到
經過 0 ms 之後，將 `() => { console.log(4)}` 放進 Queue 
此時因為 call stack 裡也有任務正在執行，所以先在 Queue 裡面等待

#### line 9: `console.log(5)`

把 `console.log(5)` 放進 call stack
執行 `console.log(5)` 印出 5 之後 call stack pop off

#### `main()` 結束， call stack pop off

#### Event Loop 偵測 call stack 清空了

把 Queue 排在第一個的 `() => { console.log(2) }` 放進 call stack
將 `console.log(2)` 放到 call stack 上方
執行 `console.log(2)`  印出 2 之後 call stack pop off
`() => { console.log(2) }` 結束，call stack pop off

#### Event Loop 偵測 call stack 清空了

把 Queue 排在第二個的 `() => { console.log(4) }` 放進 call stack
將 `console.log(4)` 放到 call stack 上方
執行 `console.log(4)`   印出 4 之後 call stack pop off
`() => { console.log(4) }` 結束，call stack pop off

#### call stack 跟 Event Loop 都已經清空，程式結束
