import { Button, Typography } from "@suid/material";
import { createSignal } from "solid-js";
import InstructionModal from "../../elements/InstructionModal/InstructionModal";
import { useGlobalContext } from "../../global/store";

const AccountContributionsInformationModal = (props) => {
  const {apiCall, uuid} = useGlobalContext();
  const confirmFirstInstructionsRead = async () => {
    await apiCall('/user/confirm_first_login', 'POST', {}, {uuid: uuid()});
    props.closeModal();
  }
  const [pages, setPages] = createSignal([
    { title: "How Contributions Are Counted", body: (
      <>
        <Typography paddingY={2}>
          During I-LOT's Beta phase, contributions include any task activity (creating, completing, editing or deleting) and any status change activity.
        </Typography> 
        <Button onClick={confirmFirstInstructionsRead}>Close</Button>
      </>
    )}
  ]);
  return (<InstructionModal pages={pages()}/>);
}

export default AccountContributionsInformationModal;