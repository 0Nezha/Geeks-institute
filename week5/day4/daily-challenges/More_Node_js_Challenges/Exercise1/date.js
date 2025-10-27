function timeUntilNewYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  const newYear = new Date(`January 1, ${nextYear} 00:00:00`);

  
  const difference = newYear - now;

  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  
  return `the 1st January is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

module.exports = timeUntilNewYear;