import { Grid } from "@suid/material";
import DisplayText from "../DisplayText";
import StackRowCentered from "../StackRowCentered";
import DemoStatusTrackerEl from "../DemoStatusTrackerEl";
import { createSignal } from "solid-js";
import IndexSectionContainer from "./IndexSectionContainer";

const IndexFeatures = () => {
  const [sID, setSID] = createSignal(0);
  const [sKeys, setSKeys] = createSignal(["Arrival", "Prep", "Media", "Website", "Sold", "Delivered"]);

  return (
    <IndexSectionContainer>
      <Grid item container xs={12} lg={6}>
        <DisplayText>Look at these features!</DisplayText>
      </Grid>
      <Grid item container xs={12} lg={6}>
        <StackRowCentered>
          <DemoStatusTrackerEl 
            status_id={sID()} 
            status_keys={sKeys()}
            onChange={(id: number) => setSID(id)}/>
        </StackRowCentered>
      </Grid>
    </IndexSectionContainer>
  );
};

export default IndexFeatures;