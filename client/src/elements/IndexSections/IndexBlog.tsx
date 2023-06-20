import { Grid, Typography, Button } from "@suid/material";
import { useGlobalContext } from "../../global/store";
import StackRowCentered from "../StackRowCentered";
import IndexSectionContainer from "./IndexSectionContainer";
import style from "../../global/style";
import IndexBlogRecents from "./IndexBlogRecents";

const IndexBlog = () => {
  const { navigate } = useGlobalContext();
  return (
    <IndexSectionContainer backgroundColor={style.palette.black}>
      <Grid item container xs={12} paddingBottom={2}>
        <Typography variant="h5" color={style.palette.white}>
          Stay updated with the latest insights, industry trends, and updates from our team. 
          Our blog brings you the wealth of knowledge we've acquired from years of research and application.
        </Typography>
        {/* <StackRowCentered><DisplayText align='center'>Blog</DisplayText></StackRowCentered> */}
      </Grid>
      <IndexBlogRecents />
      <Grid item container xs={12} paddingTop={2}>
        <StackRowCentered justifyContent="center">
          <Button variant="contained" onClick={() => navigate('/blog')} sx={{
            width: '50%',
            backgroundColor: style.palette.white,
            color: style.palette.black
          }}>Read the Blog</Button>
        </StackRowCentered>
      </Grid>
    </IndexSectionContainer>
  );
};

export default IndexBlog;
