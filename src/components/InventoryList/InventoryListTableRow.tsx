import { Grid } from "@suid/material";

const InventoryListTableRow = (props) => {
  return (<Grid item onclick={props.onclick} container xs={12} sx={props.sx}>{props.children}</Grid>);
}

export default InventoryListTableRow;