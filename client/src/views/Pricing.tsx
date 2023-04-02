import { Grid, Stack, Typography, Button } from "@suid/material";
import LogoLarge from "../elements/Logo/LogoLarge";
import StackRowCentered from "../elements/StackRowCentered";

const Pricing = () => {
  return (
    <>
      <Grid item xs={1} sm={3} md={4}></Grid>
      <Grid item container xs={10} sm={6} md={4}>
        <StackRowCentered 
          height={"100vh"}
          justifyContent="center">
            <Stack spacing={2}>
              <LogoLarge/>
              <Typography paddingY={3} align="center" fontWeight={600} fontSize={"1.3em"}>PRICING</Typography>
            </Stack>
        </StackRowCentered>
      </Grid>
      <Grid item xs={1} sm={3} md={4}></Grid>
    </>
  );
};

export default Pricing;