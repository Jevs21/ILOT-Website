import { Grid, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { createSignal } from "solid-js";
import DemoStatusTrackerEl from "../elements/DemoStatusTrackerEl";
import DemoTaskListEl from "../elements/DemoTaskListEl";
import DemoMapEl from "../elements/DemoMapEl";
import IndexSectionContainer from "../elements/IndexSections/IndexSectionContainer";
import CustomChip from "../elements/CustomChip";


const SectionText = (props) => (
  <Grid item container lg={6} px={1} justifyContent="flex-start">
    {/* <StackRowCentered > */}
      <Typography variant="h2" lineHeight={1.3}>
        {props.children}
      </Typography>
    {/* </StackRowCentered> */}
  </Grid>
);

const Features = () => {
  const [sID, setSID] = createSignal(0);
  const [sKeys, setSKeys] = createSignal(["Arrival", "Prep", "Media", "Website", "Sold", "Delivered"]);
  return (
    <>
      {/* <SectionHeaderEl>Status Tracker</SectionHeaderEl> */}

        <IndexSectionContainer>
          <Grid item container xs={12} paddingBottom={4}>
            <StackRowCentered>
              <CustomChip type="black" text="Customizable Status Tracker" />
            </StackRowCentered>
          </Grid>
          <SectionText>
            Stay informed at every stage of the vehicle's journey with your very own customizable tracker.          
          </SectionText>
          <Grid item container lg={6}>
            <StackRowCentered>
              <DemoStatusTrackerEl 
                status_id={sID()} 
                status_keys={sKeys()}
                onChange={(id: number) => setSID(id)}/>
            </StackRowCentered>
          </Grid>

          <Grid item container xs={12} py={4} > 
            <StackRowCentered justifyContent="flex-end">
              <CustomChip type="black" text="Assignable Vehicle Tasks" />
            </StackRowCentered>
          </Grid>
          <Grid item container lg={6}>
            <StackRowCentered>
              <DemoTaskListEl status_id={sID()}/>
            </StackRowCentered>
          </Grid>
          <SectionText>
            Keeps things organized and maximize productivity by keeping on top of specific assignable vehicle tasks.
          </SectionText>


          <Grid item container xs={12} py={4}>
            <StackRowCentered>
              <CustomChip type="black" text="Vehicle Location Pin" />
            </StackRowCentered>
          </Grid>
          <SectionText>
            Easily track and locate vehicles within your inventory using our intuitive vehicle location pin feature.
          </SectionText>

          <Grid item container lg={6}>
            <StackRowCentered>
              <DemoMapEl/>
            </StackRowCentered>
          </Grid>
        </IndexSectionContainer>

    </>
  );
};

export default Features;
