import { Typography, Grid, Box, Stack, Button } from "@suid/material";
import { createEffect, createMemo, createSignal, lazy, onCleanup, Show } from "solid-js";
import TestSVG from "../../assets/TestSVG";
import { useGlobalContext } from "../../global/store";
import StackRowCentered from "../StackRowCentered";
import DisplayText from "../DisplayText";
import IndexSectionContainer from "./IndexSectionContainer";

const ExtensionIcon = lazy(() => import("@suid/icons-material/Extension"));
const PaymentIcon = lazy(() => import("@suid/icons-material/Payments"));
const CarImage = lazy(() => import("../../assets/CarImg"));



const LandingMobile = (props) => {
  return (
    <>
      <Grid item lg={1}></Grid>
      <Grid item container xs={12} lg={6}>
        <Typography variant="h1" paddingY={8}>
          Ditch the sticky notes and messy spreadsheets.
        </Typography>
        <Typography variant="h5">
          Easily track your dealership's inventory so you can accelerate sales.
        </Typography>
      </Grid>

      <Grid item container xs={12} lg={5}>
          <StackRowCentered>
            <TestSVG width={486} height={380}/>
          </StackRowCentered>
      </Grid>
    </>
  );
}

// const LandingDesktop = (props) => {
//   const leftPos = createMemo(() => {
//     let left = 90;
//     if (props.scrollPos) {
//       left = left + (props.scrollPos * 0.03);
//     }
//     return `${left}%`
//   })
//   const transform = createMemo(() => {
//     let t = 'translate(-50%, -50%) ';
//     if (props.scrollPos) {
//       t += `rotate(${props.scrollPos * 0.04}deg)`;
//     }
//     return t;
//   })

//   return (
//     <>
//       <Box 
//         height="70vh" width="70vw" 
//         // backgroundColor={getRandomLightColorHex()}
//         >
//         <StackRowCentered height="100%" paddingLeft={8}>
//           <Stack spacing={10}>
//             <DisplayText zIndex={2}>
//               Ditch the sticky notes and messy spreadsheets.
//             </DisplayText>
//             <Typography zIndex={2} variant="h5">
//               Easily track your dealership's inventory so you can accelerate sales.
//             </Typography>
//             <StackRowCentered justifyContent="center" width="80%">
//               <Button 
//                 variant="contained" 
//                 color="primary" 
//                 startIcon={<ExtensionIcon/>}
//                 sx={{width: '20%', fontSize: "large"}}>Features</Button>
//               <Button 
//                 variant="contained" 
//                 color="primary" 
//                 startIcon={<PaymentIcon/>}
//                 sx={{width: '20%', fontSize: "large"}}>Pricing</Button>
//             </StackRowCentered>
//           </Stack>
//         </StackRowCentered>
//       </Box>

//       <TestSVG 
//         id={'desktop-full-mockup'} 
//         // width={900} height={703}
//         width="85%" height="85%"
//         style={{
//           position: 'absolute',
//           top: '45%',
//           left: leftPos(),
//           transform: transform(),
//           zIndex: 1,
//         }}/>

      
//       <Grid item xs={12} p={8} paddingBottom={0}>
//         <DisplayText>Streamline your processes, save time, and sell vehicles faster with the help of our platform.</DisplayText>
//       </Grid>
      
//       <Grid item xs={12} paddingBottom={8} position="relative">
//         <CarImage scrollPos={props.scrollPos}/>
//       </Grid>
//     </>
//   );
// }

const IndexLanding = (props) => {
  const { isMobile } = useGlobalContext();
  
  // return (
  //   <Show 
  //     when={isMobile()}
  //     fallback={<LandingDesktop scrollPos={props.scrollPos}/>}>
  //     <LandingMobile/>
  //   </Show>
  // );
  const leftPos = createMemo(() => {
    let left = 80;
    if (props.scrollPos) {
      left = left + (props.scrollPos * 0.03);
    }
    return `${left}%`
  })
  const transform = createMemo(() => {
    let t = 'translate(-50%, -50%) ';
    if (props.scrollPos) {
      t += `rotate(${props.scrollPos * 0.04}deg)`;
    }
    return t;
  })
  return (
    <IndexSectionContainer>
      <Grid item container xs={12} md={8} lg={6}>
        <DisplayText paddingBottom={10}>
          Ditch the sticky notes and messy spreadsheets.
        </DisplayText>
        <Typography variant="h5">
          Easily track your dealership's inventory so you can accelerate sales.
        </Typography>
      </Grid>
      <Grid item container xs={12} md={4} lg={6} sx={{overflowX: 'hidden'}}>
      <TestSVG 
          id={'desktop-full-mockup'} 
          // width={900} height={703}
          // width="65%" 
          height="65%"
          style={{
            position: 'absolute',
            top: '45%',
            left: leftPos(),
            transform: transform(),
            zIndex: 1
          }}/>
      </Grid>
    </IndexSectionContainer>
  );
}

export default IndexLanding;