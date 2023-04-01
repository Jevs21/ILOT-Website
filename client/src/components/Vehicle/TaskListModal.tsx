import { Delete } from "@suid/icons-material";
import { Box, Button, InputLabel, Stack, TextField, Typography } from "@suid/material";
import { createSignal, createMemo, Show } from "solid-js";
import SearchableUserSelect from "../../elements/SearchableUserSelect";
import { useGlobalContext } from "../../global/store";

const TaskTextInput = (props) => (
  <>
    <InputLabel for="task_text_input">Task</InputLabel>
    <TextField 
      // NEED TO MAKE THIS MULTILINE AND LIMITED
      // multiline
      // minRows={3}
      // maxRows={4}
      id="task_text_input"
      value={props.value} 
      autoComplete="off"
      fullWidth
      onChange={props.onChange}
      variant='standard' 
      inputProps={{maxLength: 499}}/>
  </>
);

// const TaskUserSelect = (props) => {
//   const [val, setVal] = createSignal(props.value);
//   const handleChange  = (e: SelectChangeEvent) => {
//     setVal(e.target.value);
//     props.onChange(e.target.value);
//   }
//   return (
//     <Select
//       value={val()}
//       variant="standard"
//       label="Assigned User"
//       onChange={handleChange}>
//         <MenuItem value="">None</MenuItem>
//         <For each={props.users}>{(u) => 
//           <MenuItem value={u.uuid}>{u.full_name}</MenuItem>
//         }</For>
//       </Select>
//   )
// }


const TaskListModal = (props) => {
  const { apiCall } = useGlobalContext();

  const createNewTask = async (uuid, text) => ( await apiCall('/vehicle/add_vehicle_task', 'POST', {}, {v_id: props.v_id, task: text, uuid: uuid}))
  const editTask = async (uuid, text) => ( await apiCall('/vehicle/edit_vehicle_task', 'POST', {}, {t_id: props.task.id, v_id: props.v_id, task: text, uuid: uuid, completed: props.task.completed}))
  const deleteTask = async () => ( await apiCall('/vehicle/delete_vehicle_task', 'POST', {}, {t_id: props.task.id, v_id: props.v_id}) );

  const [isDeleting, setIsDeleting] = createSignal(false);
  
  const [assignedUuid, setAssignedUuid] = createSignal(props.task.uuid);
  const handleSelectChange = (uuid) => { 
    setAssignedUuid(uuid);
  }

  const [taskText, setTaskText] = createSignal(props.task.task);
  
  const title = createMemo(() => {
    if (isDeleting()) return "Delete Task";

    switch(props.operation) {
      case 1:
        return "Edit Task";
      case 2:
        return "Create Task";
      case 3:
        return "Delete Task";
    }
    return "";
  });

  
  const isConfirmDisabled = createMemo(() => {
    if (isDeleting()) return false;
    if (taskText().length == 0) return true;
    if (assignedUuid() == props.task.uuid && taskText() == props.task.task) {
      return true;
    }
    return false;
  });
  const confirmPressed = async () => {
    if (props.operation == 1) {
      if (isDeleting()) {
        // Delete
        await deleteTask();
      }
      else {
        // Edit
        await editTask(assignedUuid(), taskText());
      }
    }
    else if (props.operation == 2) {
      // Create
      await createNewTask(assignedUuid(), taskText());
    }
    // Close Modal
    props.closeModal(true);
  }

  return (
    <Stack spacing={1}>
      <Typography variant="h2" marginY={1} paddingBottom={1} align="center">{title()}</Typography>

      <Show 
        when={!isDeleting()}
        fallback={<Typography>Are you sure you want to delete this task?</Typography>}>
        {/* <Show when={props.user_list.length > 0}>
          <TaskUserSelect 
            value={assignedUuid()} 
            users={props.user_list}
            onChange={handleSelectChange}/>
        </Show> */}
        <SearchableUserSelect value={assignedUuid()} onChange={handleSelectChange}/>
        <Box height="10px"></Box>
        <TaskTextInput 
          value={taskText()}
          onChange={(e) => setTaskText((e.target as HTMLInputElement).value)}/>

        <Show when={props.operation == 1}>
          <Stack direction="row" paddingTop={1} justifyContent="center">
            <Button 
              color="error" 
              endIcon={<Delete/>} 
              sx={{fontSize: "0.7em"}}
              onClick={() => setIsDeleting(true)}>Delete task</Button>
          </Stack>
        </Show>
      </Show>
      
      <Stack direction="row" paddingTop={1} justifyContent="space-around">
        <Button onClick={() => props.closeModal()} color="error">
          Cancel
        </Button>


        <Button 
          disabled={isConfirmDisabled()}
          onClick={confirmPressed} 
          color="success">
            Confirm
        </Button>
      </Stack>
    </Stack>
  );
}

export default TaskListModal;