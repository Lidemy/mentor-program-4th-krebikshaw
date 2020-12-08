## Redux middleware 是什麼？
我們可以利用 middleware 在資料流在抵達 reducer 以前來處理一些事情，例如 call api、執行非同步行為，或者錯誤處理等等。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
* CSR（Client-side-rendering）代表畫面上面的內容和資料是在檔案從 Server 端傳送到瀏覽器以後，才由 JavaScript 動態產生的，所以 render 的動作是在 Client 端完成的。
* SSR（Server-side-rendering）是指內容和畫面在 Server 端就已經整理成一個完整的檔案，才傳給 Client 端，所以 render 的動作是在 Server 端完成的。

由於使用 CSR 的方法時，瀏覽器收到的 HTML 網頁原始碼會是空的，這樣會使瀏覽器在分析檔案內容上較為不易，但 SSR 瀏覽器收到的是完整的檔案內容，所以沒有這個問題。

## React 提供了哪些原生的方法讓你實作 SSR？
可以使用 ReactDOMServer 這個 API：
* 包含了兩個實用的函式 renderToString 和 renderToStaticMarkup
* 其主要作用都是將 React Component 轉化為 HTML 的字串
* 這兩個函式都屬於都接受一個 React Component 引數，返回一個String。

1. renderToString：將 React Component 轉化為 HTML 字串，生成的 HTML 的 DOM 會帶有額外屬性：各個 DOM 會有 data-react-id 屬性，第一個 DOM 會有 data-checksum 屬性。

2. renderToStaticMarkup：同樣是將 React Component 轉化為 HTML 字串，但是生成 HTML 的 DOM 不會有額外屬性，從而節省 HTML 字串的大小。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種
1. [Prerender](https://prerender.io/)：Prerender 會把網站 JavaScript 渲染出來的結果存成靜態的 HTML，當搜尋引擎的爬蟲試圖爬我們的網站時，就把之前存的靜態 HTML 回傳給它。
2. [Next.js](https://nextjs.org/)：基於 React 的框架，功能完整且可以支援 SSR。

