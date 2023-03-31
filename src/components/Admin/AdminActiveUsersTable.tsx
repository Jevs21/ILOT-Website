import { Grid, Typography } from "@suid/material";
import { createResource, Show } from "solid-js";
import BasicTable from "../../elements/BasicTable/BasicTable";
import { useGlobalContext } from "../../global/store";

const AdminActiveUsersTable = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchActiveUsers = async () => (await apiCall('/admin/get_active_users', 'POST', {}, {}));
  const [activeUsers, {mutate, refetch}] = createResource(fetchActiveUsers);
  const headers = [
    {text: "UUID", key: "uuid", xs: 4, type: "string"},
    {text: "DB Name", key: "database_name", xs: 3, type: "string"},
    {text: "Role", key: "u_role", xs: 2, type: "string"},
    {text: "Login Time", key: "login_time", xs: 3, type: "date"}
  ];

  return (
    <Show when={!activeUsers.loading}>
      <Grid container item xs={12}>
        <Typography>Number of active users: {activeUsers().length}</Typography>
        <BasicTable headers={headers} data={activeUsers()}/>
      </Grid>
    </Show>
  );
}

export default AdminActiveUsersTable;