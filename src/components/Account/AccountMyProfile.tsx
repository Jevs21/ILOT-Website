import { Grid, Typography, Button, Modal, Stack } from "@suid/material";
import { createSignal } from "solid-js";
import ModalBoxEl from "../../elements/ModalBoxEl";
import SectionHeaderEl from "../../elements/SectionHeaderEl";
import { useGlobalContext } from "../../global/store";

const AccountMyProfile = (props) => {
  const { fullname, email, clearStore, apiCall, navigate } = useGlobalContext();

  const [passResetModal, setPassResetModal] = createSignal(false);

  const tryResetRequest = async (e) => {
    e.preventDefault();
    const resp = await apiCall('/user/password_reset_request', 'POST', {}, {
      email: email(),
    });
    
    if (resp.valid) {
      await logout()
    }
    else {
      console.log("Error sending password reset request");
    }
    setPassResetModal(false);
  };
  const logout = async () => {
    await apiCall('/user/logout', 'POST');
    clearStore();
    navigate('/login');
  };
  
  return (
    <>
      <Grid item container xs={12} paddingBottom={2}>
        <SectionHeaderEl>PROFILE</SectionHeaderEl>
        <Grid item xs={12}>
          <Typography fontSize="1.1em">{fullname()}</Typography>
        </Grid>
        <SectionHeaderEl>E-MAIL</SectionHeaderEl>
        <Grid item xs={12}>
          <Typography fontSize="1.1em">{email()}</Typography>
        </Grid>

        <SectionHeaderEl>PASSWORD</SectionHeaderEl>
        <Grid item xs={12}>
          <Typography fontSize="1.1em">************</Typography>
        </Grid>
      </Grid>
      
      <Grid item xs={12}>
        <Button onClick={() => setPassResetModal(true)}>Reset Password</Button>
      </Grid>
      <Grid item xs={12}>
        <Button color="error" onClick={logout}>Logout</Button>
      </Grid>

      <Modal open={passResetModal()} onClose={() => setPassResetModal(false)}>
        <ModalBoxEl>
          <Typography>Are you sure you want to reset your password?</Typography>
          <Stack direction="row" paddingTop={1} justifyContent="space-around">
            <Button onClick={() => setPassResetModal(false)} color="error">
              Cancel
            </Button>
            <Button 
              onClick={tryResetRequest} 
              color="success">
                Confirm
            </Button>
          </Stack>
        </ModalBoxEl>
      </Modal>
    </>
  );
}

export default AccountMyProfile;