import { Box, Typography } from "@suid/material";
import { createMemo } from "solid-js";
import VehicleNoteLog from "../../models/VehicleNoteLog";
import VehicleStatusLog from "../../models/VehicleStatusLog";
import VehicleTaskLog from "../../models/VehicleTaskLog";
import StackRowCentered from "../StackRowCentered";
import VehicleActivityHistoryNoteChange from "./VehicleActivityHistoryNoteChange";
import VehicleActivityHistoryStatusChange from "./VehicleActivityHistoryStatusChange";
import VehicleActivityHistoryTaskChange from "./VehicleActivityHistoryTaskChange";

const VehicleActivityHistoryDayRow = (props) => {
  const timeStr = createMemo(() => {
    const d = new Date(props.row.dt);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  })

  const content = createMemo(() => {
    if (props.row.t == "task") {
      return <VehicleActivityHistoryTaskChange data={props.row.data as VehicleTaskLog}/>
    }
    else if (props.row.t == "status") {
      return <VehicleActivityHistoryStatusChange data={props.row.data as VehicleStatusLog}/>
    }
    else if (props.row.t == "note") {
      return <VehicleActivityHistoryNoteChange data={props.row.data as VehicleNoteLog}/>
    }
  })
  return (
    <StackRowCentered paddingY={1}>
      <Box width="40px">
        <Typography fontWeight={600}>{timeStr()}</Typography>
      </Box>
      {content()}
    </StackRowCentered>
  );
}

export default VehicleActivityHistoryDayRow;