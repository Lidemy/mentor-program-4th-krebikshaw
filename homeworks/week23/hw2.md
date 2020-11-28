## 為什麼我們需要 Redux？
Redux 是一個 state 的管理工具，使我們利於追蹤資料的變動，當我們把需要被其他元件共用到的狀態會放到 store 裡面去，當我們想查看 state 變動的細節時，可以清楚的知道狀態為何被更新而且如何被更新。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
### Actions
用來描述要改變的資料類型以及內容，傳遞給 Reducer 進行資料處理，在實作中其實意指 action creator，它回傳一個物件，物件中會有事件名稱 (type) 與攜帶的資料 (payload)
### Reducers
負責處理收到的 actions，依照 action.type 決定要用哪個邏輯來改變狀態，再依照 action.payload 來改變狀態內容
### Store
紀錄狀態的地方

### Redux 資料流
觸發事件 -> Action creator 回傳物件並發送到 Store -> Reducer 根據 type 及 payload 來改變 state ->  React 更新 UI

## 該怎麼把 React 跟 Redux 串起來？
![](https://i.imgur.com/ZBCdQq4.jpg)
React-redux 就是把 Redux 的 state 給自動綁定到 component 的 props，也順便把 dispatch 一起傳進去，把 React 跟 Redux 給綁在一起

串連 React 及 Redux 的重點，在於事件如何從 React 傳進去 Redux，以及如何把狀態從 Redux 撈回來 React：
* useDispatch() 會直接回傳一個 dispatch 方法，可以直接透過它觸發 Reducer 將 action 傳進去
* useSelector() 可以從 Store 中，將 Component 需要的 State 取出 
* 剩下中間的過程，就是由 Redux 的資料流來做處理

只要在 React 的 App 加上 Provider 把 Store 傳進去，就可以利用 useSelector 跟 useDispatch 將 React 及 Redux 串起來。 
