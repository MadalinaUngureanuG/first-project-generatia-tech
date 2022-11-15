const calculateDateDifference = (date) => {
    let today = new Date();
    let difference = today.getTime() - date.getTime();
    let totalDays = Math.floor(difference / (1000 * 3600 * 24));
    return totalDays;
}

module.exports = {
    calculateDateDifference: calculateDateDifference
}