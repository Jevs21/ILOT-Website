import { Box, Divider, Grid, Stack, Typography } from "@suid/material";
import { createMemo, For, Show } from "solid-js";
import StackRowCentered from "../../elements/StackRowCentered";
import { useGlobalContext } from "../../global/store";
import navbar_options from "./navbar_options";
import style from "../../global/style";
import { useLocation } from "@solidjs/router";
import DesktopSidebarWidget from "./DesktopSidebarWidget";

const DesktopSidebarOption = (props) => {
  const {navigate} = useGlobalContext();
  const location = useLocation();
  const isSelected = createMemo(() => location.pathname === props.item.href);
  
  return (
    <StackRowCentered 
      onClick={() => navigate(props.item.href)} 
      paddingY={2}
      sx={(isSelected()) ? style.sidebar_item_selected : style.sidebar_item}>
        {props.item.side_icon()}
        <Typography class="sidebar_item_text" variant="h3" fontSize='1.1em' color={props.item.side_color}>{props.item.text}</Typography>
        <Show when={isSelected()}>
          <Box position="absolute" sx={style.sidebar_item_selected_indicator}></Box>
        </Show>
    </StackRowCentered>
  )
}

const DesktopSidebar = (props) => {
  return (
    <Box position="fixed" sx={style.sidebar}>
      <Stack height='100%' justifyContent='space-between'>
        <Stack>
          <Divider sx={{backgroundColor: style.palette.grey[0]}}/>
          <DesktopSidebarWidget/>
          <Divider sx={{backgroundColor: style.palette.grey[0]}}/>
          <For each={navbar_options.top}>{(item) =>
            <DesktopSidebarOption item={item}/>
          }</For>
        </Stack>
        <Stack>
          <For each={navbar_options.bottom}>{(item) =>
            <DesktopSidebarOption item={item}/>
          }</For>
        </Stack>
      </Stack>
    </Box>
    // </Grid>
  );
}

export default DesktopSidebar;