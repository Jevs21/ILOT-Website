import { Fade } from "@suid/material";
import { Show } from "solid-js";

const ShowAndFadeEl = (props) => (
  <Show when={props.when}>
    <Fade in={props.when}>
      {props.children}
    </Fade>
  </Show>
);

export default ShowAndFadeEl;