import { Button, Grid, Typography } from "@suid/material";
import { createSignal } from "solid-js";
import StackRowCentered from "../../elements/StackRowCentered";
import { useGlobalContext } from "../../global/store";

const VehicleNoteModal = (props) => {
  const { apiCall } = useGlobalContext();
  const setVehicleNote = async (n) => (await apiCall('/vehicle/set_vehicle_note', 'POST', {}, {
    v_id: props.v_id,
    note: n
  }));
  const [note, setNote] = createSignal(props.note);

  function handleNoteChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    setNote(target.value);
  }

  const confirmPressed = async () => {
    const resp = await setVehicleNote(note());
    if (!resp.success) {
      console.log("Error changing note")
    } else {
      props.closeModal()
    }
  }

  const s = {
    width: '90%',
    padding: '12px 20px',
    // 'box-sizing': 'border-box',
    'border': '2px solid #ccc',
    'border-radius': '4px',
    'background-color': '#f8f8f8',
    'font-family': 'Work Sans',
    // 'font-size': '16px',
    // resize: false
  }

  return (
    <Grid item container xs={12}>
      <StackRowCentered justifyContent='center'>
        <Typography variant="h2" paddingBottom={1}>Edit Note</Typography>
      </StackRowCentered>
      <StackRowCentered justifyContent='center' paddingY={2}>
        <textarea 
          id="edit_note_textarea" 
          name="edit_note_textarea" 
          rows={5}
          value={note()} 
          onInput={handleNoteChange} 
          style={s} />
      </StackRowCentered>
      {/* </Grid> */}
      <StackRowCentered justifyContent='space-around'>
        <Button onClick={props.closeModal} color="error">
          Cancel
        </Button>

        <Button 
          disabled={(note() == props.note)}
          onClick={confirmPressed} 
          color="success">
            Confirm
        </Button>
      </StackRowCentered>
    </Grid>
  );
}

export default VehicleNoteModal;