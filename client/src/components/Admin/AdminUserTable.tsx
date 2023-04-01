import { Grid, Typography } from "@suid/material";
import { createResource, Show } from "solid-js";
import BasicTable from "../../elements/BasicTable/BasicTable";
import { useGlobalContext } from "../../global/store";

const AdminDealershipTable = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchUserList = async () => (await apiCall('/admin/get_user_list', 'POST', {}, {}));
  const [userList, {mutate, refetch}] = createResource(fetchUserList);
  const headers = [
    {text: "UUID", key: "uuid", xs: 1, type: "string"},
    {text: "Email", key: "email", xs: 3, type: "string"},
    {text: "Username", key: "username", xs: 1, type: "string"},
    {text: "Name", key: "full_name", xs: 2, type: "string"},
    {text: "Role", key: "u_role", xs: 1, type: "string"},
    {text: "Dealership", key: "name", xs: 2, type: "string"},
    {text: "FTL?", key: "first_time_login", xs: 1, type: "string"},
    {text: "DEL?", key: "is_deleted", xs: 1, type: "string"}
  ];
  
  return (
    <Show when={!userList.loading}>
      <Grid container item xs={12}>
        <Typography>Number of users: {userList().length}</Typography>
        <BasicTable headers={headers} data={userList()}/>
      </Grid>
    </Show>
  );
}

export default AdminDealershipTable;