## 請以自己的話解釋 API 是什麼
API 就是一段網址，只要照著對方要求的規格來輸入正確的網址，就能取得對方提供的資料。配合 HTTP 協定的規範，就可以達成更多資料交換的功能。

#### Server 要求的規格是什麼？
依據 Server 功能的不同，會要求的規格也會不同。
拿 Twitch 這個遊戲直播平台來舉例，他們有提供其中一項 **熱門遊戲查詢** 的功能。
只要輸入這段網址 `https://api.twitch.tv/kraken/games/top` 他就會依照熱門程度來提供遊戲資料給你。

除了這段規定的網址以外，Server 還說你可以加上條件來決定要你想列出前幾熱門的遊戲，只要在網址後面加上 `limit=<你想列出的數量>` ，例如我希望列出前十熱門的遊戲，網址就會變成這樣 `https://api.twitch.tv/kraken/games/top?limit=10` 。

其他像是訂房網站啦，可能就會讓你輸入指定網址來取得訂房資訊，加上條件或許能列出某某地區，某某時間或其他條件下查詢的結果。這些功能都是依據 Server 所提供給我們的，它提供哪些功能，我們就只能使用這些功能，Server 不會提供的，像是查詢會員帳密、任意更改其他會員資料、查詢別人手機號碼等等功能，這些功能就無法使用。

Server 可以自由決定要讓使用者獲取哪些資訊，並且要提供使用者一份明確的 API 文件，使用者才會曉得如何透過 API 來取得 Server 提供的資料。

#### Server 提供的資料是什麼？
Server 會提供的就是它們資料庫有的資料，以遊戲直播平台來說，提供的就是與遊戲直播相關的訊息，熱門遊戲、熱門主播、遊戲頻道資訊、遊戲討論資訊...。若是訂房網站，提供的就會是與房間相關的資訊，價格、地點、房型、交通...等等。

你會發現！這些其實跟你實際去這些網站上會查到的資料差不多啊。因為不論是從它們網站上查詢，還是用 API 去取得 Server 的資料，都是存取相同的資料庫，所以網站上面顯示的資料內容，跟 API 提供的資料，才會大同小異。

#### HTTP 協定的規範是什麼？
依據 request 功用的不同，有查詢、新增、修改或者是刪除，稱為「 Request Method 」，是為了讓 Server 能夠清楚辨別 request 的目的。
舉個例子來說：

`GET`：單純的跟 server 要一個連結或圖片，通常網頁都是 Get 的 request 比較多（獲取、查詢 或 檢索 (retrieval)）

* 例如要去某個網址、看某張圖片

`POST`：需要執行一些動作時（遞交、新增 或 發佈），會傳送 Post 的 request

* 例如登入會員
* 遞交 一個 資料區塊 (表單)。
在 公告欄、討論區 或 部落格…，發佈 訊息 or 文章。
新增 或 建立 資源至 Server
* 獲取「 指定的 」資訊，放在 request body ( Form data ) 裡面

`PUT`：修改掉整個 request
`PATCH`：修改掉部分 request
`DELETE`：刪除資料

看了上面的例子，你會發現 Request Method 就有點像 **動詞** 新增、修改或者是刪除，這些動作就能讓我們達成更多資料交換的功能。

比如說：
POST https://api.xxxxxx.tw/api 可以讓你`新增`一筆新的資料
PATCH https://api.xxxxxx.tw/api/01 可以讓你`修改` id = 01 的資料
DELETE https://api.xxxxxx.tw/api/01 可以讓你`刪除` id = 01 的資料


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
官方的 HTTP status code
`418 I'm a teapot`: 我是個茶壺，你幹嘛拿我來泡咖啡？
`431 Request Header Fields Too Large`: 伺服器不願意處理該請求，因為標頭欄位過大。該請求可能可以在減少請求標頭欄位大小後重新提交。
`451 Unavailable For Legal Reasons`: 用戶端請求違法的資源，例如受政府審查的網頁。

非官方的 HTTP status code
`718 I am not a teapot`: 我不是一個茶壺
`764 Over-Caffeinated`: 太多咖啡因了
`799 End of the world`: 世界末日

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

#### Restaurant API
> 最新版本： v3.0

Restaurant API 為幫助開發者，獲取及使用全台的餐廳資料，如果需要進行新增、刪除、更改資料的功能，必須要先申請 token 以獲得權限。

#### 使用說明
| 說明     | Method | token  | path       | 參數                 |
|--------|--------|---------|----------|----------------------|
| 獲取所有餐廳 | GET |  | /restaurant | _limit:限制回傳資料數量，上限 100  |
| 獲取單一餐廳 | GET   |  | /restaurant/:id | 無  |
| 新增餐廳   | POST   | 必須 | /restaurant | name: 餐廳名 |            
| 刪除餐廳   | DELETE | 必須 | /restaurant/:id  | 無 |   
| 更改餐廳資訊| PATCH   | 必須 | /restaurant/:id  | name: 餐廳名 |  


#### Request 參數說明
* `_limit`: int
* `name`: string

#### Get Start
Base URL: `https://restaurant.com`

**Example GetResturant Request**
你可以選擇其中一種方式，獲得前 3 家餐廳的資料。
1. 於終端機使用 curl 發 request
```
curl -X GET "https://restaurant.com/restaurant?_limit=3"
```

2. 在 Node.js 環境下，使用 npm 套件：`request` 發送 HTTP request
```
const request = require('request');
request.get(
  'https://restaurant.com/restaurant?_limit=3', (error, response, body) => {
    console.log(JSON.parse(body));
  },
);
```

**Example GetResturant Response**
 **Response 欄位說明**
 * id: 餐廳編號
 * name: 餐廳名稱
 * phone: 餐廳電話
 * address: 餐廳地址
 * price: 餐廳價位

 ```
[
  {
    "id": "1",
    "name": "Just Happy Pizza",
    "phone": "0987123456",
    "address": "台北市好好吃街25號",
    "price": "$$$$$$$$$$"
  },
  {
    "id": "2",
    "name": "Good To Eat Bistro",
    "phone": "0971234856",
    "address": "台北市吃不飽街1號",
    "price": "$"
  },
  {
    "id": "3",
    "name": "Not Awesome at all Bakery",
    "phone": "0934567890",
    "address": "台北市掰不下去街10號",
    "price": "$$$$$"
  },
]
 ```
