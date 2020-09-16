## Webpack 是做什麼用的？可以不用它嗎？

Webpack 是做什麼用的？
* 我們在本地端將 A 檔案的程式，引入到 B 檔案來使用，可以透過 node 提供的 export, require 等方式來實現。但是當執行環境換成瀏覽器的時候，瀏覽器沒辦法支援這種 require 的形式，它不像 Node 有一個明確的模組化規範 CommonJS。因為早期的瀏覽器是沒有模組化規範的，所以為了讓瀏覽器可以利用類似引用檔案的方式來實現模組化，才會出現這些用來解決相關問題的工具。

Webpack 的作用，就是為了能夠將模組包在一起，在瀏覽器上實現模組的一個工具。它可以利用 import 把資源加載進來，連圖片或是 css 也可以，因此也可以做到 compile css、轉換 JavaScript 等等。

可以不用它嗎？
* 開發上若是用不到這些功能，就不需要使用 Webpack，畢竟工具的使用，都取決於開發上面是否有需要。


## gulp 跟 webpack 有什麼不一樣？

gulp 是一個任務管理工具，他可以讓我們依照設計的劇本，去執行我們指定的 task(任務)
* 例如：
  * 壓縮任務
  * babel
  * sass
  * 定時發 API
* 這些任務可以同時進行或者按照順序進行
* 但 gulp 本身不具備打包的功能 (除非引用 webpack 的 task)


Webpack 是一個打包各項模組的工具，只是在 bundle 的過程中，這些 loader 具備一些功能，順便幫我們達成我們想要的任務
* webpack 可以藉由 loader 以及 plugin 做很多有趣的事，例如說：
  * 在載入 JS 的時候順便做 uglify
  * 在載入 CSS 的時候順便做 minify
  * 把打包出來的檔名順便加上 hash
  * 根據不同頁面打包不同的檔案，就不用一次載入全部 JS
  * 支援動態引入 JS，有需要的時候才載入
* Webpack 藉由這些 loader 達成類似任務的動作
* 但是 Webpack 本身不具備 task 的功能 (除非引用了 gulp 的 plugin)

## CSS Selector 權重的計算方式為何？

標籤越詳細，權重就越高
!important > inline style > ID > Class/ Pseudo-class/ attribute > Element/Pseudo-elements > *

1. `*` 為全域選擇器，權重為0–0–0–0，只要權重超過就可以覆蓋。
2. Element(標籤/type)與Pseudo-elements (偽元素)，權重都是0–0–0–1。
3. class(類別選擇器)與 Pseudo-class(偽類) 、 attribute（屬性選擇器）三種，權重為0–0–1–0。
4. id選擇器，每一個id的權重為0–1–0–0。
5. inline style的權重為1–0–0–0。
6. !important的權重最高，為1–0–0–0–0，會蓋過以上所有的權重 ( 沒事不能亂用，會造成css混亂)

