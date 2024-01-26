const formatDate = (date) => {
    const createdAtDate = new Date(date);
    const day = createdAtDate.getDate();
    const daySuffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    const month = months[createdAtDate.getMonth()];
    const year = createdAtDate.getFullYear();
    let hours = createdAtDate.getHours();
    let minutes = (createdAtDate.getMinutes() < 10 ? '0' : '') + createdAtDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = (hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours));
    return `${month} ${day}${daySuffix}, ${year}, at ${hours}:${minutes} ${ampm}`;
};

module.exports = formatDate;
