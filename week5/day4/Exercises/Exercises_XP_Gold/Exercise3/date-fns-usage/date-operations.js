const { format, addDays } = require("date-fns");

const dataandtime = () => {
  const now = new Date();
  console.log("Current Date:", now);
  const futureDate = addDays(now, 5);
  const formattedDate = format(futureDate, "yyyy-MM-dd HH:mm:ss");
  console.log("Date after 5 days:", formattedDate);
};
module.exports = dataandtime;