import { useParams } from "@solidjs/router";
import BlogPostData from "../models/BlogPostData";
import { createSignal, onMount } from "solid-js";
import { Button, CircularProgress, Grid, Stack, Typography } from "@suid/material";
import { ChevronLeft } from "@suid/icons-material";
import StackRowCentered from "../elements/StackRowCentered";

const BlogPost = () => {
  const [postData, setPostData] = createSignal<BlogPostData | null>(null);
  // get slug from url
  onMount(async () => {
    const params = useParams();
    const encodedSlug = encodeURIComponent(params.slug);
    const response = await fetch(`../scripts/getBlogPost.php?slug=${encodedSlug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const resp = await response.json();
    if(resp.success) {
      setPostData(resp.data);
    }
  });

  return (
    <>
      <Grid item container>
        <Grid item xs={1} md={2} ></Grid>
        <Grid container item xs={10} md={8}>
          <Grid item xs={12} py={4}>
            <Button variant="outlined" href="/blog" startIcon={<ChevronLeft/>}>Back</Button>
          </Grid>
          <Grid item xs={12} py={2} paddingBottom={6}>
            <Typography variant="h1" gutterBottom >{postData() != null ? postData().title : "Loading..."}</Typography>
          </Grid>
          <Stack spacing={2}>
            {postData() != null ? (
              <div innerHTML={postData().content}></div>
            ) : (
              <StackRowCentered height="100%" justifyContent="center">
                <CircularProgress/>
              </StackRowCentered>
            )}
            {/* { post.content } */}
            {/* <Typography variant="body1" gutterBottom>{post.content}</Typography> */}
          </Stack>
        </Grid>
        <Grid item xs={1} md={2} ></Grid>
      </Grid>
    </>
  );
}

export default BlogPost;
