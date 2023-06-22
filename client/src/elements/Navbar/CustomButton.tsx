import { Button } from "@suid/material"
import { createMemo } from "solid-js"
import style from "../../global/style"

interface CustomButtonProps {
  type?: "red" | "white" | "black"
  onClick: () => void
  text: string
}

const CustomButton = ({type, onClick, text}: CustomButtonProps) => {
  const baseStyle = {
    width: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  const btnStyle = createMemo(() => {
    switch (type) {
      case "red":
        return {
          ...baseStyle,
          backgroundColor: style.palette.red,
          color: style.palette.white,
          '&:hover': {
            backgroundColor: style.palette.redDark,
            cursor: 'pointer'
          },
        }
      case "white":
        return {
          ...baseStyle,
          backgroundColor: style.palette.white,
          color: style.palette.black,
          '&:hover': {
            backgroundColor: style.palette.grey[0],
            cursor: 'pointer'
          },
        }
      case "black":
        return {
          ...baseStyle,
          backgroundColor: style.palette.black,
          color: style.palette.white,
          '&:hover': {
            backgroundColor: style.palette.grey[3],
            cursor: 'pointer'
          },
        }
      default:
        return baseStyle
    }
  })

  return (
    <Button 
      variant="contained" 
      onClick={onClick}
      sx={btnStyle()}>{text}</Button>
  );
}


export default CustomButton;