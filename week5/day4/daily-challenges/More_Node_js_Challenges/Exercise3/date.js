function nextHolidayInfo() {
    const now = new Date();
    const holidayName = "New Year";
    const holidayDate = new Date("January 1, 2026 00:00:00");
    const diffMs = holidayDate - now;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return {
        today: now.toDateString(),
        holiday: holidayName,
        timeLeft: { days, hours, minutes, seconds }
    };
}
module.exports = { nextHolidayInfo };