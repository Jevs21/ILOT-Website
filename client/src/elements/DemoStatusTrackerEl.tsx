import { For, Show, createMemo, createSignal, onMount } from "solid-js";
import style from "../global/style";
import { CheckBox, CheckBoxOutlineBlank } from "@suid/icons-material";
import { IconButton, LinearProgress, Stack, Typography } from "@suid/material";
import CardEl from "./CardEl";
import { useGlobalContext } from "../global/store";
import Confetti from "./Confetti";

const DemoStatusTrackerEl = (props) => {
  const { isMobile } = useGlobalContext();
  const [ statusId, setStatusId ] = createSignal(props.status_id);
  // const [ vId, setVId ] = createSignal(props.v_id);
  const [ statusKeys, setStatusKeys ] = createSignal(props.status_keys);

  const changeStatus = (id) => {
    props.onChange(id);
    setStatusId(id);
  }

  const daysSinceStr = createMemo(() => {
    return `14h since last status change`;
  });

  const StatusCheckbox = (props) => {
    const checkStyle = createMemo(() => ({
      // backgroundColor: style.palette.status[props.i].backgroundColor, 
      checked: {
        fontSize: "3.8em",
        zIndex: 5,
        // stroke: style.palette.white,
        // strokeWidth: '1px', 
        color: style.palette.status[statusId()].backgroundColor,
      },
      next: {
        fontSize: "3.8em",
        zIndex: 5,
        color: (statusId() < statusKeys().length - 1) ? style.palette.status[statusId() + 1].backgroundColor : style.palette.status[statusId()].backgroundColor ,
        animationName: "fade_cycle",
        animationDuration: "3s",
        animationIterationCount: "infinite"
      },
      unchecked: {
        fontSize: "3.8em",
        zIndex: 5,
        // color: style.palette.status[props.status_id].backgroundColor,
      }
    }));

    const checkPressed = async (e) => {
      if (props.i != statusId()) {
        changeStatus(props.i);
        // if (props.i == statusKeys().length - 1) {
        //   Confetti();
        // }
      }
    }
    return (
      <IconButton onClick={checkPressed}>
        <Show 
          when={props.i <= statusId()}
          fallback={
            <Show 
              when={props.i > statusId() + 1}
              fallback={<CheckBoxOutlineBlank fontSize="large" sx={checkStyle().next}/>}>
                <CheckBoxOutlineBlank fontSize="large" sx={checkStyle().unchecked}/>
            </Show>}>
            <CheckBox fontSize="large" sx={checkStyle().checked}/>
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
      if (statusId() > props.i) {
        setProgress(100);
      } else if (statusId() == props.i) {
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
    if (statusId() > 0) {
      el.scrollLeft = el.scrollWidth / (statusKeys().length - statusId())
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
                    <StatusCheckbox status_id={statusId()} i={i()}/>
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
        <Typography>{daysSinceStr()}</Typography>
      </Stack>
    </CardEl>
  );
};

export default DemoStatusTrackerEl;