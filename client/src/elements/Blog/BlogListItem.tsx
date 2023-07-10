import { Box, Card, Stack, Typography } from "@suid/material";
import BlogPostData from "../../models/BlogPostData";
import { useNavigate } from "@solidjs/router";

const BlogListItem = (props) => {
  const post: any = props.post;
  const navigate = useNavigate();
  const dateToString = (date) => {
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const d = new Date(date);

    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return (
    <Card
      onClick={() => navigate(`/blog/${post.slug}`)}
      sx={{
        position: 'relative', // required for the pseudo-element to position correctly
        // width: 275,
        width: "100%",
        // minWidth: 200,
        minHeight: 330,
        backgroundImage: `url('${post.thumbnail_url}')`,
        backgroundPosition: 'center', // centers the background image
        backgroundSize: 'cover', // ensure the image covers the whole area
        backgroundRepeat: 'no-repeat', // prevent the image from repeating
      }}>
      {/* <img src={post.thumbnail_url} alt={post.title} style={{
        width: "100%",
        height: "auto",
      }}/> */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0))',
        zIndex: 1,
      }}/>

        <Stack spacing={2} sx={{
          position: 'absolute',
          width: "86%",
          height: "70%",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          justifyContent: "flex-end",
          zIndex: 2,
        }}>
          <Typography variant="body1" color="#fff">{dateToString(post.created)} - {post.min_read} min read.</Typography>
          <Typography variant="h3" color="#fff">{post.title}</Typography>
        </Stack>
      {/* </Box> */}
    </Card>
  );
}

export default BlogListItem;
