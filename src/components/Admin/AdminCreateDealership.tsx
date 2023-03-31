import { Button, Grid, TextField } from "@suid/material";
import { createSignal } from "solid-js";
import { useGlobalContext } from "../../global/store";

const AdminCreateDealership = (props) => {
  const { apiCall } = useGlobalContext();
  // const fetchDealershipList = async () => (await apiCall('/admin/get_dealership_list', 'POST', {}, {}));
  // const [dealershipList, {mutate, refetch}] = createResource(fetchDealershipList);

  // const [selDealership, setSelDealership] = createSignal("");
  // const handleDealershipChange = (event: SelectChangeEvent) => {
  //   setSelDealership(event.target.value);
  // }

  // const [selRole, setSelRole] = createSignal("");
  // const handleRoleChange = (event: SelectChangeEvent) => {
  //   setSelRole(event.target.value);
  // }

  const [name, setName] = createSignal("");
  const [lat, setLat] = createSignal("");
  const [lon, setLon] = createSignal("");
  const [dbName, setDbName] = createSignal("");

  const sendCreateNewDealership = async (name, lat, lon, db_name) => (await apiCall('/admin/create_dealership', 'POST', {}, {
    name: name,
    lat: lat,
    lon: lon,
    db_name: db_name
  }))

  const createNewDealership = async () => {
    if (
      name().length   > 0 &&
      lat().length    > 0 &&
      lon().length    > 0 &&
      dbName().length > 0) {
      return await sendCreateNewDealership(name(), lat(), lon(), dbName());
    }  
    console.log("Cant Create Dealership")
  }

  return (
    <Grid container item xs={12} justifyContent="space-around">
      <Grid xs={12} sm={6} md={3} padding={2}>
        <TextField
          value={name()}
          variant="standard"
          autoComplete="off"
          label="Name"
          fullWidth
          onChange={(e) => setName((e.target as HTMLInputElement).value)}/>
      </Grid>

      <Grid xs={12} sm={6} md={2} padding={2}>
        <TextField
          value={lat()}
          variant="standard"
          autoComplete="off"
          label="Latitude"
          fullWidth
          onChange={(e) => setLat((e.target as HTMLInputElement).value)}/>
      </Grid>

      <Grid xs={12} sm={6} md={2} padding={2}>
        <TextField
          value={lon()}
          variant="standard"
          autoComplete="off"
          label="Longitude"
          fullWidth
          onChange={(e) => setLon((e.target as HTMLInputElement).value)}/>
      </Grid>

      <Grid xs={12} sm={6} md={3} padding={2}>
        <TextField
          value={dbName()}
          variant="standard"
          autoComplete="off"
          label="DB Name"
          fullWidth
          onChange={(e) => setDbName((e.target as HTMLInputElement).value)}/>
      </Grid>

      <Grid xs={12} sm={6} md={1} padding={2}>
        <Button 
          fullWidth
          onClick={(e) => createNewDealership()}
          >Create Dealership</Button>
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
  );
}

export default AdminCreateDealership;