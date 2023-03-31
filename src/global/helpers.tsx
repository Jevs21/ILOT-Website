const formatTextStr = (s) => String(s).toLocaleLowerCase()
const formatDateStr = (s) => {
  const d = new Date(s);
  const formattedDate = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear().toString().substring(2)} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  return formattedDate;
}
const formatDateStrShort = (s) => {
  const date = new Date(s);

  // Get the month name, day of the month, and year from the date object
  const monthName = date.toLocaleString('default', { month: 'long' });
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  // Return the formatted date string
  return `${monthName} ${dayOfMonth}, ${year}`;
}
const formatDefault = (s) => s

const formatText = (t, s) => {
  if (t == "date") {
    return formatDateStr(s);
  }
  else if (t == "string") {
    return formatTextStr(s);
  }
  
  return formatDefault(s)
}

const getStringFromTimeDiff = (diff) => {
  const minDiff = Math.floor(Math.abs(diff / (1000 * 60 )));
  const hourDiff = Math.floor(Math.abs(diff / (1000 * 60 * 60)));
  const dayDiff = Math.floor(Math.abs(diff / (1000 * 60 * 60 * 24)));
  
  if (dayDiff < 1) {
    if (hourDiff < 1) {
      return `${minDiff} min${(minDiff == 1) ? "":"s"}`
    } else {
      return `${hourDiff} hr${(hourDiff == 1) ? "":"s"}`
    }
  } 
  
  return `${dayDiff} day${(dayDiff == 1) ? "":"s"}`
}

export {formatTextStr, formatDateStr, formatDateStrShort, formatText, getStringFromTimeDiff};