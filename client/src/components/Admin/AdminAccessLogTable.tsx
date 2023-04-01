import { Grid, Typography } from "@suid/material";
import { createResource, Show } from "solid-js";
import BasicTable from "../../elements/BasicTable/BasicTable";
import { useGlobalContext } from "../../global/store";

const AdminAccessLogTable = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchAccessLog = async () => (await apiCall('/admin/get_access_logs', 'POST', {}, {}));
  const [accessLog, {mutate, refetch}] = createResource(fetchAccessLog);
  const headers = [
    {text: "UUID", key: "uuid", xs: 2, type: "string"},
    {text: "Email", key: "email", xs: 3, type: "string"},
    {text: "Dealership ID", key: "dealership_id", xs: 2, type: "string"},
    {text: "Login Time", key: "dt", xs: 3, type: "date"},
    {text: "Success", key: "success", xs: 1, type: "string"}
  ];

  return (
    <Show when={!accessLog.loading}>
      <Grid container item xs={12}>
        <Typography>Number of active users: {accessLog().length}</Typography>
        <BasicTable headers={headers} data={accessLog()}/>
      </Grid>
    </Show>
  );
}

export default AdminAccessLogTable;