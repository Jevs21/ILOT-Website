import { Grid, TextField, Button } from "@suid/material";
import { createSignal } from "solid-js";
import { useGlobalContext } from "../../global/store";

const AdminDeleteUser = (props) => {
  const { apiCall } = useGlobalContext();
  const [uuid, setUuid] = createSignal("");
  const deleteUser = async (uuid) => ( await apiCall('/admin/delete_user', 'POST', {}, {uuid: uuid}))
  const deleteUserClicked = async () => {
    if (uuid().length > 0) {
      return await deleteUser(uuid())
    }
  }
  return (
  <Grid container item xs={12} justifyContent="space-around">
    <Grid xs={8} sm={6} md={4} padding={2}>
      <TextField
        value={uuid()}
        variant="standard"
        autoComplete="off"
        label="UUID"
        fullWidth
        onChange={(e) => setUuid((e.target as HTMLInputElement).value)}/>
    </Grid>


    <Grid xs={4} sm={2} md={2} padding={2}>
      <Button 
        fullWidth
        onClick={async (e) => await deleteUserClicked()}
        >Delete User</Button>
    </Grid>

    <Grid xs={12} sm={2} md={6} padding={2}></Grid>
  </Grid>
  )
}

export default AdminDeleteUser;