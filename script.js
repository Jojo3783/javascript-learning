/* 🚀🔥
黃綠紅 你要哪一個？

此專案涵蓋的概念
- DOM 操作
- 事件監聽器
- 迴圈 forEach 
- 變數
- 條件語句 (if else if)
- 樣板字面值
*/
  console.log("Hello");
// 將 title 文字改成 '報告阿柴，標題已經切換！' 並將字體顏色改成藍色
  function  clickEventHandler() {
    let title = document.getElementById('title');
    console.log("before :" + title.innerText);
    title.innerText = "報告班長，標題已經切換！";
    console.log("after :" + title.innerText);
    title.innerHTML = "報告班長，標題已經切換！";
    title.style.color = 'blue';
  }


let changeButton = document.getElementById('changeButton')
changeButton.addEventListener("click", clickEventHandler);
// changeTitle()


const squares = document.querySelectorAll('.colorSquare')
const output = document.getElementById('output')
// forEach
squares.forEach(square => {
  square.onclick = () => {
    _id = square.getAttribute('id')
    output.innerHTML = `<div class=".colorSquare" id="${_id}">${_id}</div>`;
  }
})

