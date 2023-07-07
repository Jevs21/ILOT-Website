import { Grid, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import { createSignal } from "solid-js";
import DemoStatusTrackerEl from "../elements/DemoStatusTrackerEl";
import DemoTaskListEl from "../elements/DemoTaskListEl";
import DemoMapEl from "../elements/DemoMapEl";
import IndexSectionContainer from "../elements/IndexSections/IndexSectionContainer";
import CustomChip from "../elements/CustomChip";


const SectionText = (props) => (
  <Grid item container lg={6} px={2} justifyContent="flex-start">
    {/* <StackRowCentered > */}
      <Typography variant="h2" lineHeight={1.3}>
        {props.children}
      </Typography>
    {/* </StackRowCentered> */}
  </Grid>
);

const HeaderContainer = (props) => (
  <Grid item container xs={12} {...props}>
    <StackRowCentered justifyContent={props.justifyContent || 'flex-start'}>
      { props.children }
    </StackRowCentered>
  </Grid>
);

const FeatureContainer = (props) => (
  <Grid item container lg={6} px={2}>
    <StackRowCentered>
      { props.children }
    </StackRowCentered>
  </Grid>
);





const Features = () => {
  const [sID, setSID] = createSignal(0);
  const [sKeys, setSKeys] = createSignal(["Arrival", "Prep", "Media", "Website", "Sold", "Delivered"]);
  return (
    <>
      {/* <SectionHeaderEl>Status Tracker</SectionHeaderEl> */}

        <IndexSectionContainer>
          <HeaderContainer paddingBottom={6}>
            <CustomChip type="black" text="Customizable Status Tracker" />
          </HeaderContainer>
          <SectionText>
            Stay informed at every stage of the vehicle's journey with your very own customizable tracker.          
          </SectionText>
          <FeatureContainer>
            <DemoStatusTrackerEl 
              status_id={sID()} 
              status_keys={sKeys()}
              onChange={(id: number) => setSID(id)}/>
          </FeatureContainer>

          <HeaderContainer py={6} paddingTop={8} justifyContent={"flex-end"}> 
            <StackRowCentered justifyContent="flex-end">
              <CustomChip type="black" text="Assignable Vehicle Tasks" />
            </StackRowCentered>
          </HeaderContainer>
          <FeatureContainer>
              <DemoTaskListEl status_id={sID()}/>
            </FeatureContainer>
          <SectionText>
            Keeps things organized and maximize productivity by keeping on top of specific assignable vehicle tasks.
          </SectionText>

          <HeaderContainer py={6} paddingTop={8}>
              <CustomChip type="black" text="Vehicle Location Pin" />
          </HeaderContainer>
          <SectionText>
            Easily track and locate vehicles within your inventory using our intuitive vehicle location pin feature.
          </SectionText>

          <FeatureContainer>
              <DemoMapEl/>
          </FeatureContainer>
        </IndexSectionContainer>

    </>
  );
};

export default Features;
