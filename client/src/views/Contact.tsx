import SectionHeaderEl from "../elements/SectionHeaderEl";
import HeaderEl from "../elements/RouteHeader";
import { Show, createSignal, lazy } from "solid-js";
import { Alert, Button, Divider, Fade, FormControl, Grid, Stack, TextField, Typography } from "@suid/material";
import StackRowCentered from "../elements/StackRowCentered";
import IndexSectionContainer from "../elements/IndexSections/IndexSectionContainer";
const AboutIcon = lazy(() => import("@suid/icons-material/People"));

const Contact = () => {
  const [hasSubmitted, setHasSubmitted] = createSignal(false);
  const [feedbackMsg, setFeedbackMsg] = createSignal("");
  const [error, setError] = createSignal(false);

  const [formData, setFormData] = createSignal({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dealershipGroup: "",
    dealershipName: "",
    position: "",
    message: "",
  });

  const handleSubmit = (e) => {
    setHasSubmitted(true);
    e.preventDefault();
    
    const data = formData();
    fetch('./scripts/submitContact.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    // setError(true);
    setFeedbackMsg("Thank you! You will hear from us soon.");

    setTimeout(() => {
      setFeedbackMsg("");
      setError(false);
    }, 10000);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (

    // <Grid item container xs={12}>
    //   <Grid item xs={1} md={2} lg={3}></Grid>
    //   <Grid item container xs={10} md={8} lg={6}>
    <IndexSectionContainer py={10}>
      <Stack py={4} spacing={3} alignItems="center" width={'100%'}>
        <Typography variant="h5" align="justify">
        Looking to transform your dealership operations with ILOT? 
        We'd love to hear from you. Let us help you enhance your efficiency, performance, and profitability.
        </Typography>
        <Divider />
        <FormControl fullWidth>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <StackRowCentered>
                <TextField label="First Name" name="firstName" variant="outlined" fullWidth required onChange={handleInputChange}/>
                <TextField label="Last Name" name="lastName" variant="outlined" fullWidth required onChange={handleInputChange}/>
              </StackRowCentered>
              <StackRowCentered>
                <TextField label="Phone" name="phone" variant="outlined" fullWidth required onChange={handleInputChange}/>
                <TextField label="Email" name="email" variant="outlined" fullWidth required onChange={handleInputChange}/>
              </StackRowCentered>
              <StackRowCentered>
                <TextField label="Dealership Group" name="dealershipGroup" variant="outlined" fullWidth onChange={handleInputChange}/>
                <TextField label="Dealership Name" name="dealershipName" variant="outlined" fullWidth required onChange={handleInputChange}/>
              </StackRowCentered>
              <TextField label="Position" name="position" variant="outlined" fullWidth required onChange={handleInputChange}/>
              <TextField label="Message" name="message" variant="outlined" multiline rows={4} fullWidth required onChange={handleInputChange}/>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
              <Fade in={hasSubmitted() && feedbackMsg().length > 0}>
                <Alert severity={(error()) ? "error" : "success"} >{feedbackMsg()}</Alert>
              </Fade>
            </Stack>
          </form>
        </FormControl>
      </Stack>
    </IndexSectionContainer>
    //   </Grid>
    //   <Grid item xs={1} md={2} lg={3}></Grid>
    // </Grid>
  );
};

export default Contact;