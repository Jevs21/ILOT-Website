import { Grid, Stack, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { lazy } from "solid-js";
const LogoLarge = lazy(() => import("../elements/Logo/LogoLarge"));

const Index = () => {
  return (
    <>
      <Grid item xs={1} sm={3} md={4}></Grid>
      <Grid item container xs={10} sm={6} md={4}>
        <StackRowCentered 
          height={"100vh"}
          justifyContent="center">
            <Stack spacing={2}>
              <LogoLarge/>
              <Typography paddingTop={4} align="center" fontSize={"1.2em"}>FEATURES</Typography>
              <Typography paddingTop={1} align="center" fontWeight={600} fontSize={"1.3em"}>Coming April 2023</Typography>
            </Stack>
        </StackRowCentered>
      </Grid>
      <Grid item xs={1} sm={3} md={4}></Grid>
    </>
  );
};

export default Index;
