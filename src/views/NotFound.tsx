import { Button, Grid, Stack, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { lazy } from "solid-js";
import { useGlobalContext } from "../global/store";
const LogoLarge = lazy(() => import("../elements/Logo/LogoLarge"));
const HomeIcon = lazy(() => import("@suid/icons-material/Home"));
const ArrowBackIcon = lazy(() => import("@suid/icons-material/ArrowBack"));

const NotFound = () => {
  const {navigate, prevRoute} = useGlobalContext();
  return (
    <>
      <Grid item xs={1} sm={3} md={4}></Grid>
      <Grid item container xs={10} sm={6} md={4}>
        <StackRowCentered 
          height={"100vh"}
          justifyContent="center">
            <Stack spacing={2}>
              <LogoLarge/>
              <Typography paddingY={3} align="center" fontWeight={600} fontSize={"1.3em"}>404 Page Not Found.</Typography>
              <StackRowCentered justifyContent="center">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate(prevRoute())}
                  endIcon={<ArrowBackIcon/>}
                  sx={{width: '40%'}}>Back</Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate("/")}
                  endIcon={<HomeIcon/>}
                  sx={{width: '40%'}}>Home</Button>
              </StackRowCentered>
            </Stack>
        </StackRowCentered>
      </Grid>
      <Grid item xs={1} sm={3} md={4}></Grid>
    </>
  );
};

export default NotFound;
