import { Box } from "@suid/material";
import { createMemo } from "solid-js";
import { useGlobalContext } from "../global/store";
import style from "../global/style";

const ModalBoxEl = (props) => {
  const { isMobile } = useGlobalContext();
  // const [width, setWidth] = createSignal(400);
  const width = createMemo(() => (isMobile()) ? "70%" : "40%");
  const padX   = createMemo(() => (isMobile()) ? 3 : 7);
  const padY   = createMemo(() => (isMobile()) ? 3 : 4);
  return (
    <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: width(),
      // height: "40%",
      bgcolor: style.palette.white,
      // border: "1px solid #000",
      borderRadius: "8px",
      boxShadow: "24px",
      paddingX: padX(),
      paddingY: padY(),
    }}
  >
    {props.children}
  </Box>
  );
}

export default ModalBoxEl;