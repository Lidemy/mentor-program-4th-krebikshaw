## 教你朋友 CLI

## 在開始操作 CLI 之前，我們要先了解：
1. **Command Line 是什麼?**
Command Line 是一種用指令跟電腦做溝通的方式。不像我們一般在視窗操作的時候，會使用滑鼠點選按鈕或功能來操控程式，使用 Command Line 的時候，電腦只認識指令，要用電腦看得懂的語言來與電腦做溝通。

2. **為什麼要使用 Command Line?**
若是我們要開發網站，往往需要租一台 Server 來使用，當我們連線到 Server 的時候，他是沒有視窗給你點選的，不會有按鈕也不會有介面給你操作。這個時候只能使用 Command Line 來做溝通。

3. **Command Line 會用在哪裡？**
當我們遇到的軟體或服務，只提供 Command Line 來使用時，你就只能藉由 Command Line 來操作。不論是操控自己的電腦，或是從網際網路與外界私服器連線，都可以使用 Command Line。

## 環境建置
若使用 Mac 來操作，推薦使用 Command Line Tool - iTerm2
可以參考[超簡單！十分鐘打造漂亮又好用的 zsh command line 環境](https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f)

## 基本指令介紹

`pwd`: 印出目前位置 
* Print Working Directory 

`ls`：列出檔案清單 
* List
* 補充：
  * `ls -al`：列出檔案細節
  ![](https://static.coderbridge.com/img/krebikshaw/634d936b1821499197dad8b5667c350f.png)

`cd`：切換資料夾 
* Change Directory
* 補充：
  * `cd ..`：回到上一層資料夾 
  * `cd ~`：回到根目錄
![](https://static.coderbridge.com/img/krebikshaw/b7f951536b5a4272a2686387e7932e20.png)

* 小技巧
  * `cd 空格` 加資料夾名稱的開頭幾個單字，按下 tab 會自動補完資料夾名稱。
  * `cd 空格` 加上 tab，會自動顯示底下可以選擇的子資料夾。
 


`man`：指令使用手冊
* Manual
* 當你不曉得某個指令有哪些參數可以使用時，可以用`man`
* 例如：`man ls`會出現 `ls`的規範
  ![](https://static.coderbridge.com/img/krebikshaw/38985653e7ad41f6abc47039b6b5624c.png)

## 檔案操作相關指令

`touch`：修改檔案時間 or 建立檔案
* 使用方式：`touch 檔案名稱`
1. 功能一：若 touch 一個現有的檔案，則會將檔案時間修改為現在時間。
2. 功能二：若 touch 一個不存在的檔案，則會新建一個新的檔案。
![](https://static.coderbridge.com/img/krebikshaw/5a80a188f4054072a98a63c5fbb6e2a0.png)

`rm`：刪除檔案 or 資料夾
* Remove
* 若是想刪除檔案，可以使用：
  * `rm file`
* 若是想刪除 folder 資料夾有兩種做法：
  1. `rmdir folder` : 資料夾內若有東西，會跳出錯誤訊息，告訴你資料夾不是空的，所以不能刪除
  2. `rm -r folder` : `-r` 不論資料夾是不是空的，直接刪除資料夾及資料夾底下所有檔案，需謹慎使用！
 
`mkdir`：新建資料夾
* Make Directory
* 使用方式： `mkdir 資料夾名稱`

`mv`：移動檔案 or 重新命名
* Move
* 使用方式：
  1. 功能一：將檔案移動到其他資料夾底下
    * 舉例： `mv file folder` : 把 file 這個檔案移動到 folder 資料夾底下
    * 檔案 folder 路徑分為 ：相對路徑 or 絕對路徑
      1. 相對路徑：相對於當下所在的資料夾 （我已經在ＯＯ國中裡，我只要輸入幾班就可以找到了人）
        * `mv file folder`
      2. 絕對路徑：以根目錄為標準，通常以 / 為開頭 （我可能在別的縣市，我要輸入完整的學校地址才找得到人）
        * `mv file /Users/Desktop/folder`
  2. 功能二：找不到資料夾時，會修改檔案名稱
    * 舉例： `mv file_old file_new` : 將檔案 file_old 改名為 file_new

`cp` ：複製檔案 or 複製資料夾
* Copy
* 使用方式：
  1. `cp file_1 file_2` ：複製一個新的檔案 file_2
  2. `cp -r folder_1 folder_2` ：複製一個新的資料夾 folder_2

`cat` ：快速查看檔案內容
* 使用方式： `cat 檔案名稱`

## Vim 編輯器
可以直接在 Command Line 中編輯文字的編輯器，區分為一般模式及輸入模式。
* 切換方式：
  * 按下 `i` 進入編輯模式 ：可以編輯文字
  * 按下 `esc` 回到一般模式 ：無法編輯文字，可以刪除、複製、貼上
* 跳出 Vim 編輯器：
  * 可以按下 `:q` ：跳出
  * 或者是按下 `:wq` ：存檔後跳出 


## 其他好用指令

`grep`：關鍵字搜尋
* 使用方式： `grep 關鍵字 檔案名稱` 可於檔案中抓取關鍵字直接顯示出來

`wget`：下載檔案
* 非內建指令，需要自行安裝才可以使用
* 可參考[Homebrew](https://brew.sh/index_zh-tw)

`curl`：送出 request
* 使用方式： `curl 網址` 可以發送 request 到該網址去。
* 補充： `curl -I 網址` 可顯示細節資料
![](https://static.coderbridge.com/img/krebikshaw/7eae7b53c1b84ecb90b18e5916fb4033.png)


## 指令的組合技

`>`：將指令結果輸入到檔案內容
* 舉例：`ls > file` 將 ls 的結果寫進 file 當中
  * ***注意！此用法會覆蓋掉原本 file 裡面的內容***
  * 若是不想覆蓋掉，只是要新增文字進去，可以使用 `>>`代替

`|`：將左邊指令的輸出變為右邊指令的輸入
* 舉例：`cat test.txt | grep file.js` 把 test.txt 的內容輸入到 file.js 當中
基於老師這句話實在太難看懂了，我這邊重新理解過後用自己的方式說明出來

```
假設我有兩間工廠：
Ａ工廠 負責將 小麥製作成麵粉，所以你給Ａ工廠輸入小麥，它就會輸出麵粉給你。
Ｂ工廠 負責將 麵粉製作成麵條，所以給Ｂ工廠輸入麵粉，它就會輸出麵條給你。

我在 A工廠 及 Ｂ工廠 間加了一條管子，可以直接將 A工廠 製作完的麵粉，輸送進 B工廠。 
這樣就完成了 ＡＢ工廠 的合併，我只要輸入小麥，直接輸出麵條給我。

小麥 => A工廠 => 麵粉 => 運送麵粉 => 麵粉 => Ｂ工廠 => 麵條
小麥 => A工廠 ｜ Ｂ工廠 => 麵條
```

`echo`：將內容印出來，有點像 console.log
* 舉例１：`echo hello`
![](https://static.coderbridge.com/img/krebikshaw/016b2cde8fb04cef8393c738f53257eb.png)
* 舉例２：`echo hello | grep file`

## 達成想要的功能
好啦， Command Line 的基本操作都說明完了。我們來看看 h0w 哥希望達成的功能吧！
>想用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。

1. 那第一步，需要先確認 h0w 哥你想在哪裡建立資料夾，假設你要建立在**桌面**，就要先用 `cd` 這個指令把工作環境先切換到**桌面**，才不會建立完結果找不到資料夾唷。
2. 切換到正確的工作環境後，再運用 `mkdir wifi` 這個指令來新建一個叫做 **wifi** 的資料夾。
3. 新建完成後，需要進入剛新建好的資料夾，使用指令 `cd wifi`。
4. 接著我們來新建 **afu.js** 這個檔案，使用指令 `touch afu.js`。

**上面幾個步驟就可以把功能完成囉**，h0w 哥趕快來試試看吧！

