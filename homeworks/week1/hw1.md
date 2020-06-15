## 交作業流程

1. 開一條新的 branch ： `git branch week1`
2. 切換到這條新的 branch ： `git checkout week1`
3. 開始寫作業
4. 看完當週的 `自我檢討` 並修正錯誤。
5. 將作業檔案加入版本控制 ： `git add .`
6. 建立一個新的版本 ： `git commit -am "week1 作業完成"`
7. 從本地上傳到 GitHub ： `git push origin week1`
8. 到 GitHub 之後，進入自己的 repository 發起 `pull request`
9. 到 https://learning.lidemy.com/ 學習系統，進入**作業列表**後，點選 `新增作業`
10. 將 pull request 的連結貼上，確實了解底下的確認訊息並且勾選後送出。
11. 等待助教批改。
 **等助教改完作業且 merge 後**
12. 將本機的 branch 切換到 master ： `git checkout master`
13. 把 GitHub 上面 merge 好的資料拉到本機 ：`git pull origin master`
14. 刪除已經 merge 完成 的 branch ： `git branch -d week1`