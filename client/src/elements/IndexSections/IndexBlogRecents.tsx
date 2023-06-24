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

  const recentPost = createMemo(() => {
    if (blogList().length > 0) {
      return blogList().slice(0,1)[0]
    }
    return null;
  });

  onMount(async () => {
    await getBlogPostList();
  });

  return (
    <Grid container item xs={12} my={3} spacing={6} justifyContent="space-evenly">
      {recentPost() && <BlogListItem post={recentPost()} />}
    </Grid>
  );
};

export default IndexBlogRecents;