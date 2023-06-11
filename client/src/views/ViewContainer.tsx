import { Grid } from "@suid/material";
import AppBar from "../elements/Navbar/AppBar";
import style from "../global/style";
import RouteFooter from "../elements/Navbar/RouteFooter";
import HeaderEl from "../elements/RouteHeader";

const ViewContainer = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar/>
      </Grid>

      <Grid item container xs={12} paddingTop={style.appbar.height}>
        <HeaderEl />
        
        {props.children}

        <RouteFooter/>
      </Grid>
    </Grid>
  )
}

export default ViewContainer;