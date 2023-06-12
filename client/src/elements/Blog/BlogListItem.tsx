import { Box, Card, Stack, Typography } from "@suid/material";
import BlogPostData from "../../models/BlogPostData";
import { useNavigate } from "@solidjs/router";

const BlogListItem = (props) => {
  const post: any = props.post;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/blog/${post.slug}`)}
      sx={{
        position: 'relative', // required for the pseudo-element to position correctly
        width: 275,
        // minWidth: 200,
        minHeight: 200,
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // black with 50% transparency
        zIndex: 1,
      }}/>

        <Stack sx={{
          position: 'absolute',
          width: "86%",
          height: "70%",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          justifyContent: "space-between",
          zIndex: 2,
        }}>
          <Typography variant="h3" color="#fff">{post.title}</Typography>
          <Typography variant="body1" color="#fff">{post.created}</Typography>
        </Stack>
      {/* </Box> */}
    </Card>
  );
}

export default BlogListItem;
