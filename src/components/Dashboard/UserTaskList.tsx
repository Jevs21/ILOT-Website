import { Visibility, VisibilityOff } from "@suid/icons-material";
import { Button, Grid, Typography } from "@suid/material";
import { createResource, createSignal, onMount, Show, For, createMemo } from "solid-js";
import CardEl from "../../elements/CardEl";
import SectionHeaderEl from "../../elements/SectionHeaderEl";
import StackRowCentered from "../../elements/StackRowCentered";
import { useGlobalContext } from "../../global/store";
import UserTaskListRow from "./UserTaskListRow";


export function UserTaskList(props) {
  const { apiCall, navigate, fullname, uuid } = useGlobalContext();

  const [showCompleted, setShowCompleted] = createSignal(false);
  const toggleShowCompleted = () => setShowCompleted(!showCompleted())

  const fetchUserTasks = async () => ( await apiCall('/vehicle/get_user_tasks') );
  const [tasks, {mutate, refetch}] = createResource(fetchUserTasks);
  const taskList = createMemo(() => {
    if (!tasks.loading) {
      if (showCompleted()) {
        return tasks().filter(task => task.completed == false)
          .concat(tasks().filter(task => task.completed == true))
      } else {
        return tasks().filter(task => task.completed == showCompleted())
      }
    }
    return []
  })

  const fetchUserTaskCompletions = async (id) => ( await apiCall('/vehicle/get_user_task_completions', 'GET', { uuid: id }))
  const [taskComp, setTaskComp] = createSignal(0);
  const tasksCompletedToday = createMemo(() =>  `${taskComp()} task${(taskComp() == 1) ? "" : "s"} completed today.`);

  const refreshUserTaskList = async () => {
    refetch()
    const res = await fetchUserTaskCompletions(uuid()); 
    setTaskComp(res.count);
  }

  onMount(async () => {
    const res = await fetchUserTaskCompletions(uuid()); 
    setTaskComp(res.count);
  })

  const rowClicked = (e, task) => {
    console.log(e.target.classList);
    if (!e.target.classList.contains("task_list_checkbox")) {
      navigate(`/vehicle/${task.v_id}`);
      return;
    }
  }

  return (
    <Grid container item xs={12}>
      <SectionHeaderEl>MY TASKS:</SectionHeaderEl>
      <CardEl>
        <Show when={!tasks.loading}>
          <Grid container item xs={12}>
            <Grid container item paddingY={1} paddingX={2} xs={12} justifyContent="space-between">
              <StackRowCentered justifyContent="space-between">
              {/* <Grid item padding={1}> */}
                <Typography variant="body2" component="div">
                  {tasksCompletedToday()}
                </Typography>
              {/* </Grid> */}
              {/* <Grid item> */}
                <Button onClick={toggleShowCompleted}>
                  {(showCompleted()) ? <Typography variant="body2">Hide</Typography> : <Typography variant="body2">Show All</Typography> }
                  {(showCompleted()) ? <VisibilityOff fontSize="small"/> : <Visibility fontSize="small"/> }
                </Button>
              {/* </Grid> */}
              </StackRowCentered>
            </Grid>
            <Grid container item xs={12}>
              <For each={taskList()}>
                {(task, i) => (
                  <UserTaskListRow 
                    task={task} 
                    refetchTasks={refreshUserTaskList} 
                    onClick={(e) => rowClicked(e, task)}
                    isEven={(i() % 2 == 0)}/>
                )}
              </For>
            </Grid>
          </Grid>
        </Show>
      </CardEl>
    </Grid>
  );
}
