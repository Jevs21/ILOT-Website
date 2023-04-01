import { Search } from "@suid/icons-material";
import { Grid, TextField, Typography } from "@suid/material";
import { createMemo, createResource, createSignal, Show } from "solid-js";
import SectionHeaderEl from "../../elements/SectionHeaderEl";
import TextFieldClearBtn from "../../elements/TextFieldClearBtn";
import { useGlobalContext } from "../../global/store";
import InventoryListFilters from "./InventoryListFilters";
import InventoryListTable from "./InventoryListTable";

const style = {
  textField: {
    'width': '100%',
    [`& fieldset`]: {
      borderRadius: 450,
    },
    'background-color': "#E7E7E7",
    'border-radius': '450px',
    'border-width': '0px',
    'color': "#5C0000", // Placeholder text colour
  }
}
export default function InventoryList() {
  const { apiCall, selectedInvFilters, selectedInvSort, selectedInvSortOrder, toggleInvSort } = useGlobalContext();

  const fetchInventoryData = async () => ( await apiCall('/vehicle/get_vehicle_list') );

  const [inventoryData] = createResource(fetchInventoryData);
  const [numVehicles, setNumVehicles] = createSignal(0);
  
  // const [selectedCat, setSelectedCat] = createSignal(-1);
  const [searchQuery, setSearchQuery]   = createSignal("");

  const handleSort = (sort: string) => {
    toggleInvSort(sort);
  }
  
  const search = (q, v) => {
    q = q.toLowerCase();
    const attributes = [
      v.exterior_color.toLowerCase(),
      v.make.toLowerCase(),
      v.model.toLowerCase(),
      v.model_year.toString(),
      v.vin.toLowerCase(),
    ];

    // Check if any attribute contains the query
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].indexOf(q) !== -1) {
        return true;
      }
    }

    // Check if query matches any vehicle tasks
    if (v.tasks) {
      for (let i = 0; i < v.tasks.length; i++) {
        if (v.tasks[i].task.toLowerCase().indexOf(q) !== -1) {
          return true;
        }
      }
    }

    // No matches found
    return false;
  }

  const filteredList = createMemo(() => {
    console.log("Refiltering list")
    let ret = [];
    if (!inventoryData.loading) {
      for (let v of inventoryData().list) {
        let matchesFilters = [];
        for (let f of selectedInvFilters()) {
          // Check if the filter matches based on type
          let match = false;
          if (f.type == "list") {
            match = v[f.key] == f.selected && f.selected != "";
          } else if (f.type == "range_min") {
            match = v[f.key] >= f.selected;
          } else if (f.type == "range_max") {
            match = v[f.key] <= f.selected;
          } else if (f.type == "date_min") {
            match = v[f.key] >= f.selected;
          } else if (f.type == "date_max") {
            match = v[f.key] <= f.selected;
          } else {
            console.log("Unknown filter type");
          }
          matchesFilters.push(match);
          if (!match) {
            break;
          }
        }
        if (selectedInvFilters().length > 0 && matchesFilters.includes(false)) {
          continue;
        } 
        
        // Search string
        if (searchQuery().length > 0) {
          if (search(searchQuery(), v)) {
            ret.push(v);
          }
        }
        else {
          ret.push(v);
        }
      }
    }

    if (ret.length > 0 && selectedInvSort() != "") {
      const k = selectedInvSort();
      // Will need to change this based on header type
      const strSortFunction = (selectedInvSortOrder() == "asc") ? (a, b) => a[k].localeCompare(b[k]) : (a, b) => b[k].localeCompare(a[k])
      const intSortFunction = (selectedInvSortOrder() == "asc") ? (a, b) => a[k] -b[k] : (a, b) => b[k] - a[k]

      if (typeof ret[0][k] == "string") {
        ret.sort(strSortFunction);
      } else if (typeof ret[0][k] == "number") {
        ret.sort(intSortFunction);
      } else {
        console.log("Unknown header sort");
      }
    }
    setNumVehicles(ret.length);
    return ret;
  })

  const numberOfResults = createMemo(() => {
    return (numVehicles() == 1) ? "1 result" : `${numVehicles()} results`; 
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const el = document.getElementById('inventory_list_table_search');
    el.blur();
  }

  return (
    <Grid container item>
      <SectionHeaderEl>INVENTORY:</SectionHeaderEl>
      <Grid item xs={12} padding={1} paddingX={2}>
        <form onSubmit={onSubmit}>
          <TextField
            id="inventory_list_table_search"
            value={searchQuery()}
            InputProps={{
              startAdornment: (
                <Search sx={{mr: 1}}/>
              ),
              endAdornment: (
                <TextFieldClearBtn show={searchQuery()} onClick={() => setSearchQuery("")}/>
              )
            }}
            sx={style.textField}
            variant="outlined"
            placeholder="Search the lot"
            onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            />
        </form>
      </Grid>
      
      <Grid item xs={12} padding={1} paddingX={2}>
        <InventoryListFilters/>
      </Grid>

      <Grid item xs={12} paddingX={2}>
        <Typography variant="body1">{numberOfResults()}</Typography>
      </Grid>

      <Grid item container xs={12} paddingY={1}>
        <Show 
          when={!inventoryData.loading}
          fallback={<Typography variant="body1">Loading...</Typography>}>
          {/* <InventoryListTable rows={(searchQuery().length > 0) ? filteredList() : inventoryData().list}/> */}
          <InventoryListTable 
            rows={filteredList()} 
            handleSort={handleSort} 
            curSort={{key: selectedInvSort(), dir: selectedInvSortOrder()}}/>
        </Show>
      </Grid>

    </Grid>
  );
}