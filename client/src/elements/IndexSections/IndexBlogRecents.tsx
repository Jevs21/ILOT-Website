import { Grid } from "@suid/material";
import { createMemo, createSignal, onMount } from "solid-js";
import BlogListItem from "../Blog/BlogListItem";
import { useGlobalContext } from "../../global/store";

const IndexBlogRecents = () => {
  const { isMobile } = useGlobalContext();
  const [blogList, setBlogList] = createSignal([]);
  const getBlogPostList = async () => {
    const result = await fetch('./scripts/getBlogPostList.php', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    console.log(res);
    if (res && res.data) {
      console.log(res.data);
      setBlogList(res.data);
    }
  }

  const curList = createMemo(() => {
    return blogList().slice(0,(isMobile() ? 1 : 2))
  });

  onMount(async () => {
    await getBlogPostList();
  });

  return (
    <Grid container item xs={12} my={3} spacing={6} justifyContent="space-evenly">
      {curList().map((post) => (
        <Grid container item xs={12} md={6} lg={4} justifyContent="center">
          <BlogListItem post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default IndexBlogRecents;