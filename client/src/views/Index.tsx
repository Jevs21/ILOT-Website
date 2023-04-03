import { Grid, Stack, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { createEffect, createResource, lazy } from "solid-js";
// import LogoLarge from "../elements/Logo/LogoLarge";
import { useGlobalContext } from "../global/store";
import TestSVG from "../assets/TestSVG";
const LogoLarge = lazy(() => import("../elements/Logo/LogoLarge"));
// const TestImage = lazy(() => import("../assets/TestImage.svg"));
// const TestImage = import("../assets/TestImage.svg");
// import TestImage 

const Index = (props) => {
  const {apiCall} = useGlobalContext();
  // const fetchTest = async () => ( await apiCall("/wp-json/wp/v2/posts") )
  // const [data] = createResource(fetchTest);

  // createEffect(() => {
  //   if (data.loading) {
  //     console.log("loading");
  //   } else {
  //     console.log(data());
  //   }
  // });

  return (
    <>
      <Grid item xs={1}></Grid>
      <Grid item container xs={10}>
        {/* <StackRowCentered 
          height={"100vh"}
          justifyContent="center">
            <Stack spacing={2}>
              <LogoLarge/>
              <Typography paddingTop={4} align="center" fontSize={"1.2em"}>ILOT Software is under construction.</Typography>
              <Typography paddingTop={1} align="center" fontWeight={600} fontSize={"1.3em"}>Coming April 2023</Typography>
            </Stack>
        </StackRowCentered> */}
        <Grid 
          backgroundColor="#AA22FF" 
          item container 
          xs={11}
          justifyContent="center"
          py={8}>
          <Stack>
            <Typography variant="h1" paddingY={8}>
              Ditch the sticky notes and messy spreadsheets.
            </Typography>
            <Typography variant="h5">
              Easily track your dealership's inventory so you can accelerate sales.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={7}></Grid>
        <Grid 
          backgroundColor="#AA2211" 
          item container 
          xs={5} 
          justifyContent="center">
          {/* <LogoLarge/> */}
          <StackRowCentered>
          <TestSVG width={620} height={482}/>
          {/* <TestSVG width={310} height={241}/> */}

          </StackRowCentered>
          {/* {() => TestImage} */}
          {/* <img src={TestImage} alt="test image" /> */}
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </>
  );
};

export default Index;
