export const dateToTime = (date): String => {
    if(!date) return '';
    if(typeof(date) === 'string') return date;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
};