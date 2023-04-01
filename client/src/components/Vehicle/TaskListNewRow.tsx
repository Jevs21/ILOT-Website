import { Add } from "@suid/icons-material";
import { Grid, Typography, Stack } from "@suid/material";
import style from "../../global/style";

const TaskListNewRow = (props) => {
  const OpenNewTaskModalBtn = (props) => {
    return (
      <Grid item xs={12} padding={1} onClick={props.onClick}>
          <Stack direction="row" justifyContent="center">
            <Typography>Add New Task</Typography>
            <Add fontSize="small"/>
          </Stack>
      </Grid>
    );
  }

  return (
    <Grid container item paddingX={2} xs={12} sx={(props.isEven) ? style.treven : style.trodd}>
      <OpenNewTaskModalBtn onClick={props.onClick}/>
    </Grid>
  );
}

export default TaskListNewRow;