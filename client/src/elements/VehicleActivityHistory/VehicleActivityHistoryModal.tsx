import { Stack, Typography } from "@suid/material";
import { For } from "solid-js";
import ModalBoxEl from "../ModalBoxEl";
import VehicleActivityHistoryDayRow from "./VehicleActivityHistoryDayRow";

const VehicleActivityHistoryModal = (props) => {
  return (
    <ModalBoxEl>
      <Stack maxHeight="500px" sx={{position: "relative", overflow: "scroll"}}>
        <Typography fontSize="1em" fontWeight={600} paddingBottom={2}>Changes: {props.dayStr}</Typography>
        <For each={props.logs}>{(cur) =>
          <VehicleActivityHistoryDayRow row={cur}/>
        }</For>
      </Stack>
    </ModalBoxEl>
  );
}

export default VehicleActivityHistoryModal;