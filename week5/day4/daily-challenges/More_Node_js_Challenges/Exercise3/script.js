const { nextHolidayInfo } = require('./date');
const info = nextHolidayInfo();
console.log(`Today is: ${info.today}`);
console.log(`The next holiday is ${info.holiday}`);
console.log(`Time left: ${info.timeLeft.days} days, ${info.timeLeft.hours} hours, ${info.timeLeft.minutes} minutes, ${info.timeLeft.seconds} seconds`);