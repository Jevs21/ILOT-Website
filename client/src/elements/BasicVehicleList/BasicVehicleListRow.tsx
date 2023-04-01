import { Grid, Typography } from "@suid/material";
import { createMemo } from "solid-js";
import { useGlobalContext } from "../../global/store";
import StackRowCentered from "../StackRowCentered";
import StatusChip from "../StatusChip";
import style from "../../global/style";
import { getStringFromTimeDiff } from "../../global/helpers";

const BasicVehicleListRow = (props) => {
  const {navigate} = useGlobalContext();
  const timeSince = createMemo(() => {
    const dt  = new Date(props.v[props.dt_key]);
    const now = new Date();
    const diff = dt.getTime() - now.getTime();
    
    return getStringFromTimeDiff(diff);
  });

  const row_style = (props.is_even) ? style.treven : style.trodd
  
  return (
    <Grid 
      item container xs={12}
      paddingY={0.5} paddingX={1}
      onClick={() => navigate(`/vehicle/${props.v.id}`)}
      sx={{...style.tr, ...row_style}}>
      <StackRowCentered>
        <Grid item xs={5}>
          <Typography>{props.v.model_year} {props.v.make} {props.v.model}</Typography>
        </Grid>
        <Grid item xs={3}>
            <StatusChip status_id={props.v.status_id} csize="small"/>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{props.day_str} {timeSince()} ago</Typography>
        </Grid>
      </StackRowCentered>
    </Grid>
  )

}

export default BasicVehicleListRow;