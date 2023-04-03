import { Box, Button, Grid, Stack, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { For, Show, createEffect, createMemo, createResource, createSignal, lazy, onCleanup } from "solid-js";
// import LogoLarge from "../elements/Logo/LogoLarge";
import { useGlobalContext } from "../global/store";
import TestSVG from "../assets/TestSVG";
const LogoLarge = lazy(() => import("../elements/Logo/LogoLarge"));
// const TestImage = lazy(() => import("../assets/TestImage.svg"));
// const TestImage = import("../assets/TestImage.svg");
// import TestImage 

function getRandomLightColorHex() {
  function randomLightHex() {
    const min = 128;
    const max = 255;
    return Math.floor(Math.random() * (max - min + 1) + min).toString(16).padStart(2, '0');
  }

  const r = randomLightHex();
  const g = randomLightHex();
  const b = randomLightHex();

  return `#${r}${g}${b}`;
}

const IndexMobile = (props) => {
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

const IndexDesktop = (props) => {
  const leftPos = createMemo(() => {
    let left = 100;
    if (props.scrollPos) {
      left = left + (props.scrollPos * 0.05);
    }
    return `${left}%`
  })
  const transform = createMemo(() => {
    let t = 'translate(-50%, -50%) ';
    if (props.scrollPos) {
      t += `rotate(${props.scrollPos * 0.05}deg)`;
    }
    return t;
  })

  return (
    <>
      <Box 
        height="70vh" width="70vw" 
        // backgroundColor={getRandomLightColorHex()}
        >
        <StackRowCentered height="100%" paddingLeft={8}>
          <Stack spacing={10}>
            <Typography variant="h1" fontSize={"4.3em"} lineHeight={1.3}>
              Ditch the sticky notes and messy spreadsheets.
            </Typography>
            <Typography variant="h5">
              Easily track your dealership's inventory so you can accelerate sales.
            </Typography>
            <StackRowCentered justifyContent="center">
              <Button color="primary">Features</Button>
              <Button color="primary">Pricing</Button>
            </StackRowCentered>
          </Stack>
        </StackRowCentered>
      </Box>

      <TestSVG 
        id={'desktop-full-mockup'} 
        // width={900} height={703}
        width="85%" height="85%"
        style={{
          position: 'absolute',
          top: '45%',
          left: leftPos(),
          transform: transform(),
          zIndex: 1,
        }}/>
    </>
  );
}

const Index = (props) => {
  const {isMobile, apiCall} = useGlobalContext();
  
  // Scroll position tracking
  const [scrollPosition, setScrollPosition] = createSignal(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  createEffect(() => {
    window.addEventListener('scroll', handleScroll);
    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });

  return (
    <>
      <Show 
        when={isMobile()}
        fallback={<IndexDesktop scrollPos={scrollPosition()}/>}>
        <IndexMobile/>
      </Show>
      
      <For each={[1,2,3,4,5,6,7,8,9,10]}>{(item) => (
        <Grid item xs={12} backgroundColor={getRandomLightColorHex()}>
          <Typography variant="h1">Test {item}</Typography>
        </Grid>
      )}</For>


    </>      

  );
};

export default Index;
