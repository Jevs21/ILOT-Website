import { Chip } from "@suid/material"
import style from "../global/style";
import { createMemo } from "solid-js";

interface CustomChipProps {
  type: "black" | "white" | "grey"
  text: string
}

const CustomChip = ({type, text}: CustomChipProps) => {
  const chipStyle = createMemo(() => {
    switch (type) {
      case "black":
        return {
          backgroundColor: style.palette.black,
          color: style.palette.white,
        }
      case "white":
        return {
          backgroundColor: style.palette.white,
          color: style.palette.black,
        }
      case "grey":
        return {
          backgroundColor: style.palette.grey[0],
          color: style.palette.black,
        }
    }
  });

  return (
    <Chip label={text.toLocaleUpperCase()} sx={chipStyle()}/>
  );
}

export default CustomChip;