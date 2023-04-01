import { Grid, Typography } from "@suid/material";
import { createResource, Show } from "solid-js";
import BasicTable from "../../elements/BasicTable/BasicTable";
import { useGlobalContext } from "../../global/store";

const AccountMyActivityTable = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchAccountActivity = async () => (await apiCall('/reports/get_my_activity', 'GET', {}, {}));
  const [accountActivity, {mutate, refetch}] = createResource(fetchAccountActivity);
  const headers = [
    {text: "Date", key: "dt", xs: 3, type: 'date'},
    {text: "Type", key: 'activity_type', xs: 3, type: 'string'},
    // {text: "VIN",  key: 'vin', xs: 4, type: 'string'},
    {text: "Description", key: "description", xs: 6, type: 'string'}
  ];
  
  return (
    <Show when={!accountActivity.loading}>
      <Grid container item xs={12}>
        <Typography padding={1}>Number of changes: {accountActivity().length}</Typography>
        <BasicTable headers={headers} data={accountActivity()}/>
      </Grid>
    </Show>
  );
}

export default AccountMyActivityTable;