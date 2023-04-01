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

const BasicTableHeaderCol = (props) => (
  <Grid item xs={props.xs} sm={props.sm} onClick={() => props.handleSort(props.key)} sx={props.sx}>
    <Typography 
      align={props.align} 
      variant="body1" 
      fontWeight={600} 
      component='div'>
        
        {props.text}
        
        <Show when={props.curSort.key == props.key}>
          <Show when={props.curSort.dir == "asc"} fallback={<ArrowUpward sx={style.arrow_icon}/>}>
            <ArrowDownward sx={style.arrow_icon}/>
          </Show>
        </Show>
    </Typography>
  </Grid>
);

export default BasicTableHeaderCol;