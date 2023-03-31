import { Container } from "@suid/material";
import StatusChip from "./StatusChip";

export default function TableStatusChip(props) {
  const style = {
    container: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: props.justify
    }
  }
  
  return (
    <Container sx={style.container}>
      <StatusChip
        status_id={props.status_id}
        csize="small"/>
    </Container>
  );
}