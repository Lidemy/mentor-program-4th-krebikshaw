## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. `<hr>`：添加一條水平分隔線
  * 可於 CSS 中設定：width, size, color, align 等屬性

2. `<del>`：刪除線標籤
  * 瀏覽器會在輸入的內容上加上刪除線

3. `<ins>`：底線標籤
  * 瀏覽器會在輸入的內容下方加上底線	

4. `<sub>`：下標
  * 瀏覽器會將內容變成下標

5. `<sup>`：上標	
  * 瀏覽器會將內容變成上標 (像我們平常書寫的幾次方一樣)

## 請問什麼是盒模型（box modal）
* 可以想像 HTML 的元素是個盒子，藉由調整盒子的各項尺寸，能幫助我們調整元素的外觀及位置。
* 由內至外包含：
  * content：元素本身
    * width ：寬度會因為 display 的屬性，預設值會有所差異
      * display: block ：寬度為 100%
      * display: inline or inline-block ：寬度會被內容撐開
    * height：高度沒有設定的話，會被內容撐開 
  * padding：元素與內容的內邊距
  * border：元素的邊框
  * margin：元素與外部的外間距
    * 外間距不算在元素裡面

**box-sizing 盒模型屬性**
* 預設為 content-box
  * 元素的實際大小會是 content + padding + border
  * 假設 { width: 50px; height: 50px; padding: 10px; border: 5px solid black; margin: 10px; }
    * 實際的「寬」 = 50px + 兩倍的 10px + 兩倍的 5px = 80px
    * 實際的「長」 = 50px + 兩倍的 10px + 兩倍的 5px = 80px

* 將 box-sizing 改為 border-box
  * 元素的實際大小就會是 width 及 height 的值
  * 假設 { width: 50px; height: 50px; padding: 10px; border: 5px solid black; margin: 10px; }
    * 實際的「寬」 = 50px 
    * 實際的「長」 = 50px
    * content 的「長」「寬」會被壓縮至 20px 


## 請問 display: inline, block 跟 inline-block 的差別是什麼？
inline
* 元素會向左排列，直到排滿才會換行
* 無法設定 width & height ，寬、高會被內容撐開
* 無法設定 margin-top & margin-bottom

block
* 元素會向下排列，一行只會有一個元素
* 可以設定 width & height 
  * 寬度 預設佔滿父容器的 100%
  * 高度 會被內容撐開

inline-block
* 兼具 inline 及 block 的特性
* 元素會向左排列
* 可以設定 width & height
  * 預設會被內容撐開

none
* 讓元素消失
* 底下的元素會替補它的位置


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
static
* 元素的預設定位
* 網頁自然的流動定位

relative
* 以元素本身為參照點
* 元素本身的偏移，不會影響其他元素的位置

absolute
* 以上層「第一個」非 static 的元素為參照點
* 若上層沒有符合的元素，則以 body 為參照點
* 預設座標為 left:0; top:0;
* 元素本身的偏移，會影響到其他元素的位置

fixed
* 以 viewpoint 為參照點，不會隨頁面滑動而改變位置
* 一定要設座標才有作用
* 元素本身的偏移，會影響到其他元素的位置
