import { Chip } from "@suid/material"
import style from "../global/style";
import { createMemo } from "solid-js";

interface CustomChipProps {
  type: "black" | "white" | "grey"
  text: string
  size?: "small" | "medium" | "large"
}

const CustomChip = ({type, text, size}: CustomChipProps) => {
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
    <Chip label={text} sx={[chipStyle(), {p: 2, fontSize: '1.1em'}]}/>
  );
}

export default CustomChip;