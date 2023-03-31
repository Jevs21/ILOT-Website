import { Chip } from "@suid/material";
import { createMemo } from "solid-js";
import { useGlobalContext } from "../global/store";
import style from "../global/style";

export default function StatusChip(props) {
  const { statusKeys } = useGlobalContext();
  const label = createMemo(() => (props.truncate) ? `${statusKeys()[props.status_id].slice(0,3)}..` : statusKeys()[props.status_id])

  const chipStyle = {
    ['& span'] : {
      color: style.palette.status[props.status_id].textColor
    },
    backgroundColor: style.palette.status[props.status_id].backgroundColor
  }
  
  return (
    <Chip 
      size={props.csize} 
      label={label()}
      sx={{...chipStyle, ...props.sx}}
      />
  );
}