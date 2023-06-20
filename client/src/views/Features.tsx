import { Grid, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { createSignal } from "solid-js";
import DemoStatusTrackerEl from "../elements/DemoStatusTrackerEl";
import DemoTaskListEl from "../elements/DemoTaskListEl";
import DemoMapEl from "../elements/DemoMapEl";
import SectionHeaderEl from "../elements/SectionHeaderEl";
import IndexSectionContainer from "../elements/IndexSections/IndexSectionContainer";


const SectionText = (props) => (
  <Grid item container lg={6}>
    <StackRowCentered>
      <Typography variant="h2" p={2} lineHeight={1.3}>
        {props.children}
      </Typography>
    </StackRowCentered>
  </Grid>
);

const Features = () => {
  const [sID, setSID] = createSignal(0);
  const [sKeys, setSKeys] = createSignal(["Arrival", "Prep", "Media", "Website", "Sold", "Delivered"]);
  return (
    <>
      <SectionHeaderEl>Status Tracker</SectionHeaderEl>

      
        <IndexSectionContainer py={5}>
          <SectionText>
            Every dealership is different - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vel lacinia sollicitudin, nisl magna euismod dui, nec faucibus nisi purus sit amet lorem. Sed at enim nec nibh semper volutpat. Duis finibus convallis pharetra. Aenean ultricies lectus sed enim varius, at sodales elit feugiat.
          </SectionText>
          <Grid item container lg={6}>
            <StackRowCentered>
              <DemoStatusTrackerEl 
                status_id={sID()} 
                status_keys={sKeys()}
                onChange={(id: number) => setSID(id)}/>
            </StackRowCentered>
          </Grid>
        </IndexSectionContainer>
 

      <SectionHeaderEl>Assignable Tasks</SectionHeaderEl>
      <IndexSectionContainer py={5}>
        <Grid item container lg={6}>
          <StackRowCentered>
            <DemoTaskListEl status_id={sID()}/>
          </StackRowCentered>
        </Grid>
        <SectionText>
          Every dealership is different - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vel lacinia sollicitudin, nisl magna euismod dui, nec faucibus nisi purus sit amet lorem. Sed at enim nec nibh semper volutpat. Duis finibus convallis pharetra. Aenean ultricies lectus sed enim varius, at sodales elit feugiat.
        </SectionText>
      </IndexSectionContainer>


      <SectionHeaderEl>Vehicle Location Pin</SectionHeaderEl>
      <IndexSectionContainer py={5}>
        <SectionText>
          Every dealership is different - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vel lacinia sollicitudin, nisl magna euismod dui, nec faucibus nisi purus sit amet lorem. Sed at enim nec nibh semper volutpat. Duis finibus convallis pharetra. Aenean ultricies lectus sed enim varius, at sodales elit feugiat.
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
