import { Grid } from "@suid/material";
import AppBar from "../components/Navbar/AppBar";

const ViewContainer = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <AppBar/> */}
      </Grid>

      <Grid item container xs={12}>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default ViewContainer;