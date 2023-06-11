import { Button, ButtonGroup, Grid, ToggleButton, ToggleButtonGroup } from "@suid/material"
import BlogPostData from "../../models/BlogPostData";
import BlogListItem from "./BlogListItem";
import { createMemo, createSignal } from "solid-js";

var titles = [
  "The Future of Car Dealerships: Trends and Predictions",
  "Exploring the Benefits of Digital Transformation in Car Dealerships",
  "Effective Inventory Management Strategies for Modern Car Dealerships",
  "Understanding the Role of Data Analytics in Car Dealerships",
  "Increasing Sales Performance: Proven Strategies for Car Dealerships",
  "Essential Tools for Modern Car Dealership Management",
  "Improving Customer Experience: A Priority for Successful Car Dealerships",
  "Sustainable Practices: Going Green in the Car Dealership Industry",
  "The Art of Negotiation: Skills Every Car Dealer Should Master",
  "Modern Marketing Techniques for Car Dealerships",
  "The Power of Social Media in Car Sales: A Guide for Dealerships",
  "Building Trust: How Transparency Improves Car Dealership Reputation",
  "Leveraging CRM Systems for Improved Customer Relationship in Car Dealerships",
  "The Impact of E-commerce on the Car Dealership Industry",
  "Dealing with Disruptions: How Car Dealerships Can Thrive Amid Change",
  "Adapting to Electric Cars: Opportunities and Challenges for Dealerships",
  "How AI is Changing the Car Dealership Landscape",
  "Strategies to Improve Profit Margins in Car Dealerships",
  "Creating a Successful Online Presence for Your Car Dealership",
  "Key Performance Indicators (KPIs) for Successful Car Dealerships"
];


const BlogList = () => {
  const listN = 8;
  const [pageNum, setPageNum] = createSignal(1);

  let blogs = []
  for (let i = 0; i < titles.length; i++) {
    const post: BlogPostData = {
      id: i,
      title: titles[i],
      content: `This is the content of blog post ${i}`,
      content_snippet: `This is the content of blog post ${i}`,
      slug: `blog-post-${i}`,
      date: "2021-01-01",
      updated: "2021-01-01",
      thumbnail_url: "https://via.placeholder.com/150"
    };
    blogs.push(post)
  }

  const curList = createMemo(() => {
    return blogs.slice((pageNum() - 1) * listN, pageNum() * listN)
  })

  return (
    <Grid container my={5} spacing={6} justifyContent="space-around">
      {curList().map((post) => (
        <Grid item xs={12} md={6} lg={4}>
          <BlogListItem post={post} />
        </Grid>
      ))}
      <Grid container item xs={12} py={2} justifyContent='center'>
        <ToggleButtonGroup value={pageNum()} aria-label="outlined primary button group">
          {Array.from(Array(Math.ceil(blogs.length / listN)).keys()).map((i) => (
            <ToggleButton value={i+1} sx={{width: 50}} onClick={() => setPageNum(i+1)}>{i + 1}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default BlogList;
