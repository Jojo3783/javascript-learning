let m_seconds = 0
const displayMSeconds = document.getElementById('m_seconds')
const displaySeconds = document.getElementById('seconds')
const buttonStart = document.getElementById('button-start')
const buttonStop = document.getElementById('button-stop')
const buttonReset = document.getElementById('button-reset')
let interval

// 綁定 buttonStart 按鈕的觸發事件
buttonStart.onclick = () => {//start buttom got click
    clearInterval(interval)
    interval = setInterval(timer, 10)
}

// 綁定 buttonStop 按鈕的觸發事件
buttonStop.onclick = () => {
    clearInterval(interval);
}

// 綁定 buttonReset 按鈕的觸發事件
buttonReset.onclick = () => {
  clearInterval(interval)
  m_seconds = 0;
  displaySeconds.innerText = "00";
  displayMSeconds.innerText = "00";
}

// 碼錶讀取方法
const timer = () => {
  m_seconds++;

  if(m_seconds < 99) {
    displaySeconds.innerText = "00";
  }
  else if(m_seconds < 999) {
    let int = parseInt(m_seconds / 100);
    displaySeconds.innerText = `0${int}`;
  }
  else {
    displaySeconds.innerText = parseInt(m_seconds / 100); 
  }

  if(m_seconds % 100 == 0) {
    displayMSeconds.innerText = "00";
  }
  else if(m_seconds % 100 < 10) {
    let int = parseInt(m_seconds % 100);
    displayMSeconds.innerText = `0${int}`;
  }
  else {
    displayMSeconds.innerText = m_seconds % 100;
  }
}
