import { Grid, Typography } from "@suid/material";

const SectionHeaderEl = (props) => (
  <Grid item xs={12} marginBottom={1} marginTop={2}>
    <Typography variant="body2">{props.children}</Typography>
  </Grid>
);


export default SectionHeaderEl;