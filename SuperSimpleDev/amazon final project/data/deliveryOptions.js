import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs(); 
  let remainingDays = deliveryOption.deliveryDays;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    // Check the day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = deliveryDate.day();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}