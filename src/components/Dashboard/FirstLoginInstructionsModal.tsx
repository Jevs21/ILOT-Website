import { Button, Typography } from "@suid/material";
import { createSignal } from "solid-js";
import InstructionModal from "../../elements/InstructionModal/InstructionModal";
import { useGlobalContext } from "../../global/store";

const FirstLoginInstructionsModal = (props) => {
  const {apiCall, uuid} = useGlobalContext();
  const confirmFirstInstructionsRead = async () => {
    await apiCall('/user/confirm_first_login', 'POST', {}, {uuid: uuid()});
    props.closeModal();
  }
  const [pages, setPages] = createSignal([
    { title: "Welcome to I-LOT", body: <Typography>Test1</Typography> },
    { title: "Two", body: <Typography>Test2</Typography> },
    { title: "Thrreee", body: <Typography>Test3</Typography> },
    { title: "Four", body: <Button onClick={confirmFirstInstructionsRead}>Confirm</Button> },
  ]);
  return (<InstructionModal pages={pages()}/>);
}

export default FirstLoginInstructionsModal;