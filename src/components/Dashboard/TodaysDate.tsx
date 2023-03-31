import { Typography } from "@suid/material";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function TodaysDate() {
  const today = new Date();
  const date_str = `${weekdays[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  return (
    <Typography variant="body2" component="div" paddingX={2}>
      {date_str.toLocaleUpperCase()}
    </Typography>
  );
}

