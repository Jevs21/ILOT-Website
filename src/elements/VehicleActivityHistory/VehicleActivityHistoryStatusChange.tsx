import { Typography } from "@suid/material";
import StatusChip from "../StatusChip";

const VehicleActivityHistoryStatusChange = (props) => {
  if (props.data.s_from == 0 && props.data.s_to == 0) {
    return (
      <>
        <Typography>New vehicle</Typography>
        <StatusChip csize="small" sx={{fontSize: '0.7em'}} status_id={props.data.s_from}/>
      </>
    )
  } else {
    return (
    <>
    <Typography>From</Typography>
    <StatusChip csize="small" sx={{fontSize: '0.7em'}} status_id={props.data.s_from}/>
    <Typography>to</Typography>
    <StatusChip csize="small" sx={{fontSize: '0.7em'}} status_id={props.data.s_to}/>
    </>
    )
  }
}
export default VehicleActivityHistoryStatusChange;