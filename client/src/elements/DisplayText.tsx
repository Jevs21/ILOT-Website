import { Typography } from "@suid/material";

const DisplayText = (props) => {
  return (
    <Typography {...props} variant="h1" fontSize={"4.3em"} lineHeight={1.3}>
      {props.children}
    </Typography>
  );
}

export default DisplayText;