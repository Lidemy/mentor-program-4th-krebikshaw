## 請列出 React 內建的所有 hook，並大概講解功能是什麼

#### 基礎的 Hook
useState
  * 回傳一個 state 的值，以及更新 state 的 function
  * 在首次 render 時，回傳的 state 的值會跟第一個參數一樣
  * 在後續的重新 render，useState 回傳的第一個值必定會是最後更新的 state

useEffect
  * 在元件 render 完執行，可以用來執行具有副作用的函式
  * 在預設情況下，effect 會在每一個完整 render 後執行，但可以利用第二個參數接收一個陣列，用來監控特定的 state，當 state 有改變時才會執行這個 hook
useContext
  * 解決資料需要跨多層元件傳遞的問題，讓父層的資料可以直接在任意的子層元素直接存取，不需要透過中間層的元素幫忙一一傳遞

#### 額外的 Hook
useReducer
  * useState 的替代方案，能自訂邏輯，在不同的條件下時對資料做不同的變化
useCallback
  * 可以記住 Object 的記憶體位址，就可以避免父元件重新渲染後，Object 被重新分配記憶體位址
useMemo
  * 讓 React 記住 function 的回傳值，如果 dependencies array 中的變數都沒有被經過修改，React.useMemo 將會沿用上次的回傳值。
useRef
  * 可以將變數存放在一個固定的物件，改變變數時不會觸發重新 render
  * 即使 React 重新 render，仍可以去取得同一個物件，並取出內部的值來用
useLayoutEffect
  * 它會在所有 DOM 改變後，同步調用。使用它來讀取 DOM layout 並同步重新 render
useDebugValue
  * 用來在 React DevTools 中顯示自訂義 hook 的標籤


## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![](https://i.imgur.com/gDNOsfg.png)
可以分為三個階段：
* Mounting 當元件被加入到 DOM 中時會觸發
* Updateing 當元件的 props 或 state 更新，重新渲染 (re-rendered) DOM 時會觸發
* Unmounting 當元件要從 DOM 中被移除時會觸發

Mounting
* constructor
  * 初始化並建構物件，可以用來綁定 method
* componentWillMount
  * 在第一次的 render 之前執行  
* render
  * 執行第一次的 render
* componentDidMount
  * render 完成後之行

Updateing
* shouldComponentUpdate
  * 預設是回傳 true，如果回傳 false 將會跳過下面的生命週期方法
* componentWillUpdate
  * 在元件準備更新、執行 render 之前被執行
* render
  * 每次 props 或是 state 被改變時，都會被執行一次
* componentDidUpdate
  * 會在元件更新完成、執行完 render 重繪後被執行

Unmounting
* componentWillUnmount
  * component 要被移除的時候會執行此函式，可以做清除綁定 eventlistener，或清除 cookie、local storage 等機制 

## 請問 class component 與 function component 的差別是什麼？
* function component 每次 render 都會重新呼叫一次 function，每一次呼叫的 function 都會是新的 function，props 也是不同的
* class component 可以從 this.props.onChange 拿到最新的屬性，並且在各個生命週期的過程中去執行相應的函式


## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

差異就在資料有沒有被 React 控制
* uncontrolled conponent
  * 當我們有一筆資料會放在 DOM 上，卻又跟畫面是沒關係的，我們希望資料改變時不會重新 render，我們就可以使用 uncontrolled conponent
  * 需要注意，對於檔案上傳用的 `<input type="file" />` 只能透過 Uncontrolled Components 的方式處理
* controlled component
  * 只要資料有變動，畫面就會重新渲染
  * 確保使用者在操作時，資料的內容跟 UI 一致的
