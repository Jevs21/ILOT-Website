import { Grid, Typography } from "@suid/material";
import { createMemo, createSignal, For } from "solid-js";
import style from "../../global/style"
import CardEl from "../CardEl";
import BasicTableFooter from "./BasicTableFooter";
import BasicTableHeaderCol from "./BasicTableHeaderCol";
import { formatText } from "../../global/helpers"

const BasicTable = (props) => {
  // Sorting code
  const [sortBy, setSortBy] = createSignal("");
  const [sortDir, setSortDir] = createSignal("asc");
  const handleSort = (sort: string) => {
    const prevSort = sortBy();
    if (prevSort == "") {
      // Starting with no sort
      setSortBy(sort);
    }
    else if(prevSort == sort) {
      // Change direction of sort
      if (sortDir() == "asc") {
        setSortDir("desc");
      } else {
        setSortBy("");
        setSortDir("asc");
      }
    }
    else {
      setSortDir("asc");
      setSortBy(sort);
    }
  }

  const filteredList = createMemo(() => {
    let ret = [];
    for (let row of props.data) {
      ret.push(row)
    }

    if (ret.length > 0 && sortBy() != "") {
      const k = sortBy();
      // Will need to change this based on header type
      const strSortFunction = (sortDir() == "asc") ? (a, b) => a[k].localeCompare(b[k]) : (a, b) => b[k].localeCompare(a[k])
      const intSortFunction = (sortDir() == "asc") ? (a, b) => a[k] -b[k] : (a, b) => b[k] - a[k]
      if (typeof ret[0][k] == "string") {
        ret.sort(strSortFunction);
      } else if (typeof ret[0][k] == "number") {
        ret.sort(intSortFunction);
      } else {
        console.log("Unknown header sort");
      }
    }
    
    return ret;
  })


  const [rowsShown, setRowsShown] = createSignal(10);
  const [pageNum,   setPageNum]   = createSignal(0);

  const curRows = createMemo(() => {
    const n_rows = filteredList().length;
    const s_ind  = (pageNum() * rowsShown());
    const e_ind  = (pageNum() * rowsShown()) + rowsShown();
    let ret = [];
    for (let i = s_ind; i < e_ind; i++) {
      if (i < n_rows) {
        ret.push(filteredList()[i]);
      }
    }
    return ret;
  })

  return (
    <CardEl>
      <Grid container item xs={12}>
        <Grid 
          container item 
          xs={12}
          sx={{...style.tr, ...style.trhead}}>
          <For each={props.headers}>{(h, i) => (
              <BasicTableHeaderCol 
                align={h.align} 
                xs={h.xs}
                curSort={{key: sortBy(), dir: sortDir()}}
                handleSort={handleSort}
                key={h.key}
                text={h.text}
                sx={style.trheadcol}/>
          )}</For>
        </Grid>
        
        
        <For each={curRows()}>{(row, i) => (
          <Grid 
            container item 
            xs={12} 
            padding={1}
            sx={{...style.tr, ...(i() % 2 == 0 ? style.treven : style.trodd)}}>
            <For each={props.headers}>{(h) => (
              <Grid xs={h.xs}>
                <Typography>{formatText(h.type, row[h.key])}</Typography>
              </Grid>
            )}</For>
          </Grid>
        )}</For>
        
        <Grid 
          container item 
          xs={12} 
          padding={1}
          sx={{...style.tr, ...style.trhead}}>
          <BasicTableFooter 
            onRowChange={setRowsShown} 
            onPageChange={setPageNum}
            n_rows={filteredList().length}/>
        </Grid>
          
        
      </Grid>
    </CardEl>
  )
}

export default BasicTable;