import { ChevronRight, Close, FilterList, KeyboardArrowDown } from "@suid/icons-material";
import { Stack, Chip, Modal, Typography, FormControl, Drawer, Box, Checkbox, IconButton, Divider } from "@suid/material";

import { createEffect, createMemo, createSignal, For, onMount, Show } from "solid-js";

import DateRangePickerEl from "../../elements/DateRangePickerEl";
import FloatRangeSliderEl from "../../elements/FloatRangeSliderEl";
import ModalBoxEl from "../../elements/ModalBoxEl";
import ShowAndFadeEl from "../../elements/ShowAndFadeEl";
import StackRowCentered from "../../elements/StackRowCentered";
import StatusChip from "../../elements/StatusChip";
import { useGlobalContext } from "../../global/store";
import FilterPropsSelected from "../../models/FilterPropsSelected";
import style from "./../../global/style";
import FilterProps from "./../../models/FilterProps";



const FilterHeader = (props) => {
  const {selectedInvFilters} = useGlobalContext();
  const n = createMemo(() => selectedInvFilters().length);
  return (
    <StackRowCentered paddingY={2} justifyContent='space-between'>
      <StackRowCentered paddingLeft={2}>
        <FilterList fontSize="large"/>
        <Typography align="center" variant="h2">Filters ({n()})</Typography>
      </StackRowCentered>
      <IconButton onClick={props.onClose} sx={{marginRight: 3}}>
        <Close fontSize="large"/>
      </IconButton>
    </StackRowCentered>
  );
}

const FilterChip = (props) => (
  <Chip 
    clickable 
    label={props.label}
    variant="outlined"
    sx={{backgroundColor: style.palette.white}}
    onDelete={props.onDelete}/>
);


const FilterButton = (props) => {
  const label = createMemo(() => {
    if (props.n == 0) {
      return "FILTERS";
    } else {
      return `(${props.n})`;
    }
  });

  return (
    <Chip
      {...props}
      clickable
      icon={<FilterList fontSize="small" sx={{paddingLeft: 0.5}}/>}
      label={label()}  />
  )
}

const FilterModalContainer = (props) => {
  const {isMobile} = useGlobalContext();
  return (
    <Show 
      when={isMobile()}
      fallback={
        <Modal
          open={props.open}
          onClose={props.onClose}>
            <ModalBoxEl>
              <Box height="100%" width="100%">
                {props.children}
              </Box>
            </ModalBoxEl>
        </Modal>
      }>
      <Drawer
        anchor="bottom"
        open={props.open}
        onClose={props.onClose}  
        sx={{ zIndex: 8888 }}>
          {props.children}
        </Drawer>
    </Show>
  );
}


const FilterContainer = (props) => {
  const {selectedInvFilters} = useGlobalContext();
  const [filt, setFilt] = createSignal<FilterProps>(props.filter);
  const [isOpen, setIsOpen] = createSignal(false);
  const [num, setNum] = createSignal(0);

  const filterEl = createMemo(() => {
    if (filt().filt_type == "list") {
      return <FilterCheckbox filter={filt()} />
        // addFilter={props.addFilter} removeFilter={props.removeFilter}/>
    } else if (filt().filt_type == "date") {
      return <FilterDate filter={filt()} isVisible={isOpen()}/>
    }
    else if (filt().filt_type == "range") {
      return <FilterFloatRange filter={filt()} isVisible={isOpen()}/>
    }
    return <></>
  })

  const hideIcon = createMemo(() => (isOpen()) ? <KeyboardArrowDown/> : <ChevronRight/>);

  const selLen = createMemo(() => {
    return (num()) ? `(${num()})` : '';
  });

  createEffect(() => {
    let n = 0;
    for (let f of selectedInvFilters()) {
      if (f.key == filt().key) {
        n += 1;
      }
    }
    setNum(n);
  });

  return (
    <Box>
      <StackRowCentered justifyContent='space-between' onClick={() => setIsOpen(!isOpen())}>
        <Typography paddingX={2} variant="h3">{filt().label} {selLen()}</Typography>
        <IconButton sx={{paddingRight: 3}}>
          {hideIcon()}
        </IconButton>
      </StackRowCentered>
      <ShowAndFadeEl when={isOpen()}>
        <Box px={2} paddingTop={1} paddingRight={4}>
          <FormControl size="small" fullWidth>
            {filterEl()}
          </FormControl>
        </Box>
      </ShowAndFadeEl>
    </Box>
  )
}

