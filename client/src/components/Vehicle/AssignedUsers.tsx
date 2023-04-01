import { Delete } from "@suid/icons-material";
import { Avatar, Card, Grid, IconButton, Typography } from "@suid/material";
import { For } from "solid-js";
import style from "../../global/style";

const s = {
  ...style.card,
  ...{
    background: style.palette.bg,
    border: `solid 1px ${style.palette.grey[0]}`,
    marginY: 1
  }
}

const UserCard = (props) => {
  const removeUser = async () => {
    console.log("Removing user")
  }

  return (
    <Card sx={s}>
      <Grid item container paddingX={2} paddingY={1} xs={12}>
        <Grid item xs={2}>
          <Avatar>{props.user[0]}</Avatar>
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex', alignItems:'center'}}>
          <Typography>{props.user}</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={removeUser}><Delete sx={{opacity: 0.9, '&:hover': {opacity: 0.7}}}/></IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}
export default function AssignedUsers(props) {
  // const [users, setUsers] = createSignal(props.users)
  return (
    <For each={props.users}>
      {(user, i) => (
        <UserCard user={user}/>
      )}
    </For>
  );
}