import { ArrowRightAlt, CheckBox, CheckBoxOutlineBlank } from "@suid/icons-material";
import { Button, IconButton, LinearProgress, Modal, Stack, Typography } from "@suid/material";
import { createMemo, createSignal, For, onMount, Show } from "solid-js";
import CardEl from "../../elements/CardEl";
import Confetti from "../../elements/Confetti";
import ModalBoxEl from "../../elements/ModalBoxEl";
import StackRowCentered from "../../elements/StackRowCentered";
import StatusChip from "../../elements/StatusChip";
import { getStringFromTimeDiff } from "../../global/helpers";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";
import VehicleLog from "../../models/VehicleLog";
import "../../style/animations.css"

export default function StatusTracker(props) {
  const { isMobile, statusKeys, uuid, apiCall } = useGlobalContext();
  const [ statusId, setStatusId ] = createSignal(props.status_id);
  const [ vId, setVId ] = createSignal(props.v_id);

  const [showModal, setShowModal] = createSignal(false);
  const [newStatus, setNewStatus] = createSignal(null);
  const closeModal = () => {
    setShowModal(false);
    setNewStatus(null);
  }
  
  const setVehicleStatus = async (from, to) => ( await apiCall('/vehicle/set_vehicle_status', 'POST', {}, {
    v_id: props.v_id, 
    status: {from: from, to: to}
  }));

  const confirmPressed = async (e, from, to) => {
    if (props.i != props.status_id) {
      await setVehicleStatus(from, to);
      
      if (statusKeys()[to] == "Website") {
        Confetti();  
      }
      props.refreshData();
    } else {
      e.preventDefault(); 
    }
  }

  const daysSinceStr = createMemo(() => {
    const today = new Date();
    for(let key in props.logs) {
      for (let row of props.logs[key] as VehicleLog[]) {
        if (row.t == "status") {
          const d = new Date(row.dt);
          const diff = d.getTime() - today.getTime();
          return `${getStringFromTimeDiff(diff)} since last status change`;
        }
      }
    }
  })

  const StatusCheckbox = (props) => {
    const checkStyle = {
      // backgroundColor: style.palette.status[props.i].backgroundColor, 
      checked: {
        fontSize: "3.8em",
        zIndex: 5,
        // stroke: style.palette.white,
        // strokeWidth: '1px', 
        color: style.palette.status[props.status_id].backgroundColor,
      },
      next: {
        fontSize: "3.8em",
        zIndex: 5,
        color: (props.status_id < statusKeys().length - 1) ? style.palette.status[props.status_id + 1].backgroundColor : style.palette.status[props.status_id].backgroundColor ,
        animationName: "fade_cycle",
        animationDuration: "3s",
        animationIterationCount: "infinite"
      },
      unchecked: {
        fontSize: "3.8em",
        zIndex: 5,
        // color: style.palette.status[props.status_id].backgroundColor,
      }
    }

    const checkPressed = async (e) => {
      if (props.i != props.status_id) {
        setNewStatus(props.i);
        setShowModal(true);
      }
        // e.preventDefault(); 
    }
    return (
      <IconButton onClick={checkPressed}>
        <Show 
          when={props.i <= props.status_id}
          fallback={
            <Show 
              when={props.i > props.status_id + 1}
              fallback={<CheckBoxOutlineBlank fontSize="large" sx={checkStyle.next}/>}>
                <CheckBoxOutlineBlank fontSize="large" sx={checkStyle.unchecked}/>
            </Show>}>
            <CheckBox fontSize="large" sx={checkStyle.checked}/>
        </Show>
      </IconButton>
    );
  }

  const StatusText = (props) => {
    return (
      <Typography align="center" variant="body1" component='div' fontWeight={(props.is_bold) ? 600 : 400}>{props.children}</Typography>
    );
  }

  const StatusLine = (props) => {
    const [progress, setProgress] = createSignal(0);
    // const s = { width: "40px", display: "block",  zIndex: 0, opacity: 0.7, backgroundColor: style.palette.status[props.status_id].backgroundColor};
    const s = { width: "40px", display: "block",  zIndex: 0, opacity: 0.7};
    
    onMount(() => {
      if (props.status_id > props.i) {
        setProgress(100);
      } else if (props.status_id == props.i) {
        setProgress(null);
      } else {
        setProgress(0);
      }
      style['backgroundColor'] = "#FF0000";
    })
    return (
      <Show 
        when={progress() != null}
        fallback={<LinearProgress sx={s}/>}>
          <LinearProgress variant="determinate" value={progress()} sx={s}/>
      </Show>
    )
  }

  onMount(() => {
    const el = document.getElementById('status_tracker_scrollable');
    if (props.status_id > 0) {
      el.scrollLeft = el.scrollWidth / (statusKeys().length - props.status_id)
    }
  })

  return (
    <CardEl>
        <Stack 
          id="status_tracker_scrollable"
          direction="row" 
          spacing={0} paddingY={2} paddingX={3}
          // alignItems="center"
          justifyContent={(isMobile()) ? "" : "center"} 
          sx={{position: 'relative', overflow: 'scroll'}}> 
            <For each={statusKeys()}>{(k, i) => (
                <>
                  <Stack alignItems='center' marginX={-3}>
                    <StatusCheckbox refreshFunc={props.refreshData} uuid={uuid()} v_id={vId()} status_id={statusId()} i={i()}/>
                    <StatusText is_bold={(i() == statusId() + 1)}>{k}</StatusText>
                  </Stack>
                  
                  <Show when={i() < statusKeys().length - 1}>
                    <Stack justifyContent="center">
                      <StatusLine status_id={statusId()} i={i()}/>
                    </Stack>
                  </Show>
                </>
            )}</For>
        </Stack>

      <Stack direction="row" marginY={2} justifyContent="center">  
        <Typography>{daysSinceStr}</Typography>
      </Stack>

      <Modal 
          open={showModal()}
          onClose={closeModal}>
          <ModalBoxEl>
            <Show when={newStatus() != null}>
              <Stack spacing={2} justifyContent="center" alignContent="space-around">
                <Typography variant="h2" align="center">Change Status</Typography>
                <Typography paddingY={2}>Are you sure you want to change this vehicle's status?</Typography>
                {/* <Typography align="center">{props.v_title}</Typography> */}

                <StackRowCentered justifyContent="center">
                    <StatusChip csize="small" status_id={props.status_id}/>
                    <ArrowRightAlt fontSize="large"/>
                    <StatusChip csize="small" status_id={newStatus()}/>
                </StackRowCentered>
              

                <Stack direction="row" paddingTop={1} justifyContent="space-around">
                  <Button onClick={closeModal} color="error">
                    Cancel
                  </Button>
                  <Button 
                    onClick={async (e) => await confirmPressed(e, props.status_id, newStatus())} 
                    color="success">
                      Confirm
                  </Button>
                </Stack>
              </Stack>
              
            </Show>
          </ModalBoxEl>
        </Modal>
    </CardEl>
  );
}