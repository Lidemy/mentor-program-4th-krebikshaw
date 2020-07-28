## 什麼是 Ajax？
* 全名為 Asynchronous JavaScript and XML
* Asynchronous 這個單字指的是「非同步」
* 任何非同步與 Server 交換資料的 JavaScript 方式都可以叫做 Ajax

同步與非同步的差別：
* 非同步：
  * 頁面的其他程式並不會停下來，等拿到 response 才繼續執行 callback
* 同步：
  * 在拿到 response 之前，使用者不能對該頁面做任何的存取，頁面會被阻塞。

Ajax 流程：
* 瀏覽器發送一個 帶上參數 的 request 到 一個新的頁面
* 然後將 Server 回傳的 「 response 傳給頁面上的 JS 」

## 用 Ajax 與我們用表單送出資料的差別在哪？
* 以畫面來說，Ajax 不會像表單一樣有「換頁問題」
* 以資料來說，表單並不存在跨域問題。因為相對於 Ajax，表單送出後刷新頁面，原本頁面的 JS 並沒有辦法拿到 response 的內容，是個相對安全的方法，所以瀏覽器沒有限制跨域。而 Ajax 會將 Server 回傳 的 response 先經過 JavaScript 才會傳給瀏覽器，所以會多出安全上的風險，因此 Ajax 會有跨域問題

## JSONP 是什麼？
* 全名叫做 JSON with Padding
* JSONP 利用 src 不受同源限制的特性，直接載入一隻帶參數的js，當作是發 request，用一個 function 包裝起來。

* 但 JSONP 要帶的那些參數「永遠都只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST 」。而且使用 JSONP 傳送資料，也要 Server 端有提供 JSONP 的方法（ 意指用 callback function 包起來 ）才行，不然回傳的 Response 就只是字串而已，沒有辦法取得資料


## 要如何存取跨網域的 API？
Server 端：
* CORS 跨來源資源共用
  * 在 response 的 header 加上 `Access-Control-Allow-Origin` 來允許其他網域的 request 存取
* 架設一個開放 CORS 的 Server

Client 端：
* 使用 JSONP
* 透過非瀏覽器的方式來發送 request

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為跨網域問題只有在透過瀏覽器發送 request 的時候才會有，第四週是在 node.js 環境下發 request，並沒有瀏覽器這層限制。

