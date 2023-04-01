import { ArrowDownwardRounded, ArrowUpwardRounded } from "@suid/icons-material";
import { Divider, Grid, Stack, Typography } from "@suid/material";
import { createSignal, For, Show } from "solid-js";
import CardEl from "../../elements/CardEl";

const VehicleInformationItem = (props) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body2">{props.name}:</Typography>
      <Typography>{props.data}</Typography>
    </Stack>
  );
}

export default function VehicleInformation(props) {
  const ignore = [
    "id", "loc_latitude", "loc_longitude", "note", "model_year", "make",
    "model",
  ]
  const [showingAllInfo, setShowingAllInfo] = createSignal(false);
  const [data, setData] = createSignal(Object.entries(props.data));
  
  const ShowAllInfoButton = () => {
    return (
      <Grid item xs={12} paddingBottom={2} onclick={() => setShowingAllInfo(!showingAllInfo())}>
        <Stack direction="row" spacing={1} justifyContent='center'>
          <Typography align="center">{(showingAllInfo()) ? "Show Less" : "Show More"}</Typography>
          {(showingAllInfo()) ? <ArrowUpwardRounded fontSize="small"/> : <ArrowDownwardRounded fontSize="small"/>}
        </Stack>
      </Grid>
    );
  }

  const AllInfoRow = (props) => {
    return (
      <Grid item xs={12} marginY={0}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant="body2">{props.item[0]}</Typography>
          <Typography>{props.item[1]}</Typography>
        </Stack>
      </Grid>
    )
  }

  return (
    <CardEl>
      <Grid item container xs={12} padding={2} paddingBottom={0}>
        <Grid item container xs={12} rowSpacing={2} paddingBottom={2}>
          <Grid item xs={9}>
            <VehicleInformationItem name="VIN" data={props.data["vin"]}/>
          </Grid>
          <Grid item xs={3}>
            <VehicleInformationItem name="Type" data={props.data["stock_type"]}/>
          </Grid>
          <Grid item xs={5}>
            <VehicleInformationItem name="Make" data={props.data["make"]}/>
          </Grid>
          <Grid item xs={4}>
            <VehicleInformationItem name="Model" data={props.data["model"]}/>
          </Grid>
          <Grid item xs={3}>
            <VehicleInformationItem name="Year" data={props.data["model_year"]}/>
          </Grid>
          <Grid item xs={5}>
            <VehicleInformationItem name="Ext. Color" data={props.data["exterior_color"]}/>
          </Grid>
          <Grid item xs={4}>
            <VehicleInformationItem name="Int. Color" data={props.data["interior_color"]}/>
          </Grid>
          <Grid item xs={3}>
            <VehicleInformationItem name="# Doors" data={props.data["body_door_count"]}/>
          </Grid>
        </Grid>
        
        <Grid item xs={12} padding={1} paddingBottom={2}>
          <Divider/>
        </Grid>

        <Show when={showingAllInfo()}>
          <Grid item container xs={12} paddingBottom={2}>
            <For each={data()}>{(item, i) => {
              if (!ignore.includes(item[0])) {
                return (
                  <AllInfoRow item={item}/>
                );
              }
            }}</For>
          </Grid>
        </Show>
        <ShowAllInfoButton/>
        {/* <For each={info_list}>{(item) => (
          <Grid item xs={6} marginBottom={2}>
            
          </Grid>
        )}</For>   */}
      </Grid>
    </CardEl>
  );
}