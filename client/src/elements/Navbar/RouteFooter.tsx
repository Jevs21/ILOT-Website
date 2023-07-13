import { Grid, Divider, Typography, Stack } from "@suid/material";
import { useGlobalContext } from "../../global/store";
import logo from "../../assets/ILOTLogoGray.png";
import StackRowCentered from "../StackRowCentered";
import style from "../../global/style";

const RouteFooter = (props) => {
  const {navigate} = useGlobalContext();
  const s = {
    opacity: 0.8,
    width: "90px",
    objectFit: "contain",
    justifyContent: 'center'
  }
  return (
    <Stack width={"100%"} sx={{backgroundColor: style.appbar.backgroundColor, justifyContent: 'center'}}>
      <Grid item xs={12} paddingTop={2}>
        <Divider/>
      </Grid>
      <Grid 
        container item xs={12} 
        marginTop={1} 
        padding={1} 
        justifyContent="center">
          <img src={logo} style={s}/>
      </Grid>
      <Stack width={"100%"} py={2} sx={{backgroundColor: style.appbar.backgroundColor, justifyContent: 'center'}}>
        <Typography sx={{cursor: "pointer"}} color={style.palette.white} variant="body2" align="center" onClick={() => navigate('/privacypolicy')}>PRIVACY POLICY</Typography>
        <Typography sx={{cursor: "pointer"}} color={style.palette.white} variant="body2" align="center" onClick={() => navigate('/termsandconditions')}>TERMS AND CONDITIONS</Typography>
      </Stack>
    </Stack>
  )
}

export default RouteFooter;