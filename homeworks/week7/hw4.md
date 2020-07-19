## 什麼是 DOM？
* DOM 全名為 Document Object Model
* 就是把 HTML 的標記（ Document ） 轉換成物件( Object )。

JavaScript 可以操作物件，但不能直接操作頁面上的標籤，所以 DOM 就是瀏覽器幫 object 轉換成 HTML 對應的標記，進而讓 JS 可以改變到頁面的元素。也就是說「DOM 就是 JS 跟 HTML 溝通的橋樑。」

理論上能操控 object 的程式語言都可以透過 DOM 把 object 轉換成 HTML 對應的標記，但是因為瀏覽器只能看得懂 JavaScript，所以目前扔然以 JavaScript 作為操控前端頁面的程式語言。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
* DOM 的事件在傳播時，會先從根節點開始往下傳遞到 target，再往上從子節點一路逆向傳回去根節點。這段過程中共分為三個階段：

捕獲：
* 從根節點開始往下傳遞到 target 的過程
* 以點選 `<td>` 標籤為例，事件得傳遞可能會像這樣：
  * window => document => <html> => <body> => <table> => <tbody> => <tr>

目標本身：
* 事件傳遞到目標本身 
* 不會分捕獲或冒泡
* 以點選 `<td>` 標籤為例，事件傳遞就在目前這個目標 `<td>` 本身  

冒泡：
* 從子節點一路逆向傳回去根節點的過程
* 以點選 `<td>` 標籤為例，事件得傳遞可能會像這樣：
  * <tr> => <tbody> => <table> => <body> => <html> => document => window

如下圖所示：
![](https://static.coderbridge.com/img/techbridge/images/huli/event/eventflow.png)
[圖片來源](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)


* 整個傳遞機制的流程就是：
  * 捕獲 => 目標本身 => 冒泡

**注意：捕獲與冒泡是「無論如何」都會發生的，只是沒有加監聽器我們就察覺不到了。當點擊某個按鈕時，就會先從 window 一路把事件傳遞下去，再從按鈕一路把事件傳遞回來。雖然我們可以決定要在哪個階段加上 eventListener，但是永遠不會改變事件傳遞的順序。**


## 什麼是 event delegation，為什麼我們需要它？
如果我們要把非常大量的「按鈕」加上監聽器，我們可以手動一個一個加，或者利用迴圈幫忙加上去。

但是我們有更方便的作法，就是把監聽器加在這些按鈕共同的「父層元素」。因為事件的傳遞從根節點到 target 的過程一定會經過這個「父層元素」。（上面有提到捕獲與冒泡是「無論如何」都會發生的，且事件的傳遞順序永遠不會改變。）這種由父層元素協助監聽的方式，就叫做「事件代理」。

* 比起手動一個一個加上監聽器，事件代理的效率更高
* 在這個父層元素底下動態新增的子元素，也可以一併綁定到 eventListener


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

e.preventDefault() 阻止預設行為
阻止瀏覽器上的特定元素在該事件預設的行為，例如下列情況：

* <form> 的 submit ： 阻止送出表單
* <a> 的 click 事件 ： 阻止跳網址
* <input> 的 keypress 事件 ： 阻止輸入按鍵

e.stopPropagation() 阻止事件傳遞給「下一個節點」
* 阻止捕獲
![](https://static.coderbridge.com/img/krebikshaw/a9dd0309a17b41d3b05695385d52d6f0.png)
我們可以看到，事件只傳到 .outer 就停止了，不會傳遞到下一個節點(inner)

* 阻止冒泡
![](https://static.coderbridge.com/img/krebikshaw/a9e1924a5b924d05b379a21f0f74371b.png)
我們可以看到，事件只傳到 btn 就停止了，不會傳遞到下一個節點
