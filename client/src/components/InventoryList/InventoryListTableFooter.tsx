import { ArrowLeftSharp, ArrowRightSharp } from "@suid/icons-material";
import { Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@suid/material";
import { SelectChangeEvent } from "@suid/material/Select";
import { createEffect, createMemo, createSignal } from "solid-js";

const InventoryListTableFooter = (props) => {
  const [rowsShown, setRowsShown] = createSignal(25);
  const [curPage, setCurPage]     = createSignal(0);

  const maxPageN = createMemo(() => Math.min(Math.max(Math.ceil(props.n_rows / rowsShown()), 1), 1000))

  const handleChange = (e: SelectChangeEvent) => {
    setRowsShown(parseInt(e.target.value));
    props.onRowChange(rowsShown());
    setCurPage(0);
    props.onPageChange(curPage());
  }

  const changePage = (v: number) => {
    const newPage = (curPage() + v); 
    if (newPage >= 0 && newPage < maxPageN()) {
      setCurPage(newPage);
      props.onPageChange(curPage());
    }
  }

  createEffect(() => {
    if (curPage() > maxPageN()) {
      setCurPage(0);
      props.onPageChange(curPage());
    }
  })

  return (
    <>
      <Grid xs={2} sm={1}>
        <IconButton disabled={(curPage() == 0)} onClick={() => changePage(-1)}><ArrowLeftSharp fontSize="large"/></IconButton>
      </Grid>
      <Grid xs={3} sm={4} justifyContent="right" paddingLeft={1}>
        <InputLabel id="demo-simple-select-label">Rows</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={rowsShown()}
          label="Rows"
          variant="standard"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Grid>
      <Grid xs={5} sm={6}>
        <Typography paddingY={1}>Page {curPage() + 1} of {maxPageN()}</Typography>
      </Grid>
      <Grid xs={2} sm={1}>
        <IconButton disabled={(curPage() == maxPageN() - 1)} onClick={() => changePage(1)}><ArrowRightSharp fontSize="large"/></IconButton>
      </Grid>
    </>
  );
}

export default InventoryListTableFooter;