const FilterCheckbox = (props) => {
  const { addInvFilter, removeInvFilter, selectedInvFilters } = useGlobalContext();
  const [filt, setFilt] = createSignal<FilterProps>(props.filter);

  return (
    <For each={filt().values}>{(val) => {
      const isSelected = createMemo(() => {
        for (let f of selectedInvFilters()) {
          if (f.key == filt().key && f.selected == val) {
            return true;
          }
        }
        return false;
      });
      // const [ch, setCh] = createSignal(initialSelected());
      return (
        <StackRowCentered>
          <Checkbox 
            checked={isSelected()}
            onChange={(event, checked) => {
              if (checked) {
                addInvFilter(filt().key, val, "list");
              } else {
                removeInvFilter(filt().key, val);
              }
              // setCh(checked);
          }}></Checkbox>
          <Show 
            when={filt().el_type == "status_select"}
            fallback={<Typography variant="body1">{val}</Typography>}>
              <StatusChip status_id={parseInt(val)} csize="small"/>
          </Show>
          
        </StackRowCentered>
      );
    }}</For>
  )
}

const FilterDate = (props) => {
  const { selectedInvFilters } = useGlobalContext();
  const filt: FilterProps = props.filter;
  const vals = createMemo(() => {
    let ret = [new Date(), new Date()];
    for (let f of selectedInvFilters()) {
      if (f.key == filt.key && f.type == "date_min") {
        ret[0] = new Date(f.selected);
      } else if (f.key == filt.key && f.type == "date_max") {
        ret[1] = new Date(f.selected);
      }
    }
    return ret;
  });
  return (
    <DateRangePickerEl 
      key={filt.key} 
      id={`${filt.key}_datepicker`} 
      isVisible={props.isVisible}
      initialVals={vals()}/>
  )
}

const FilterFloatRange = (props) => {
  const { selectedInvFilters } = useGlobalContext();
  const filt: FilterProps = props.filter;

  const vals = createMemo(() => {
    let ret = [filt.filt_opts.min, filt.filt_opts.max];
    for (let f of selectedInvFilters()) {
      if (f.key == filt.key && f.type == "range_min") {
        ret[0] = parseInt(f.selected);
      } else if (f.key == filt.key && f.type == "range_max") {
        ret[1] = parseInt(f.selected);
      }
    }
    return ret;
  });

  return (
    <FloatRangeSliderEl 
      id={`${filt.key}_range`} 
      key={filt.key}
      isVisible={props.isVisible} 
      opts={filt.filt_opts}
      initialVals={vals()}/>
  )
}

const InventoryListFilters = (props) => {
  const { apiCall, selectedInvFilters, removeInvFilter } = useGlobalContext();

  // Get the list of filters from the server
  const fetchFilterOptions = async () => ( await apiCall('/vehicle/get_vehicle_filter_options') );
  // const [filterOptions] = createResource(fetchFilterOptions);
  const [filterOptions, setFilterOptions] = createSignal<FilterProps[]>([]);
  onMount(async () => {
    const opts = await fetchFilterOptions();
    setFilterOptions(opts.filters);
  })

  // Show filter drawer/modal
  const [open, setOpen] = createSignal(false);

  const filtList = createMemo<FilterProps[]>(() => {
    return filterOptions();
  });

  const filterChipLabel = (filt: FilterPropsSelected) => {
    const f = filtList().find((f) => f.key == filt.key);
    if (f) {
      if (filt.type == "list") {
        return `${f.label} = ${filt.selected}`;
      } else if (filt.type == "range_min") {
        return `${f.label} >= ${filt.selected}`;
      } else if (filt.type == "range_max") {
        return `${f.label} <= ${filt.selected}`;
      }
    }
    return `${filt.key}=${filt.selected}`;
  }

  return (
    <>
      {/* FILTER CHIPS */}
      <Stack direction="row" spacing={1} sx={{overflowX: 'scroll'}}>
        <FilterButton 
          n={selectedInvFilters().length} 
          onClick={() => setOpen(true)}/>
        <For each={selectedInvFilters()}>{(filt: FilterPropsSelected) =>
          <FilterChip
            label={filterChipLabel(filt)}
            onDelete={() => removeInvFilter(filt.key, filt.selected)}/>
        }</For>
        <Show when={selectedInvFilters().length > 0}>
          <FilterChip
            label="CLEAR ALL"
            onDelete={() => {
              for (let f of selectedInvFilters()) {
                removeInvFilter(f.key, f.selected);
              }
            }}/>
        </Show>
      </Stack>

      <FilterModalContainer open={open()} onClose={() => setOpen(false)}>
          <Stack height="80vh" width="100%" spacing={0}>
            
            <FilterHeader onClose={() => setOpen(false)}/>
            <Divider/>

            <Stack height="100%" width="100%" spacing={2} sx={{overflowY: "scroll"}}>
              <For each={filtList()}>{(filt) => 
                <>
                <Divider/>
                <FilterContainer filter={filt} />              
                </>
              }</For>
            </Stack>
          </Stack>
      </FilterModalContainer>
    </>
  )
}

export default InventoryListFilters;