import { Button, Grid, Icon, Stack, Typography } from "@suid/material";
import DisplayText from "../DisplayText";
import StackRowCentered from "../StackRowCentered";
import DemoStatusTrackerEl from "../DemoStatusTrackerEl";
import { createSignal } from "solid-js";
import IndexSectionContainer from "./IndexSectionContainer";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";
import CustomChip from "../CustomChip";
import CustomButton from "../Navbar/CustomButton";

const IndexFeatures = () => {
  const { navigate } = useGlobalContext();
  const [sID, setSID] = createSignal(0);
  const [sKeys, setSKeys] = createSignal(["Arrival", "Prep", "Media", "Website", "Sold", "Delivered"]);

  return (
    <IndexSectionContainer backgroundColor={style.palette.white}>
      <Grid item container xs={12} paddingBottom={2}>
        <StackRowCentered justifyContent='flex-end'>
          <CustomChip type="black" text="Features" />
        </StackRowCentered>
      </Grid>

      <Grid item container flexDirection="row-reverse">

        <Grid item container sm={12} md={5} py={2}>
          {/* <DisplayText align={"right"}>Know your lot inside and out.</DisplayText> */}
          <Typography variant="h1" align={"right"}>Know your lot inside and out.</Typography>
          <Typography variant="h5" align={"right"} sx={{paddingTop: 2, paddingBottom: 4}}>
            Discover how I-LOT's features can improve your dealership's bottom line.
          </Typography>
          <Grid item container xs={12} spacing={2} py={2} justifyContent="right">
            <Grid item>
              <CustomChip type="grey" text="Customizable status tracker" />
            </Grid>
            <Grid item>
              <CustomChip type="grey" text="Assignable vehicle tasks" />
            </Grid>
            <Grid item>
              <CustomChip type="grey" text="Vehicle location pin" />
            </Grid>
            <Grid item>
              <CustomChip type="grey" text="Any device" />
            </Grid>
            <Grid item>
              <CustomChip type="grey" text="No downloads necessary" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container sm={12} md={7}>
          {/* <StackRowCentered alignItems="flex-start"> */}
            <DemoStatusTrackerEl 
              status_id={sID()} 
              status_keys={sKeys()}
              onChange={(id: number) => setSID(id)}/>
          {/* </StackRowCentered> */}
        </Grid>
        
      </Grid>
      <Grid item container xs={12} paddingTop={2}>
        <StackRowCentered justifyContent="flex-end">
          <CustomButton type="black" text="Explore all features" onClick={() => navigate('/features')} />
        </StackRowCentered>
      </Grid>
    </IndexSectionContainer>
  );
};

export default IndexFeatures;