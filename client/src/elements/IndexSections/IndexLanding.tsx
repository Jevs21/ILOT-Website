import { Typography, Grid, Card } from "@suid/material";
import { createMemo, Show } from "solid-js";
import TestSVG from "../../assets/TestSVG";
import { useGlobalContext } from "../../global/store";
import StackRowCentered from "../StackRowCentered";
import DisplayText from "../DisplayText";
import IndexSectionContainer from "./IndexSectionContainer";
import style from "../../global/style";

const LandingMobile = (props) => {
  return (
    <IndexSectionContainer>
      <Grid item container xs={12}>
        <Typography variant="h1" paddingY={8}>
          Ditch the sticky notes and messy spreadsheets.
        </Typography>
        <Typography variant="h5">
          Easily track your dealership's inventory so you can accelerate sales.
          {/* Welcome to a world where car inventory management is simplified. Welcome to ILOT - the powerhouse of dealership analytics. */}
        </Typography>
      </Grid>
      <Grid item container xs={12}>
          <StackRowCentered>
            <TestSVG width={486} height={380}/>
          </StackRowCentered>
      </Grid>
    </IndexSectionContainer>
  );
}

const LandingDesktop = (props) => {
  const leftPos = createMemo(() => {
    let left = 75;
    if (props.scrollPos) {
      left = left + (props.scrollPos * 0.05);
    }
    return `${left}%`
  })
  const transform = createMemo(() => {
    let t = 'translate(-50%, -50%) ';
    if (props.scrollPos) {
      t += `rotate(${props.scrollPos * 0.03}deg)`;
    }
    return t;
  })
  return (
    <IndexSectionContainer>
      <Grid item container xs={12} md={8} lg={6}>
        <Card elevation={0} sx={{padding: 4, paddingLeft: 0, zIndex: 10, backgroundColor: style.palette.transBg}}>
          <DisplayText paddingBottom={10} sx={{opacity: 1}}>
            Ditch the sticky notes and messy spreadsheets.
          </DisplayText>
          <Typography variant="h5" sx={{opacity: 1}}>
            Easily track your dealership's inventory so you can accelerate sales.
            {/* Welcome to a world where car inventory management is simplified. Welcome to ILOT - the powerhouse of dealership analytics. */}
          </Typography>
        </Card>
      </Grid>
      <Grid item container xs={12} md={4} lg={6} sx={{overflowX: 'hidden'}}>
        <TestSVG 
          id={'desktop-full-mockup'} 
          // width={900} height={703}
          width="85%" 
          height="85%"
          style={{
            position: 'absolute',
            top: '55%',
            left: leftPos(),
            transform: transform(),
            zIndex: 1
          }}/>
      </Grid>
    </IndexSectionContainer>
  );
}

const IndexLanding = (props) => {
  const { isMobile } = useGlobalContext();
  
  return (
    <Show 
      when={isMobile()}
      fallback={<LandingDesktop scrollPos={props.scrollPos}/>}>
      <LandingMobile/>
    </Show>
  );
  
}

export default IndexLanding;