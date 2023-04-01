import { Typography } from "@suid/material";

const VehicleActivityHistoryNoteChange = (props) => {
  return (
    <Typography>Note changed to: "{props.data.to_note}"</Typography>
  )
}
export default VehicleActivityHistoryNoteChange;