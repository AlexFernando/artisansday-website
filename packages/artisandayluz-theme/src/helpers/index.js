export const hoursStringToDecimal = (hoursString) => {
    const [hoursPart, minutesPart] = hoursString.split(":");//
    return Number(hoursPart) + Number(minutesPart) / 60;
}

export const decimalHoursToString = (hoursDecimal) => {
    const numHours = Math.floor(hoursDecimal);
    const numMinutes = Math.round((hoursDecimal - numHours) * 60);
    return `${numHours < 10 ? "0" : ""}${numHours}:${numMinutes < 10 ? "0" : ""}${numMinutes}`;
}

