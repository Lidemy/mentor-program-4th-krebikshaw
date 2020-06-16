## 跟你朋友介紹 Git

## 學習操做 git 之前，我們要先了解一下：
為什麼寫程式要做版本控制呢？我每天一直寫一直寫，永遠都會是最新版本啊！
* 理由很簡單：
  1. 有可能哪天突然要回復成以前的版本，一但先前沒有備份就糟了。
  2. 可能我不確定老闆最後要的是什麼樣子，所以我提供不同版本的樣式給老闆選擇。
  3. 其他雜七雜八的理由。
* 一但有了版本控制，哪天突然需要查閱以前的資料，心裡就會有安心的感覺，還好我有保存起來。

## 怎麼做版本控制
**從我們熟悉的方式說起：**
假設我們要開始找工作，需要寫出自己的履歷表。
* 我需要分成`中文`和`英文`的版本
* `前端`和`後端`的職位不相同，履歷也要區分開來
* 某間公司我特別喜歡，我要獨立出來做一個特別版本

**那我應該要怎麼做？**
1. 建立一個叫做 `中文版`的資料夾，及一個 `英文版`的資料夾。
2. 底下分別在建立 `前端版本`及`後端版本`的資料夾。
3. 看看我現在做的履歷屬於哪個一個版本，就存放在對應的資料夾底下。
4. 哪天我需要找 **前端英文版履歷**，我就可以去 **英文版** 及 **前端版本** 資料夾底下找。

**現在我們換個情境**
上次的履歷做的非常好，現在已經找到了喜歡的工作，為了與同事們合作完成一份專案，我們在網路上建立了雲端資料夾來進行版本控制。結果遇到了一些問題：
* 藍寶做了一個新的資料夾叫做 `新版 2.2`，結果痞子妹剛好新增了一個資料夾也叫 `新版 2.2`。兩個資料夾名稱一樣，結果內容不同。
* 睏寶正在編輯 `project_sleep` 這個檔案，正好海盜船長也在自己的電腦修正同一個檔案，睏寶先編輯完後上傳到資料夾，海盜船長比較晚完成，但也把完成的檔案上傳上來，結果睏寶編輯好的檔案就被 **覆蓋** 掉了。

```
一但開始多人協作，事情就變得沒這麼簡單
```


## Git 的版本控制
* 首先要解決版本名稱相同的問題，就必須讓版本名稱亂到幾乎不可能相同。
  * 於是 Git 就將版本名稱轉成 hashes 亂碼，再額外用一個紀錄檔紀錄這個亂碼對應到的是哪一個版本，使得版本名稱不會發生重複。
* 接下來來解決檔案被 `覆蓋` 的問題。
  * 每當建立好版本的時候 Git 會去記憶檔案改動的內容，若是新的檔案要去取代掉原先的檔案時，發現兩者內容有衝突，Git 會提醒使用者修正有衝突的部分。

## 開始使用 Git
`init` 版本控制初始化
* 先在電腦建立一個要做為版本控制的資料夾，接著打開神奇的 Terminal 把位置切換到剛剛建立好的資料夾中。輸入指令 `git init`，資料夾裡面就會出現一個 `.git`的隱藏資料夾。

`status` 查看狀態
* 用於確認現在的版本狀態，哪些檔案有加入版本控制，現在在哪一條 `branch`
等等。
* 使用方式： `git status`

