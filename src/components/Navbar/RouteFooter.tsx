import { Grid, Divider, Typography } from "@suid/material";
import { useGlobalContext } from "../../global/store";
import logo from "../../assets/ILOTLogoGray.png";

const RouteFooter = (props) => {
  const {navigate} = useGlobalContext();
  const s = {
    opacity: 0.8,
    width: "90px",
    objectFit: "contain",
    justifyContent: 'center'
  }
  return (
    <>
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
      <Grid item xs={12}>
        <Typography sx={{cursor: "pointer"}} variant="body2" align="center" onClick={() => navigate('/privacypolicy')}>PRIVACY POLICY</Typography>
        <Typography sx={{cursor: "pointer"}} variant="body2" align="center" onClick={() => navigate('/termsandconditions')}>TERMS AND CONDITIONS</Typography>
      </Grid>
    </>
  )
}

export default RouteFooter;