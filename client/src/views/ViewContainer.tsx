import { Grid } from "@suid/material";
import AppBar from "../elements/Navbar/AppBar";
import style from "../global/style";
import RouteFooter from "../elements/Navbar/RouteFooter";
import HeaderEl from "../elements/RouteHeader";

const ViewContainer = (props) => {
  return (
    <Grid container>
      <Grid container item xs={12} sx={{overflowX: 'hidden'}}>
        <AppBar/>
      </Grid>

      <Grid item container xs={12} paddingTop={style.appbar.height} sx={{overflowX: 'hidden'}}>
        <HeaderEl />
        
        {props.children}

        <RouteFooter/>
      </Grid>
    </Grid>
  )
}

export default ViewContainer;