let calculation = localStorage.getItem('calculation') || "";
function updateCalculation(value) {
  calculation += value;
  localStorage.setItem('calculation',calculation);
  document.querySelector('.js-output').innerHTML = `${calculation}`;
  document.querySelector('.js-output').classList.add('showoutput');
}