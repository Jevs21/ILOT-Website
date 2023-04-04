import { Grid, Typography } from "@suid/material";
import StackRowCentered from "./StackRowCentered";

const SectionHeaderEl = (props) => (
  <Grid item container xs={12}>
    <Grid item xs={1}></Grid>
    <Grid item container xs={10}>
      <StackRowCentered>
        <Typography variant="h1" p={1} py={3} paddingTop={8}>{props.children}</Typography>
      </StackRowCentered>
    </Grid>
    <Grid item xs={1}></Grid>
  </Grid>
);


export default SectionHeaderEl;