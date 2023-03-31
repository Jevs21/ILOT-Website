import { Cancel } from "@suid/icons-material";
import { IconButton } from "@suid/material";
import { Show } from "solid-js";

const TextFieldClearBtn = (props) => {
  return (
    <Show when={props.show.length > 0}>
      <IconButton onClick={props.onClick} tabIndex={-1}>
        <Cancel/>
      </IconButton>
    </Show>
  )
}

export default TextFieldClearBtn;