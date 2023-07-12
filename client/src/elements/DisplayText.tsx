import { Typography } from "@suid/material";
import { useGlobalContext } from "../global/store";

const DisplayText = (props) => {
  const {isMobile} = useGlobalContext();
  return (
    <Typography {...props} variant="h1" fontSize={(isMobile()) ? "3em" : "4.2em"} lineHeight={1.3}>
      {props.children}
    </Typography>
  );
}

export default DisplayText;