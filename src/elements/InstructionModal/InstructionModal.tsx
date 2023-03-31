import { ChevronLeft, ChevronRight } from "@suid/icons-material"
import { IconButton, Stack, Typography } from "@suid/material"
import { createSignal, onMount, Show } from "solid-js"
import ModalBoxEl from "../ModalBoxEl"
import StackRowCentered from "../StackRowCentered"

const InstructionModal = (props) => {
  const [curPage, setCurPage] = createSignal(0);
  const changePageLeft = () => {
    if (curPage() - 1 < 0) {
      setCurPage(0);
    } else {
      setCurPage(curPage() - 1);
    }
  }
  const changePageRight = () => {
    if (curPage() + 1 > props.pages.length - 1) {
      setCurPage(props.pages.length - 1);
    } else {
      setCurPage(curPage() + 1);
    }
  }

  onMount(() => console.log(props))

  return (
    <ModalBoxEl>
      <Stack spacing={1}>
        <Typography variant="h2" align="center">{props.pages[curPage()].title}</Typography>
        
        {props.pages[curPage()].body}

        <Show when={props.pages.length > 1}>
          <StackRowCentered justifyContent='space-between'>
            <IconButton onClick={changePageLeft}><ChevronLeft/></IconButton>
            <Typography>Page {curPage() + 1}/{props.pages.length}</Typography>
            <IconButton onClick={changePageRight}><ChevronRight/></IconButton>
          </StackRowCentered>
        </Show>
      </Stack>
    </ModalBoxEl>
  )
}

export default InstructionModal