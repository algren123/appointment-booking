const reverseDate = (date) => date.split('-').reverse().join('-');

const addHour = (hm) => {
  const [hoursArr, minutesArr] = hm.split(':');
  const totalSeconds = hoursArr * 60 * 60 + minutesArr * 60 + 3600;
  let hours = Math.floor(totalSeconds / 3600); // get hours
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60); // get minutes
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return hours + ':' + minutes;
};

export { reverseDate, addHour };
