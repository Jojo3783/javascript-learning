function handleKeydown(event) {
  if(event.key === 'Enter') {
    calculateTotal();
  }
}
function calculateTotal() {
  let money = Number(document.querySelector('.js-cost-input').value);
  document.querySelector('.js-cost-output').classList.remove('negtive-condition');
  if(money >= 40) {
    document.querySelector('.js-cost-output').innerText = `$${money}`;
  }
  else if(money < 40 && money >= 0){
    money+=10;
    document.querySelector('.js-cost-output').innerHTML = `$${money}`;
  }
  else {
    document.querySelector('.js-cost-output').classList.add('negtive-condition');
    document.querySelector('.js-cost-output').innerHTML = `Error: cost cannot be less than $0`;
    }
  }
  function subscribe() {
    const element = document.querySelector('.js-subscribe-button');
    if(element.innerText === 'Subscribe') {
      element.innerText = 'Subscribed';
      element.classList.add('is-subscribed')/*add 'is-subscribed' to class*/
      // after this line class became <button class="js-subscribe-button subscribe-button is-subscribed">
      // .is-subscribed 寫在 .subscribe-button 的 後面，所以它的規則會「贏過」前面的規則。
    }
    else if(element.innerText === 'Subscribed') {
      element.innerText = 'Subscribe';
      element.classList.remove('is-subscribed');
    }
  }