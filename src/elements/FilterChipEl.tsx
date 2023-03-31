import { Stack, Chip } from "@suid/material";
import { For } from "solid-js";
import { useGlobalContext } from "../global/store";
import style from "../global/style"

const FilterChipEl = (props) => {
  const { statusKeys } = useGlobalContext();

  const FilterChip = (props) => (
    <Chip 
      clickable 
      label={props.label}
      sx={{backgroundColor: (props.val == props.selected) ? style.palette.accent : style.palette.white}}
      onClick={() => props.setSelected(props.val)}/>
  );
  return (
    <Stack direction="row" spacing={1} sx={{overflowX: 'scroll'}}>
      <FilterChip label="All" val={-1} selected={props.selected} setSelected={props.setSelected}/>
      <For each={statusKeys()}>{(s, i) => 
        <FilterChip label={s} val={i()} selected={props.selected} setSelected={props.setSelected}/>
      }</For>
    </Stack>
  );
}

export default FilterChipEl;