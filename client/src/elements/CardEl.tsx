import { Card } from "@suid/material";

const style = {
  width: '100%',
  borderRadius: '9px'
}

const CardEl = (props) => {
  return (
    <Card elevation={0} sx={style}>{props.children}</Card>
  );
}

export default CardEl;