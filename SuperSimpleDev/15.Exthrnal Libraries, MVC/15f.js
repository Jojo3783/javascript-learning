export function isWeekend(date) {
  const dateString = date.format('dddd');
  if(dateString === 'Saturday' || dateString === 'Sunday') {
    console.log('Is weekend');
  }
  else {
    console.log('Not weekend');
  }
}

export default isWeekend;//default export