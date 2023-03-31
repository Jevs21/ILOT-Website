import { Typography, LinearProgress } from "@suid/material";
import { createEffect, createSignal } from "solid-js";

const PasswordStrength = (props) => {
  const [value, setValue] = createSignal(0);
  const [lenCheck, setLenCheck]     = createSignal(false);
  const [lowerCheck, setLowerCheck] = createSignal(false);
  const [upperCheck, setUpperCheck] = createSignal(false);
  const [numCheck, setNumCheck]     = createSignal(false);


  const getColor = (b) => (b) ? "green" : "default"
  
  createEffect(() => {
    setLenCheck((props.password.length >= 8))
    setLowerCheck(/[a-z]/.test(props.password))
    setUpperCheck(/[A-Z]/.test(props.password))
    setNumCheck(/[0-9]/.test(props.password))

    let v = 0
    if (lenCheck()) v += 25;
    if (lowerCheck()) v += 25;
    if (upperCheck()) v += 25;
    if (numCheck()) v += 25;

    setValue(v);

    if (value() == 100) {
      props.onValid();
    } else {
      props.onInvalid();
    }
  })
  
  return (
    <>
      <Typography paddingBottom={2}>Password Strength:</Typography>
      <LinearProgress value={value()} variant="determinate"/>
      <Typography color={getColor(lenCheck())} paddingTop={2} paddingX={2}>- At least 8 characters long</Typography>
      <Typography color={getColor(lowerCheck())}  paddingX={2}>- At least 1 lowercase letter [a-z]</Typography>
      <Typography color={getColor(upperCheck())} paddingX={2}>- At least 1 uppercase letter [A-Z]</Typography>
      <Typography color={getColor(numCheck())} paddingX={2}>- At least 1 number [0-9]</Typography>
    </>
  );
}

export default PasswordStrength;