import { Grid } from "@suid/material";
import { For } from "solid-js";
import CardEl from "../CardEl";
import SectionHeaderEl from "../SectionHeaderEl";
import BasicVehicleListRow from "./BasicVehicleListRow";

const BasicVehicleList = (props) => {
  return (
    <>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <SectionHeaderEl>{props.title.toLocaleUpperCase()}</SectionHeaderEl>
        </Grid>

        <Grid item xs={12}>
          <CardEl>
            <Grid container item>
              <For each={props.rows}>{(v, i) =>
                <BasicVehicleListRow
                  v={v} 
                  is_even={(i() % 2 == 0)}
                  dt_key={props.dt_key}
                  day_str={props.day_str}/>
              }</For>
            </Grid>
          </CardEl>
        </Grid>
      </Grid>
    </>
  );
}

export default BasicVehicleList;