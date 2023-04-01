import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@suid/icons-material";
import { Grid, Typography, IconButton } from "@suid/material";
import { createMemo, createSignal, Show } from "solid-js";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";

const UserTaskListRow = (props) => {
  const { apiCall } = useGlobalContext();

  const [taskId, setTaskId] = createSignal(props.task.id);
  const [text, setText] = createSignal(props.task.task);
  const [isChecked, setIsChecked] = createSignal(props.task.completed);
  const daysOld = createMemo(() => {
    const dt  = new Date(props.task.date_created);
    const now = new Date();
    const diff = dt.getTime() - now.getTime();
    const minDiff = Math.floor(Math.abs(diff / (1000 * 60 )));
    const hourDiff = Math.floor(Math.abs(diff / (1000 * 60 * 60)));
    const dayDiff = Math.floor(Math.abs(diff / (1000 * 60 * 60 * 24)));
    
    if (dayDiff < 1) {
      if (hourDiff < 1) {
        return `${minDiff} min${(minDiff == 1) ? "":"s"}`
      } else {
        return `${hourDiff} hr${(hourDiff == 1) ? "":"s"}`
      }
    } 
    
    return `${dayDiff} day${(dayDiff == 1) ? "":"s"}`
  });

  const toggleTaskComplete = async (id, val) => await apiCall('/vehicle/toggle_task_complete', 'POST', {}, {t_id: id, v_id: props.task.v_id, val: val});
  
  const TaskAge = () => (
    <Grid item xs={3}  sx={{ display: 'flex', alignItems:'center'}}>
      <Typography 
        component="span"
        variant="body2"
        sx={{textDecoration: (isChecked()) ? "line-through" : "none"}}>{daysOld()}</Typography>
    </Grid>
  );

  const TaskText = () => (
    <Grid item xs={8}  sx={{ display: 'flex', alignItems:'center'}}>
      <Typography component="span" sx={{textDecoration: (isChecked()) ? "line-through" : "none"}}>{text()}</Typography>
    </Grid>
  );

  const CheckBox = () => {
    const CheckboxChecked = async () => {
      const res = await toggleTaskComplete(taskId(), !isChecked());
      setIsChecked(!isChecked());
      await props.refetchTasks();
    }
    return (
      <Grid item xs={1} class="task_list_checkbox">
        <IconButton onClick={CheckboxChecked} class="task_list_checkbox">
          <Show 
            when={isChecked() == 0}
            fallback={<CheckBoxOutlined class="task_list_checkbox"/>}>
            <CheckBoxOutlineBlank class="task_list_checkbox"/>
          </Show>
        </IconButton>
      </Grid>
    )
  };

  return (
    <Grid container item 
      paddingX={2} xs={12}
      onClick={props.onClick}
      sx={(props.isEven) ? style.treven : style.trodd}>
      <TaskText/>
      <TaskAge/>
      <CheckBox/>  
    </Grid>
  );
}

export default UserTaskListRow;