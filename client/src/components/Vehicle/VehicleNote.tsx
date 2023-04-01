import { Edit } from "@suid/icons-material";
import { Box, Modal, Stack, Typography } from "@suid/material";
import { createSignal } from "solid-js";
import CardEl from "../../elements/CardEl";
import ModalBoxEl from "../../elements/ModalBoxEl";
import StackRowCentered from "../../elements/StackRowCentered";
import style from "../../global/style";
import VehicleNoteModal from "./VehicleNoteModal";

const VehicleNote = (props) => {
  const [showModal, setShowModal] = createSignal(false);
  const closeModal = () => {
    props.refreshData();
    setShowModal(false);
  }
  
  return (
    <>
      <CardEl>
        <Stack>
          <Box padding={2}>
            <Typography fontSize="1em">{(props.note) ? props.note : "-"}</Typography>
          </Box>
          <StackRowCentered 
            justifyContent="center" 
            paddingY={1} 
            sx={style.treven}
            onClick={() => setShowModal(true)}>
            <Typography>Edit</Typography>
            <Edit fontSize="small"/>
          </StackRowCentered>
        </Stack>
      </CardEl>
      <Modal 
        open={showModal()}
        onClose={closeModal}>
        <ModalBoxEl>
          <VehicleNoteModal
            v_id={props.v_id} 
            note={props.note} 
            closeModal={closeModal}/>
        </ModalBoxEl>
      </Modal>
    </>
  );
}

export default VehicleNote;