import { Grid, Typography } from "@suid/material";
import StackRowCentered from "./StackRowCentered";
import style from "../global/style";

const HeaderEl = (props) => {
  return (
    <Grid item container xs={12}  backgroundColor={style.palette.white}>
        <Grid item xs={1}></Grid>
        <Grid item container xs={10}>
          <StackRowCentered height={"15vh"}>
              {/* <Typography paddingTop={4} align="center" fontSize={"1.2em"}>FEATURES</Typography> */}
              <props.icon sx={{fontSize:"4.1em"}}/>
              <Typography variant="h1" fontSize={"4.3em"} lineHeight={1.3}>
                {props.children}
              </Typography>
          </StackRowCentered>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
  );
}

export default HeaderEl;