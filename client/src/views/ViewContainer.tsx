import { Grid } from "@suid/material";
import AppBar from "../components/Navbar/AppBar";
import style from "../global/style";

const ViewContainer = (props) => {
  return (
    <Grid container>
      {/* <Grid item xs={12}>
        <AppBar/>
      </Grid> */}

      <Grid item container xs={12} paddingTop={style.appbar.height}>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default ViewContainer;