function changemode(parameter) {
  const button = document.querySelector(`.${parameter}-button`);//new button
  if(!button.classList.contains('dark-button')) {//new dark-button not previous dark-button button
    
    turnOffPreviousButton();//find old dark-button and remove it

    document.querySelector(`.${parameter}-button`).classList.add('dark-button');//add new button to dark-button
  }
  else {//new dark-button is previous dark-button so make it become original button
    document.querySelector(`.${parameter}-button`).classList.remove('dark-button');
  }
}
function turnOffPreviousButton() {
  const previousButton = document.querySelector('.dark-button');
  if (previousButton) {
    previousButton.classList.remove('dark-button');
  }
}