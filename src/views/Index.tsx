import { Container, Grid, Stack, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import logo from "../assets/ILOTLogo.png";
import { useGlobalContext } from "../global/store";

const Index = () => {
  const {isMobile} = useGlobalContext();
  
  return (
    <>
      <Grid item xs={1} sm={3}></Grid>
      <Grid item container xs={10} sm={6}>
        <StackRowCentered 
          height={"100vh"}
          justifyContent="center">
            <Stack spacing={2}>
                <img src={logo} style={{
                  "display": "block",
                  "max-width": '365px', 
                  "max-height": '179px', 
                  width: (isMobile()) ? 'auto' : '100%',
                  height: 'auto',
                  "border-radius": "67px",
                  "-webkit-box-shadow": "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                  "box-shadow": "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                  }}/>
                
              <Typography paddingTop={6} align="center" fontSize={"1.3em"}>ILOT Software is under construction.</Typography>
              <Typography align="center" fontWeight={600} fontSize={"1.3em"}>Coming April 2023</Typography>
            </Stack>
        </StackRowCentered>
      </Grid>
      <Grid item xs={1} sm={3}></Grid>

    </>

  );
};

export default Index;
