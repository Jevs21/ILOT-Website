import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@suid/icons-material";
import { Grid, Typography, IconButton } from "@suid/material";
import { createMemo, createSignal, Show } from "solid-js";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";

const TaskListRow = (props) => {
  const { apiCall, userList } = useGlobalContext();

  const [taskId, setTaskId] = createSignal(props.task.id);
  const [text, setText] = createSignal(props.task.task);
  const [isChecked, setIsChecked] = createSignal(props.task.completed);
  const assignedUser = createMemo(() => {
    for(let u of userList()) {
      if (u.uuid == props.task.uuid) return u.full_name
    }
    return "";
  })

  const toggleTaskComplete = async (id, val) => await apiCall('/vehicle/toggle_task_complete', 'POST', {}, {t_id: id, v_id: props.v_id, val: val});

  const TaskText = () => (
    <Grid item xs={11}  sx={{ display: 'flex', alignItems:'center'}}>
      {/* <Typography>{(uuid().length > 0) && `@${uuid()}`} {text()}</Typography> */}
      <Typography 
        component="span"
        sx={{textDecoration: (isChecked()) ? "line-through" : "none"}}>{text()} {(assignedUser().length > 0) && `@${assignedUser()}`}</Typography>
    </Grid>
  );

  const CheckBox = () => {
    const CheckboxChecked = async () => {
      const res = await toggleTaskComplete(taskId(), !isChecked());
      setIsChecked(!isChecked());
      props.refetchTasks();
    }
    return (
      <Grid item xs={1}>
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
      <CheckBox/>  
    </Grid>
  );
}

export default TaskListRow;