import { Typography } from "@suid/material";
import { createMemo } from "solid-js";

const VehicleActivityHistoryTaskChange = (props) => {
  const taskText = createMemo(() => {
    if (props.data.operation == 'CREATE') {
      return `Created task: "${props.data.to_task}"`;
    }
    else if (props.data.operation == 'EDIT') {
      return `Edited task: "${props.data.to_task}"`;
    }
    else if (props.data.operation == 'DELETE') {
      return `Deleted task "${props.data.to_task}"`
    }
    else if (props.data.operation == 'COMPLETE') {
      return `Completed task "${props.data.to_task}"`
    }
  })

  return (
    <Typography>{taskText()}</Typography>
  )
}
export default VehicleActivityHistoryTaskChange;