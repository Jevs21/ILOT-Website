import { Box, Grid, Modal, Popover, Stack, Typography } from "@suid/material";
import { createMemo, createResource, createSignal, For, onMount, Show } from "solid-js";
import StackRowCentered from "../../elements/StackRowCentered";
import { formatDateStrShort } from "../../global/helpers";
import { useGlobalContext } from "../../global/store";
import AccountContributionsInformationModal from "./AccountContributionsInformationModal";

const HeatmapBox = (props) => {
  const [isHovering, setIsHovering] = createSignal(false); 
  const [anchorEl, setAnchorEl] = createSignal<Element | null>(null);

  const handlePopoverOpen = (event: { currentTarget: Element }) => {
    setIsHovering(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setIsHovering(false);
    setAnchorEl(null);
  };
  const boxCol = createMemo(() => {
    if (props.value > 0) {
      const norm = props.value / props.max;
      // console.log(norm);
      if (norm < 0.25) {
        return "#9be9a8";
      }
      else if(norm < 0.5) {
        return "#40c463";
      }
      else if(norm < 0.75) {
        return "#30a14e";
      }
      else {
        return "#216e39";
      }
    } else {
      // if (props.date == null) {
      //   return "";
      // }
      return '#FEFEFE';
    }
  })
  const boxStyle = createMemo(() => {
    return {
      width: '14px', 
      height: '14px', 
      margin: '2px',
      borderRadius: '2px',
      backgroundColor: boxCol()
    }
  })
  onMount(() => {
    const el = document.getElementById("heatmap_scrollbox");
    el.scrollLeft = el.scrollWidth * 2;
  })
  return (
    <>
      <Show 
        when={props.date != null}
        fallback={<Box sx={boxStyle()}></Box>}>
        <Box 
          aria-owns={isHovering() ? "mouse-over-popover_": undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={boxStyle()}></Box>
        <Popover
          id={"mouse-over-popover_"}
          sx={{ pointerEvents: "none" }}
          open={isHovering()}
          anchorEl={anchorEl()}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus>
            <Stack padding={2}>
              <Typography>{formatDateStrShort(props.date)}</Typography>
              <Typography>Contributions: {props.value}</Typography>
            </Stack>
          </Popover>
      </Show>
    </>
  )
}

const AccountContributionsHeatmap = (props) => {
  const { apiCall } = useGlobalContext();
  const fetchContributions = async () => (await apiCall('/analytics/get_my_contribution_heatmap'));
  const [contributions, {mutate, refetch}] = createResource(fetchContributions);
  
  const [showInstructionModal, setShowInstructionModal] = createSignal(false);
  const closeModal = () => setShowInstructionModal(false);

  return (
    <Show when={!contributions.loading}>
      <Grid item xs={12} paddingX={1}>
        <Typography>{contributions().n} contributions in the last 6 months.</Typography>
      </Grid>
      <Grid container item xs={12} padding={1}>
        <Stack id="heatmap_scrollbox" direction="row" position="relative" overflow="scroll">
          <Stack>
            <Stack direction="row" justifyContent="space-evenly">
              <For each={contributions().months}>{(month) =>
                <Typography variant="body2">{month}</Typography>
              }</For>
            </Stack>

            <Stack direction="row">
              <Stack justifyContent="space-evenly" marginRight={0.5}>
                <Typography variant="body2" align="right">MON</Typography>
                <Typography variant="body2" align="right">WED</Typography>
                <Typography variant="body2" align="right">FRI</Typography>
              </Stack>
              <For each={contributions().weeks}>{(week) =>
                <Stack>
                  <For each={week}>{(day) =>
                    <HeatmapBox value={day.count} max={contributions().max} date={day.date}/>
                  }</For>
                </Stack>
              }</For>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} paddingX={1}>
        <StackRowCentered justifyContent="space-center">
          <Box flexGrow={1}>
            <Typography onClick={() => setShowInstructionModal(true)} fontSize="0.8em">How are contributions counted?</Typography>
          </Box>
          <Stack direction="row">
            <HeatmapBox value={0} max={4} date={null}/>
            <HeatmapBox value={1} max={8} date={null}/>
            <HeatmapBox value={2} max={5} date={null}/>
            <HeatmapBox value={2} max={4} date={null}/>
            <HeatmapBox value={4} max={4} date={null}/>
          </Stack>
        </StackRowCentered>
      </Grid>
      <Modal open={showInstructionModal()} onClose={closeModal}>
        <AccountContributionsInformationModal closeModal={closeModal}/>
      </Modal>
    </Show>
  );
}

export default AccountContributionsHeatmap;