import { Checkbox, Stack, Typography } from "@suid/material";
import CardEl from "./CardEl";
import StackRowCentered from "./StackRowCentered";
import { For } from "solid-js";
import style from "../global/style";

const DemoTaskListEl = (props) => {
  const tasks_list = [
    [
      { id: 1, task: "Service vehicle", user: "James Wilson", created: new Date(), complete: Math.round(Math.random()) },
      { id: 2, task: "Wash car", user: "Emily Chen", created: new Date(), complete: Math.round(Math.random()) },
      { id: 3, task: "Replace brakes", user: "Peter Smith", created: new Date(), complete: Math.round(Math.random()) },
      { id: 10, task: "Refill fluids", user: "Linda Jones", created: new Date(), complete: Math.round(Math.random()) }
    ],
    [
      { id: 1, task: "Service vehicle", user: "James Wilson", created: new Date(), complete: Math.round(Math.random()) },
      { id: 2, task: "Wash car", user: "Emily Chen", created: new Date(), complete: Math.round(Math.random()) },
      { id: 3, task: "Replace brakes", user: "Peter Smith", created: new Date(), complete: Math.round(Math.random()) },
      { id: 4, task: "Oil change", user: "Sarah Johnson", created: new Date(), complete: Math.round(Math.random()) },
    ],
    [
      { id: 5, task: "Tire rotation", user: "Michael Lee", created: new Date(), complete: Math.round(Math.random()) },
      { id: 6, task: "Clean interior", user: "Elizabeth Nguyen", created: new Date(), complete: Math.round(Math.random()) },
    ],
    [
      { id: 6, task: "Clean interior", user: "Elizabeth Nguyen", created: new Date(), complete: Math.round(Math.random()) },
      { id: 7, task: "Inspect engine", user: "David Kim", created: new Date(), complete: Math.round(Math.random()) },
      { id: 8, task: "Align wheels", user: "Jennifer Smith", created: new Date(), complete: Math.round(Math.random()) },
    ],
    [
      { id: 4, task: "Oil change", user: "Sarah Johnson", created: new Date(), complete: Math.round(Math.random()) },
      { id: 5, task: "Tire rotation", user: "Michael Lee", created: new Date(), complete: Math.round(Math.random()) },
      { id: 9, task: "Repair transmission", user: "Christopher Brown", created: new Date(), complete: Math.round(Math.random()) },
    ],
    []
  ];
  
  return (
    <CardEl>
      <Stack minHeight={"25vh"}>
        <For each={tasks_list[props.status_id]}>{(task, i) => {
          const s = (i() % 2 == 0) ? {...style.treven} : {...style.trodd}
          return (
            <StackRowCentered 
              justifyContent="space-between" 
              sx={{...style.tr, ...s}}>
              <Typography px={2} sx={{textDecoration: (task.complete == 1) ? 'line-through' : 'none'}}>{task.task} @{task.user}</Typography>
              <StackRowCentered width="30%" justifyContent="right">
                <Typography>{task.created.toLocaleDateString()}</Typography>
                <Checkbox checked={(task.complete == 1)}/>
              </StackRowCentered>
            </StackRowCentered>
          );
        }}</For>
      </Stack>
    </CardEl>
  );
};

export default DemoTaskListEl;