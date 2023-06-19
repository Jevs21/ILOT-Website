import { Stack } from "@suid/material";
import { createSignal } from "solid-js";

// This is so wrong i will face the reality one day
const StackRowCentered = (props) => {
  const [sp, setSp] = createSignal(props.spacing | 2);
  // const [ju, setJu] = createSignal(props.justifyContent | 'center');
  const style = { display: 'flex', alignItems: 'center'};
  return (
    <Stack 
      direction='row' 
      width={'100%'} 
      // justifyContent={props.justifyContent}
      // paddingLeft={props.paddingLeft} 
      // paddingRight={props.paddingRight}
      // paddingTop={props.paddingTop}
      // paddingBottom={props.paddingBottom}
      // paddingX={props.paddingX}
      // paddingY={props.paddingY}
      // padding={props.padding}
      {...props}
      spacing={sp()} 
      sx={{...style, ...props.sx}}
      onClick={props.onClick}>
      {props.children}
    </Stack>
  );
}

export default StackRowCentered;