`add` 加入版本控制
* 每新增一個檔案，我們要讓電腦知道，這個檔案要不要做版本控制。
* 若是沒有加入版本控制，Git 會在訊息中提醒你。
![](https://static.coderbridge.com/img/krebikshaw/20a5c4bdf8cd47b4bff1ab66b9cbcdf0.png)
* 使用方式：
  1. `git add <檔案名稱>` ：將這個檔案加入版本控制
  2. `git add .`：將這個資料夾下的全部檔案加入版本控制 
  3. `git rm --cached <檔案名稱>` ：將檔案解除版本控制

`commit` 建立版本
* 幫目前的資料存檔，建立新的版本
>做一次 `commit` 就好像幫你的資料夾拍一張照片！幫你記下現在每個檔案長什麼樣子，我每做一次 `commit` 就再拍一張新照片。我可以隨時回來查看曾經拍過的照片。

* 使用方式：
  * `git commit` 會跳出 Vim 的介面要求你將版本做命名
  * `git commit -m <名稱>` 直接建立版本並完成命名
  * `git commit -am <名稱>` 跳過 `add` 的步驟。將所有檔案加入版本控制，建立新版本，並完成命名。（三個願望一次滿足）
  ```
  -am 無法把新建立的檔案加入版本控制，需要先輸入 git add 再做 commit
  ```

  * **注意！**
>當檔案發生改動，想要提交 commit 之前，Git 會要求你再輸入 `git add 檔案名稱`。除非直接使用 `git commit -am 名稱` 這個指令。

`log` 查看紀錄
* 查看先前版本的版本號碼、提交者、提交時間。
* 使用方式： `git log`
![](https://static.coderbridge.com/img/krebikshaw/bd154a05c247479abcc00feb53003a35.png)

`checkout` 警察臨檢，把所有東西都拿出來給我檢查！
* 可用來查看任何版本的內容
* 在沒有其他 **branch** 的情況下
  * 輸入 `git checkout <版本號碼> `：切換到任何 commit 過的版本
  * 輸入 `git checkout master`：切換回最新版本 
* 若是有新增 **branch** 
  * 輸入 `git checkout <branch_name>`：切換到任何 branch 

`.gitignore` 忽略不需要版本控制的檔案
* 前面提到在提交 `commit` 之前，Git 會要求輸入 `git add <檔案名稱>` 將修正過的檔案加入版本控制。但是如果我真的有些檔案不想要加入版本控制呢。
* 可以將這些檔案紀錄在 `.gitignore` 當中，這樣 `git add .` 就不會加到不必要的檔案了。

`diff` 查看版本差異
* 用來比較新舊版本所做的改動


# 我們可以利用 GitHub 在網路上面建立一個存放版本控制的倉庫

## 在說明 GitHub 之前，先來聊聊 branch 概念
**我們為什麼需要 branch ？ branch 是什麼？**
* 想像你是一個甜甜圈老闆，你的巧克力甜甜圈大受好評，店裡人滿為患。某天你看著你的巧克力配方，突然靈機一動想到了一個改良的點子，也許能夠增添更多商機，說不定還可以熱銷到全世界。興奮的你馬上在舊的配方上面加上新的 idea。改良到一半的時候，有一間美食集團的大老闆來找你談生意，希望以 3000 萬買下你的巧克力配方。你猶豫了...，因為你已經在舊配方上寫下你新的 idea，你不想讓別人知道你新的 idea 內容，可是想要賺這 3000 萬你就必須把這份配方給他(假設這份配方非常複雜無法複製第二份)。你心裡想著，要是我當初的 idea 是另外寫在別的地方就好了。

```
branch 的概念就是，不管你要做任何事情，都不要去改動原始的東西，而是先將原始資料備份，
並在備份的檔案上來操作，確保原始的資料是完整的。
```

* 換到程式的角度來看，假設你們公司去年提供了一個 `完整版` 軟體給客戶使用。今年度開始要將 `完整版` 改良成 `新版本`。你開始在 `完整版` 上面改良，現階段完成了 `完整版 + 50%新版`。某天客戶突然告訴你發現程式有 bug 要修，你如果在 `完整版 + 50%新版` 修正完 bug 並提供給客戶，客戶就會看到一個 50% 的新版內容。因為 50% 的新內容不能提供給客戶看，所以你要把所有新版本都拿掉，回復成 `完整版` 後，再去修正 bug，你的新版本就通通白做啦。

***簡單的概念： 要做任何事情，就到新的 branch，等到完成後，再合併回 master。***

``` js
* 有了 branch 之後，你會有一條原始資料的主要 branch，他叫做 master。
* 要開發新版本，就會新增一條開發新版本的 branch，
* 要修正 bug，就會新增一條修正 bug 的 branch。
* 一但這條 branch 確認完成後，才可以把完成的資料，放回去 master 這條原始的 branch
```




## 實際上 branch 的操作
>如果沒有新建新的 branch，系統預設的 branch 就叫做 `master`

`git branch <name>`： 新增一條新的 branch
`git branch -v`：查看目前有哪些 branch，以及告訴你目前在哪一條 branch
![](https://static.coderbridge.com/img/krebikshaw/e87b1194737143538b4cb49cce3441ec.png)
`git branch -d <name>`：刪除 branch，請務必確認這條 branch 的資料已經合併回 master。
![](https://static.coderbridge.com/img/krebikshaw/cdf6a0dc673c466cad463eab20dd6a8e.png)
`git checkout <name>`：切換到別的 branch
**注意！若是目前的 branch 有檔案在完成改動後尚未 commit，系統會發出提醒**
![](https://static.coderbridge.com/img/krebikshaw/51fc8bf9c2a84d2e87a4b71527f04f61.png)
  
  * 補充： `git checkout -b <name>`：新增一條新的 branch 並直接切換過去
  
`git merge <name>`：合併分枝
* 把別的 branch 合併進來現在的 branch
  1. 先 `git checkout master` 切換到 master 這條主要的 branch
  2. 在執行 `git merge new-feature` 將 new-feature 合併進來現在這條 master

```
由於 merge 到底是誰會合併誰，常常容易搞混，可以記住一個概念：
* 下指令的人是 Boss，Boss 才會下 merge 指令
* 屬下才會交報告給 Boss，所以一定是屬下的資料給 Boss
* 也就是說，我在 Boss 這條 branch 下 merge 我就是 Boss，被我呼叫到的 branch 要把資料合併給我。
```


## 合併時發生衝突怎麼辦
回顧上一篇文章 [版本控制 - 基本 Git 指令](https://mtr04-note.coderbridge.io/2020/06/12/how-to-use-git/)提到的故事
>睏寶正在編輯 project_sleep 這個檔案，正好海盜船長也在自己的電腦修正同一個檔案，睏寶先編輯完後上傳到資料夾，海盜船長比較晚完成，但也把完成的檔案上傳上來，結果睏寶編輯好的檔案就被 覆蓋 掉了。

在 `merge` 的時候，若新檔案與就檔案有改動到相同的地方，就會發生衝突，我們就叫做 `conflict`。此時需要 `手動` 將衝突的部分修改完成。才能完成 merge 的動作。
(此部分的操作畫面待補)

## 終於來到了 GitHub
我們在自己電腦對於資料夾進行 `版本控制` 後，需要在 GitHub 上面開一個 `Repository` ，並且將這個 Repository 與我們電腦的資料夾做連動。完成後 
我們就可以看看 GitHub 相關的操作指令囉：

`push`：推到 repository 上面
* 把自己電腦上完成的東西，推到 GitHub 網站上。
  * 範例 `git push origin new-feature` ：將本機 new-feature 這條 branch，推到 GitHub 遠端。
    * 若不曉得 `origin` 是什麼，可以用指令 `git remote -v` 來查看 origin 指的是哪裡
![](https://static.coderbridge.com/img/krebikshaw/061e132ff5464f3caa277743c68ac26d.png)

`pull`：從 repository 拉下來
* 把 GitHub 上面的資料，同步到自己的電腦上。
  * 用法 `git pull origin master` 將 GitHub 上 master 的資料同步到自己電腦
  * 用法 `git pull <clone url> master` 將別人的 Repository 同步到自己的電腦的 `master`

`clone`：把 repository 的資料下載到自己電腦
* 將 gitHub 資料下載到本地
* 若是用 `clone` 把 repository 資料下來自己的電腦，可以跳過將 Repository 與我們電腦的資料夾做連動的步驟，因為 clone 到自己電腦的資料夾，會直接與 GitHub 連動。
***若是 clone 別人的 repository，是無權可以修改的***

`fork`：把別人的 repository 複製一份成為自己的 repository
* 有權力編輯自己的那份 repository 

## 我們來舉個實際例子吧
假設菜哥你要在 GitHub 上建立了一個專門放置笑話版本的 Repository，我該怎麼操作來把笑話更新至 GitHub 呢？

1. **撰寫新的笑話之前，先開一條新的 branch，並切換到那條新的 branch 上面**
![](https://static.coderbridge.com/img/krebikshaw/09eb9b64ae6548acbbc505d77df27a68.png)
2. **接著就可以開開心心的撰寫自己的笑話**
3. **完成之後可以利用 `git add .` 把檔案加入版本控制，並用 `git status` 來確認是否成功加入**
![](https://static.coderbridge.com/img/krebikshaw/efb1d26fe12448adb0af8156a0792330.png)
4. **確認你的笑話有加入版本控制後，就可以 `commit` 成新的版本啦**
![](https://static.coderbridge.com/img/krebikshaw/dc519c83683e4250836b3ba5f44d5919.png)
5. **在電腦上建立好版本後，就可以準備把它更新到 GitHub 上面囉，還記得要用什麼指令嗎？**
  * 沒錯，就是 `push`
  ![](https://static.coderbridge.com/img/krebikshaw/e2202112ec9044daa0cd8fe5a87fe29a.png)
  
6. **這時候打開 GitHub 可以看到你 `push` 上去的 `blog` 這條新的 branch **
  * 在 GitHub 上面查看 branch
  ![](https://static.coderbridge.com/img/krebikshaw/070435f5eeca4f909f98b32e2bc3d4bc.png)
7. **點選 `new pull request` 後，就會發送一個請求，讓你的 branch 可以合併到 master 上面**
![](https://static.coderbridge.com/img/krebikshaw/61856964d9004325bd80a00196c4f28e.png)
8. **這邊是請求核准的介面，用來決定是否要將 branch 合併進來**
![](https://static.coderbridge.com/img/krebikshaw/e12b6a40b1764e56b20c1f2f5a529f30.png)
  * 這個時候你就完成將笑話更新至 GitHub 的動作了！ 
9. **確認合併後可以決定要不要把 blog 這條 branch 刪掉**
![](https://static.coderbridge.com/img/krebikshaw/45329132c75449039d2e7c7e52154a2b.png)
10. **更新至 GitHub 之後，因為要確保本機的 master 與 GitHub 上面同步**
  * 所以我們要先切換到 `master` 後，把 GitHub 上的資料 `pull` 下來
![](https://static.coderbridge.com/img/krebikshaw/04b2ea4ba0624b28ae33cc5a24026c8e.png)
11. **此時本機的 `master` 也同步完成了，就可以將撰寫文章的 `blog` 這條 branch 刪掉囉**
![](https://static.coderbridge.com/img/krebikshaw/72dcbfc870914cd985dbdae81fce2e4d.png)


>以上就是一個完整的示範範例，我要做事情了！先新建一條新的 `branch` 並切換到新的 `branch` 上面，完成我要做的事情後，`commit` 成新的版本。在用 `push`指令更新至 GitHub 上面，在網站上面把它 `merge` 到 `master` 完成更新。在把 GitHub 的資料同步到自己電腦的 `master`，最後把自己做事情的 `branch` 刪掉！
