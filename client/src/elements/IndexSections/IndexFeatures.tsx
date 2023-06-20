import { Button, Grid, Icon, Stack, Typography } from "@suid/material";
import DisplayText from "../DisplayText";
import StackRowCentered from "../StackRowCentered";
import DemoStatusTrackerEl from "../DemoStatusTrackerEl";
import { createSignal } from "solid-js";
import IndexSectionContainer from "./IndexSectionContainer";
import { useGlobalContext } from "../../global/store";

const IndexFeatures = () => {
  const { navigate } = useGlobalContext();
  const [sID, setSID] = createSignal(0);
  const [sKeys, setSKeys] = createSignal(["Arrival", "Prep", "Media", "Website", "Sold", "Delivered"]);

  return (
    <IndexSectionContainer>
      {/* <Grid item container xs={12} paddingBottom={2}>
        <StackRowCentered><DisplayText align='center'>Features</DisplayText></StackRowCentered>
      </Grid> */}
      <Grid item container sm={12} md={5} py={2}>
        {/* <DisplayText>Look at these features!</DisplayText> */}
        <Stack spacing={2} paddingLeft={1}>
          <Typography variant="h5">&#x2022; Customizable status tracker</Typography>
          <Typography variant="h5">&#x2022; Assignable vehicle tasks</Typography>
          <Typography variant="h5">&#x2022; Vehicle location pin</Typography>
          <Typography variant="h5">&#x2022; Comprehensive and actionable analytics</Typography>
          <Typography variant="h5">&#x2022; Any device. No downloads necessary.</Typography>
        </Stack>
      </Grid>
      <Grid item container sm={12} md={7} py={2}>
        <StackRowCentered height={'100%'}>
          <DemoStatusTrackerEl 
            status_id={sID()} 
            status_keys={sKeys()}
            onChange={(id: number) => setSID(id)}/>
        </StackRowCentered>
      </Grid>
      <Grid item container xs={12} paddingTop={2}>
        <StackRowCentered justifyContent="center">
          <Button variant="contained" onClick={() => navigate('/features')} sx={{width: '50%'}}>See all features</Button>
        </StackRowCentered>
      </Grid>
    </IndexSectionContainer>
  );
};

export default IndexFeatures;