import { Grid, Stack, Typography } from "@suid/material";
import { createResource, For, Show } from "solid-js";
import CardEl from "../../elements/CardEl";
import SectionHeaderEl from "../../elements/SectionHeaderEl";
import { getStringFromTimeDiff } from "../../global/helpers";
import { useGlobalContext } from "../../global/store";
import InventoryOverviewDoughnut from "./InventoryOverviewDoughnut";

const InventoryOverview = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchOverview = async () => await apiCall('/analytics/get_inventory_overview');
  const [invData] = createResource(fetchOverview);
  return (
    <Grid container item xs={12}>
      <SectionHeaderEl>INVENTORY OVERVIEW</SectionHeaderEl>
      <CardEl>
        <Grid 
          container item 
          xs={12} paddingY={2}>
            <Show when={!invData.loading}>
              <Stack direction="row" sx={{position:"relative", width: '100%', overflow:"scroll" }} >
                <InventoryOverviewDoughnut data={invData().data}/> 

                <Stack minWidth="300px" padding={1}>
                  <Typography variant="h2">{invData().n} Vehicles on the lot</Typography>
                  <Typography noWrap variant="h3">{invData().tti / (1000 * 60 * 60)} lot hours.</Typography>
                  <Typography noWrap variant="h3">{invData().task_n} incomplete tasks.</Typography>
                  <Stack>
                    <For each={invData().tasks}>{(task) => {
                      const today = new Date();
                      const taskDate = new Date(task.date_created);
                      const diff = today.getTime() - taskDate.getTime();
                      const diffStr = getStringFromTimeDiff(diff);
                      return <Typography noWrap variant="body2">{task.task} - {diffStr} old.</Typography>
                    }}</For>
                  </Stack>
                </Stack>
              </Stack>
            </Show>
        </Grid>
      </CardEl>
    </Grid>
  )
}

export default InventoryOverview;