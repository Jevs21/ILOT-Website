import { Stack, Typography } from "@suid/material";
import { createMemo, createSignal, Show } from "solid-js";
import VehicleLog from "../../models/VehicleLog";
import StackRowCentered from "../StackRowCentered";
import style from "../../global/style";

const VehicleActivityHistoryDaySummary = (props) => {
  const today = new Date();
  const [dayStr, setDayStr] = createSignal(props.data[0] as string);
  const [log, setLog] = createSignal(props.data[1] as VehicleLog[]);
  const counts = createMemo(() => {
    let c = {task: 0, status: 0, note: 0}
    for (let l of log()) {
      c[l.t] += 1;
    }
    return c;
  })
  return (
    <Show when={dayStr() != today.toISOString().substring(0, 10)}>
      <StackRowCentered 
      padding={1} 
      sx={{...style.tr, ...props.sx}} 
      justifyContent="space-between"
      onClick={props.onClick}>
        <Stack>
          <Typography variant="body2">{dayStr()}</Typography>
          <Show when={counts().status > 0}>
            <Typography>{counts().status} status change{(counts().status != 1) ? 's' : ''}.</Typography>
          </Show>
          <Show when={counts().task > 0}>
            <Typography>{counts().task} task change{(counts().task != 1) ? 's' : ''}.</Typography>
          </Show>
          <Show when={counts().note > 0}>
            <Typography>{counts().note} note change{(counts().note != 1) ? 's' : ''}.</Typography>
          </Show>
        </Stack>
        <Stack>
          <Typography variant="body2" paddingRight={2}>VIEW CHANGES</Typography>
        </Stack>
      </StackRowCentered>
    </Show>
  );
}

export default VehicleActivityHistoryDaySummary;