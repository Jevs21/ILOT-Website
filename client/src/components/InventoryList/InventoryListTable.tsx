import { Card, Checkbox, Grid, Typography } from "@suid/material";
import { createMemo, createSignal, For, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import TableStatusChip from "../../elements/TableStatusChip";
import { formatDateStr } from "../../global/helpers";
import { useGlobalContext } from "../../global/store";
import InventoryListTableFooter from "./InventoryListTableFooter";
import InventoryListTableHeaderCol from "./InventoryListTableHeaderCol";
import InventoryListTableRow from "./InventoryListTableRow";
// import APICall from "../../api/APICall";

interface TableHeader {
  text: string;
  key: string;
  align: string;
  mobileHidden: boolean;
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  component: Function;
}

const style = {
  card: {
    width: '100%',
    borderRadius: '9px'
  },
  table: {
    width: "100%"
  },
  tr: {
    'margin': "10",
    'padding-top': "10px",
    'padding-bottom': "10px",
    'padding-left': "20px",
  },
  trhead: {
    'padding-top': "20px",
    'padding-bottom': "15px",
  },
  tdhead: {
    '&:hover': {
      'opacity': '0.8',
      'cursor': 'pointer'
    },
  },
  treven: {
    'background': "#F1F1F1",
    '&:hover': {
      'background': '#E3E3E3',
      'cursor': 'pointer'
    },
  },
  trodd: {
    'background': "#F7F7F7",
    '&:hover': {
      'background': '#E3E3E3',
      'cursor': 'pointer'
    },
  }
}

export default function InventoryListTable(props) {
  const { isMobile, navigate } = useGlobalContext();
  const checkboxClassName = "inventory_list_checkbox";
  const [checkboxList, setCheckboxList] = createStore([]);

  const [rowsShown, setRowsShown] = createSignal(25);
  const [pageNum,   setPageNum]   = createSignal(0);

  const curRows = createMemo(() => {
    const n_rows = props.rows.length;
    const s_ind  = (pageNum() * rowsShown());
    const e_ind  = (pageNum() * rowsShown()) + rowsShown();
    let ret = [];
    for (let i = s_ind; i < e_ind; i++) {
      if (i < n_rows) {
        ret.push(props.rows[i]);
      }
    }
    return ret;
  })

  const getCheckbox    = (id: number) => {
    for (let c of checkboxList) {
      if (c.id == id) return c.checked;
    }
    return false
  }
  const toggleCheckbox = (id: number) => {
    setCheckboxList(todo => todo.id === id, "checked", checked => !checked);
  }

  onMount(() => {
    let l = [];
    for (let row of props.rows) {
      l.push({'id': row.id, checked: false});
    }
    setCheckboxList(l);
  });
  
  const checkComponent = (id: string, headers: TableHeader)  => (
    <Grid item xs={headers.xs} sm={headers.sm} hidden={props.mobileHidden}>
      <Checkbox
        size="small"
        checked={getCheckbox(parseInt(id))}
        onchange={[toggleCheckbox, id]}
        inputProps={{ "aria-label": "controlled", "class": checkboxClassName }}></Checkbox>
    </Grid>
  );
  const textComponent = (text: string, headers: TableHeader) => (
    <Grid item xs={headers.xs} sm={headers.sm} marginY={0} sx={{ display: 'flex', alignItems:'center'}}>
      <Typography variant="body1" component='div' justifySelf='center'>{text}</Typography>
    </Grid>
  );
  const dateComponent = (text: string, headers: TableHeader) => (
    <Grid item xs={headers.xs} sm={headers.sm} marginY={0} sx={{ display: 'flex', alignItems:'center'}}>
      <Typography variant="body1" component='div' justifySelf='center'>{formatDateStr(text)}</Typography>
    </Grid>
  );
  const statusComponent = (id: string, headers: TableHeader) => (
    <Grid item xs={headers.xs} sm={headers.sm} alignContent="center" >
      <TableStatusChip status_id={id} justify='space-around'/>
    </Grid>
  );

  const curHeaders = createMemo(() => {
    let h: TableHeader[] = []
    if (isMobile()) {
      h = [
        { text: "Make",   key: "make",           align: "left",   xs: 3, sm: 3, mobileHidden: false, component: textComponent    },
        { text: "Model",  key: "model",          align: "left",   xs: 3, sm: 3, mobileHidden: false, component: textComponent    },
        { text: "Color",  key: "exterior_color", align: "left",   xs: 2, sm: 2, mobileHidden: false, component: textComponent    },
        { text: "Status", key: "status_id",      align: "center", xs: 4, sm: 4, mobileHidden: false, component: statusComponent  }
      ]
    } else {
      h = [
        // { text: "",       key: "id",             align: "center", xs: 0, sm: 1, mobileHidden: true, component: checkComponent   },
        { text: "VIN",    key: "vin",            align: "left",   xs: 3, sm: 3, mobileHidden: false, component: textComponent    },
        { text: "Make",   key: "make",           align: "left",   xs: 3, sm: 1, mobileHidden: false, component: textComponent    },
        { text: "Model",  key: "model",          align: "left",   xs: 3, sm: 2, mobileHidden: false, component: textComponent    },
        { text: "Year",   key: "model_year",     align: "left",   xs: 0, sm: 1, mobileHidden: true, component: textComponent    },
        { text: "Color",  key: "exterior_color", align: "left",   xs: 2, sm: 1, mobileHidden: false, component: textComponent    },
        { text: "Inventory Date",  key: "inventory_date", align: "left", xs: 2, sm: 2, mobileHidden: false, component: dateComponent    },
        { text: "Status", key: "status_id",      align: "center", xs: 4, sm: 2, mobileHidden: false, component: statusComponent  }
      ]
    }
    return h
  });


  const noResultsFoundRow = () => (
    <InventoryListTableRow sx={{...style.tr, ...style.treven}}>
      <InventoryListTableHeaderCol 
        xs={12} sm={12} 
        align='center' 
        text="No results." 
        curSort={{key: "", dir: ""}}
        handleSort={() => {}}/>
    </InventoryListTableRow>
  );
  
  const rowClicked =     (target: HTMLElement, id: number) => {
    if (!target.classList.contains(checkboxClassName)) {
      navigate(`/vehicle/${id}`, {replace: false});
      // console.log(`Navigating to /vehicle/${id}`);
      return;
    }
  };
  

  return (
    <Card sx={style.card}>
      <Grid item container>
        <InventoryListTableRow sx={{...style.tr, ...style.trhead}}>
          <For each={curHeaders()}>{(h) => 
            <InventoryListTableHeaderCol 
              align={h.align} 
              xs={h.xs} sm={h.sm} 
              sx={style.tdhead} 
              curSort={props.curSort}
              handleSort={props.handleSort}
              key={h.key}
              text={h.text}/>
          }</For>
        </InventoryListTableRow>

        {/* Rows with no results row*/}
        <Show when={props.rows.length > 0} fallback={noResultsFoundRow}>
          <For each={curRows()}>{(row, i) => 
            <InventoryListTableRow onclick={(e) => rowClicked((e.target as HTMLElement), row.id) } sx={{...style.tr, ...(i() % 2 == 0 ? style.treven : style.trodd)}}>
              <For each={curHeaders()}>{(h) => 
                h.component(row[h.key], h)
              }</For>
            </InventoryListTableRow>
          }</For>
        </Show>
        
        {/* FOOTER */}
        <InventoryListTableRow sx={{...style.tr, ...style.trhead, ...{paddingX: 1}}}>
          <InventoryListTableFooter 
            onRowChange={setRowsShown} 
            onPageChange={setPageNum}
            n_rows={props.rows.length}/>
        </InventoryListTableRow>
      </Grid>
    </Card>
  );
}