function changemode(parameter) {
  if(!document.querySelector(`.${parameter}-button`).classList.contains('dark-button')) {
    document.querySelector(`.${parameter}-button`).classList.add('dark-button');
  }
  else {
    document.querySelector(`.${parameter}-button`).classList.remove('dark-button');
  }
}