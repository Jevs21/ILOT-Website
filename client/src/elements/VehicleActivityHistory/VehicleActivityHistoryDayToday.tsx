import { Grid, Typography } from "@suid/material";
import { For, Show } from "solid-js";
import VehicleActivityHistoryNoneRow from "./VehicleActivityHistoryNoneRow";
import style from "../../global/style";
import VehicleActivityHistoryDayRow from "./VehicleActivityHistoryDayRow";
import StackRowCentered from "../StackRowCentered";

const VehicleActivityHistoryDayToday = (props) => {
  return (
    <Grid item container xs={12} padding={1} sx={{...style.tr, ...style.treven}} onClick={props.onClick}>
      <Grid item xs={12}>
        <Typography variant="body2">TODAY</Typography>
      </Grid>
      <Grid item xs={12}>
        <Show 
          when={props.log.length > 0}
          fallback={<VehicleActivityHistoryNoneRow/>}>
            <For each={props.log.slice(0,5)}>{(cur) => 
              <VehicleActivityHistoryDayRow row={cur}/>
            }</For>

            <Show when={props.log.length > 5}>
              <StackRowCentered paddingY={1} justifyContent="center">
                <Typography variant="body2">VIEW {props.log.slice(5).length} MORE CHANGES</Typography>
              </StackRowCentered>
            </Show>
        </Show>
      </Grid>
    </Grid>
  );
}

export default VehicleActivityHistoryDayToday;