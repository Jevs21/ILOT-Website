import { Grid, Typography } from "@suid/material";

export default function KeyMetrics(props) {
  return (
    <Grid container spacing={1} padding={2}>
      <Grid item xs={12}>
        <Typography variant={(props.size == "large") ? "h1" : "h6"} component="div">
          {props.val}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography style={(props.size == "large") ? "subtitle1" : "subtitle2"} component="div">
          {props.key}
        </Typography>
      </Grid>
    </Grid>
  );
}