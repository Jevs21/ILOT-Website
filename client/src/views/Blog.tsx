

import { Grid } from "@suid/material";
import SectionHeaderEl from "../elements/SectionHeaderEl";
import BlogList from "../elements/Blog/BlogList";

const Blog = () => {
  return (
    <>
      <Grid item container>
        <Grid item xs={1} md={2} ></Grid>
        <Grid container item xs={10} md={8} justifyContent="center" alignItems="center">
          <BlogList />
        </Grid>
        <Grid item xs={1} md={2} ></Grid>
      </Grid>
    </>
  );
};

export default Blog;