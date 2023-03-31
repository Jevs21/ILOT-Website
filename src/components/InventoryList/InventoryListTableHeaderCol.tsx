import { ArrowDownward, ArrowUpward } from "@suid/icons-material";
import { Grid, Typography } from "@suid/material";
import { Show } from "solid-js";

const style = {
  arrow_icon: {
    marginLeft: "5px",
    fontSize: "0.95em",
    fontWeight: 900
  }
}

const InventoryListTableHeaderCol = (props) => (
  <Grid item xs={props.xs} sm={props.sm} onClick={() => props.handleSort(props.key)}>
    {/* <Stack direction="row"> */}
      <Typography 
        align={props.align} 
        variant="body1" 
        fontWeight={600} 
        component='div' 
        
        sx={props.sx}>
          
          {props.text}
          
          <Show when={props.curSort.key == props.key}>
            <Show when={props.curSort.dir == "asc"} fallback={<ArrowUpward sx={style.arrow_icon}/>}>
              <ArrowDownward sx={style.arrow_icon}/>
            </Show>
          </Show>
      </Typography>
      {/* </Stack> */}
  </Grid>
);

export default InventoryListTableHeaderCol;