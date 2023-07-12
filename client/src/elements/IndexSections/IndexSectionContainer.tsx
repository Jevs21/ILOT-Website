import { Grid } from "@suid/material";
import { useGlobalContext } from "../../global/store";

const IndexSectionContainer = (props) => {
  const { isMobile } = useGlobalContext();
  return (
    <Grid container {...props} py={props.py || (isMobile()) ? 4 : 16} sx={{overflowX: 'hidden'}}>
      <Grid item xs={0} md={1}></Grid>
      <Grid item container xs={12} md={10} px={isMobile() ? 2 : 0} sx={{overflowX: 'hidden'}}>
        {props.children}
      </Grid>
      <Grid item xs={0} md={1}></Grid>
    </Grid>
  );
}

export default IndexSectionContainer;