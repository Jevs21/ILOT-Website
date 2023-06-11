import { useParams } from "@solidjs/router";
import BlogPostData from "../models/BlogPostData";
import { onMount } from "solid-js";
import { Button, Grid, Stack, Typography } from "@suid/material";
import { ChevronLeft } from "@suid/icons-material";

const BlogPost = () => {
  // get slug from url
  onMount(() => {
    const params = useParams();
    console.log("Params")
    console.log(params.slug);
  });

  const post: BlogPostData = {
    id: 1,
    title: "Blog Post 1",
    content: "This is the content of blog post 1",
    content_snippet: "This is the content of blog post 1",
    slug: "blog-post-1",
    date: "2021-01-01",
    updated: "2021-01-01",
    thumbnail_url: "https://via.placeholder.com/150"
  };

  return (
    <>
      <Grid item container>
        <Grid item xs={1} md={2} ></Grid>
        <Grid container item xs={10} md={8}>
          <Grid item xs={12} py={4}>
            <Button variant="outlined" href="/blog" startIcon={<ChevronLeft/>}>Back</Button>
          </Grid>
          <Grid item xs={12} py={2} paddingBottom={6}>
            <Typography variant="h1" gutterBottom >{post.title}</Typography>
          </Grid>
          <Stack>
            <Typography variant="body1" gutterBottom>{post.content}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={1} md={2} ></Grid>
      </Grid>
    </>
  );
}

export default BlogPost;
