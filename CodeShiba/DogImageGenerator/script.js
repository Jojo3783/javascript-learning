let dogbuttondiv = document.getElementById("dogbutton");
let dogimagediv = document.getElementById("dogImage");

const getNewDog = () => {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(json => {
  dogimagediv.innerHTML = `<img src='${json.message}' height=300 width=500/>`
  })
}

dogButton.onclick = () => getNewDog()