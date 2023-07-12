import { Grid, Typography, Button } from "@suid/material";
import { useGlobalContext } from "../../global/store";
import StackRowCentered from "../StackRowCentered";
import IndexSectionContainer from "./IndexSectionContainer";
import style from "../../global/style";
import IndexBlogRecents from "./IndexBlogRecents";
import CustomButton from "../Navbar/CustomButton";
import CustomChip from "../CustomChip";

const IndexBlog = () => {
  const { navigate } = useGlobalContext();
  return (
    <IndexSectionContainer backgroundColor={style.palette.black}>
      <Grid item container xs={12} lg={4} paddingBottom={2}>
        <Grid item container xs={12}>
          <CustomChip type="white" text="Blog" />
        </Grid>
        <Typography variant="h1" py={2} color={style.palette.white}>
          Stay up to date
        </Typography>
        <Typography variant="h5" py={2} color={style.palette.white}>
          With the latest insights, industry trends, and updates from our team. 
        </Typography>
        <CustomButton type="red" text="Read the Blog" onClick={() => navigate('/blog')} />
        {/* <StackRowCentered><DisplayText align='center'>Blog</DisplayText></StackRowCentered> */}
      </Grid>
      <Grid item container xs={12} lg={8} paddingTop={2}>
        <IndexBlogRecents />
      </Grid>
    </IndexSectionContainer>
  );
};

export default IndexBlog;
