import { Grid, Typography } from "@suid/material";
import { createResource, Show } from "solid-js";
import BasicTable from "../../elements/BasicTable/BasicTable";
import { useGlobalContext } from "../../global/store";

const AdminDealershipTable = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchDealershipList = async () => (await apiCall('/admin/get_dealership_list', 'POST', {}, {}));
  const [dealershipList, {mutate, refetch}] = createResource(fetchDealershipList);
  const headers = [
    {text: "ID", key: "id", xs: 1, type: "string"},
    {text: "Name", key: "name", xs: 3, type: "string"},
    {text: "DB Name", key: "database_name", xs: 3, type: "string"},
    // {text: "Lat", key: "latitude", xs: 2},
    // {text: "Lon", key: "longitude", xs: 2},
    {text: "Keys", key: "status_keys", xs: 5, type: "string"}
  ];
  
  return (
    <Show when={!dealershipList.loading}>
      <Grid container item xs={12}>
        <Typography>Number of dealerships: {dealershipList().length}</Typography>
        <BasicTable headers={headers} data={dealershipList()}/>
      </Grid>
    </Show>
  );
}

export default AdminDealershipTable;