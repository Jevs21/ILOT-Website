import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@suid/material";
import { SelectChangeEvent } from "@suid/material/Select";
import { createResource, createSignal, For, Show } from "solid-js";
import { useGlobalContext } from "../../global/store";

const AdminCreateUser = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchDealershipList = async () => (await apiCall('/admin/get_dealership_list', 'POST', {}, {}));
  const [dealershipList, {mutate, refetch}] = createResource(fetchDealershipList);

  const [selDealership, setSelDealership] = createSignal("");
  const handleDealershipChange = (event: SelectChangeEvent) => {
    setSelDealership(event.target.value);
  }

  const [selRole, setSelRole] = createSignal("");
  const handleRoleChange = (event: SelectChangeEvent) => {
    setSelRole(event.target.value);
  }

  const [showAlert, setShowAlert] = createSignal(false);
  const [showAlertErr, setShowAlertErr] = createSignal(false);

  const [email, setEmail] = createSignal("");
  const [name, setName] = createSignal("");

  const sendCreateNewUser = async (email, name, role, d_id) => (await apiCall('/admin/create_user', 'POST', {}, {
    email: email,
    name: name,
    role: role,
    dealership_id: d_id
  }))

  const createNewUser = async () => {
    setShowAlert(false);
    setShowAlertErr(false);
    if (
      selRole().length > 0 &&
      email().length > 0 &&
      name().length > 0) {
      for (let d of dealershipList()) {
        if (selDealership() == String(d.id)) {
          console.log("Creating User", selDealership(), selRole(), email(), name())
          const res = await sendCreateNewUser(email(), name(), selRole(), d.id);
          if (res.success) {
            setShowAlert(true);
          } else {
            setShowAlertErr(true);
          }
          break
        }
      }
    } else {
      setShowAlertErr(true);
    }
  }

  return (
    <>
      <Grid container item xs={12} justifyContent="space-around">
        <Grid xs={12} sm={6} md={2} padding={2}>
          <Show when={!dealershipList.loading}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="dealership_select_label">Dealership</InputLabel>
                <Select
                  labelId="dealership_select_label"
                  id="dealership_select"
                  value={selDealership()}
                  label="Dealership"
                  variant="standard"
                  onChange={handleDealershipChange}
                  fullWidth
                >
                  <MenuItem value="">None</MenuItem>
                  <For each={dealershipList()}>{(d) =>
                    <MenuItem value={String(d.id)}>{d.name}</MenuItem>
                  }</For>
                </Select>
              </FormControl>
            </Box>
          </Show>
        </Grid>

        <Grid xs={12} sm={6} md={2} padding={2}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="role_select_label">Role</InputLabel>
              <Select
                labelId="role_select_label"
                id="role_select"
                value={selRole()}
                label="Role"
                variant="standard"
                onChange={handleRoleChange}
                fullWidth
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        
        <Grid xs={12} sm={6} md={3} padding={2}>
          <TextField
            value={email()}
            variant="standard"
            autoComplete="off"
            label="Email"
            fullWidth
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
        </Grid>

        <Grid xs={12} sm={6} md={3} padding={2}>
          <TextField
            value={name()}
            variant="standard"
            autoComplete="off"
            label="Name"
            fullWidth
            onChange={(e) => setName((e.target as HTMLInputElement).value)}/>
        </Grid>

        <Grid xs={12} sm={6} md={1} padding={2}>
          <Button 
            fullWidth
            onClick={(e) => createNewUser()}
            >Create User</Button>
        </Grid>

        {/* <Grid xs={5}>
          <TextField
            value={name()}
            variant="standard"
            autoComplete="off"
            label="Email"
            fullWidth
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
        </Grid> */}
      </Grid>
      <Show when={showAlert()}>
        <Grid item xs={12}>
          <Alert severity="success">{name()} account created.</Alert>
        </Grid>
      </Show>
      <Show when={showAlertErr()}>
        <Grid item xs={12}>
          <Alert severity="error">Account couldnt be created</Alert>
        </Grid>
      </Show>
      
    </>
  );
}

export default AdminCreateUser;