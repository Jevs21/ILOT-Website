import { Button } from "@suid/material"
import { createMemo } from "solid-js"
import style from "../../global/style"

interface CustomButtonProps {
  type?: "red" | "white" | "black"
  text: string
}

const CustomButton = ({type, text}: CustomButtonProps) => {
  const baseStyle = {
    width: 200,
  }

  const btnStyle = createMemo(() => {
    switch (type) {
      case "red":
        return {
          ...baseStyle,
          backgroundColor: style.palette.red,
          color: "white"
        }
      case "white":
        return {
          ...baseStyle,
          backgroundColor: "white",
          color: "black"
        }
      case "black":
        return {
          ...baseStyle,
          backgroundColor: "black",
          color: "white"
        }
      default:
        return baseStyle
    }
  })

  return (
    <Button variant="contained" sx={btnStyle()}>{text}</Button>
  );
}


export default CustomButton;