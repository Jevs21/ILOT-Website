import { Grid, Stack, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { createEffect, createResource, lazy } from "solid-js";
// import LogoLarge from "../elements/Logo/LogoLarge";
import { useGlobalContext } from "../global/store";
const LogoLarge = lazy(() => import("../elements/Logo/LogoLarge"));
// const Index = () => {
//   return (
//     <>
//       <Grid item xs={1} sm={3} md={4}></Grid>
//       <Grid item container xs={10} sm={6} md={4}>
//         <StackRowCentered 
//           height={"100vh"}
//           justifyContent="center">
//             <Stack spacing={2}>
//               <LogoLarge/>
//               <Typography paddingTop={4} align="center" fontSize={"1.2em"}>ILOT Software is under construction.</Typography>
//               <Typography paddingTop={1} align="center" fontWeight={600} fontSize={"1.3em"}>Coming April 2023</Typography>
//             </Stack>
//         </StackRowCentered>
//       </Grid>
//       <Grid item xs={1} sm={3} md={4}></Grid>
//     </>
//   );
// };

// import { createGraphQLClient, gql } from "@solid-primitives/graphql";
// import { useGlobalContext } from "../global/store";



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
      <Grid item xs={1} sm={3} md={4}></Grid>
      <Grid item container xs={10} sm={6} md={4}>
        <StackRowCentered 
          height={"100vh"}
          justifyContent="center">
            <Stack spacing={2}>
              <LogoLarge/>
              <Typography paddingTop={4} align="center" fontSize={"1.2em"}>ILOT Software is under construction.</Typography>
              <Typography paddingTop={1} align="center" fontWeight={600} fontSize={"1.3em"}>Coming April 2023</Typography>
            </Stack>
        </StackRowCentered>
      </Grid>
      <Grid item xs={1} sm={3} md={4}></Grid>
    </>
  );
};

export default Index;
