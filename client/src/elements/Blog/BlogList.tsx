import { Button, ButtonGroup, Grid, ToggleButton, ToggleButtonGroup } from "@suid/material"
import BlogPostData from "../../models/BlogPostData";
import BlogListItem from "./BlogListItem";
import { createMemo, createSignal, onMount } from "solid-js";

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
  "Strategies to Improve Profit Margins in Car Dealerships",
  "Creating a Successful Online Presence for Your Car Dealership",
  "Key Performance Indicators (KPIs) for Successful Car Dealerships"
];
var exampleContent = `
The landscape of car dealerships is undergoing a radical transformation, thanks to artificial intelligence (AI). In the past, the car buying process involved visiting several dealerships, haggling over prices, and endless paperwork. Today, however, AI is revolutionizing this process, making it more efficient, personalized, and customer-centric.

AI in Customer Service and Sales

AI chatbots are replacing traditional customer service in car dealerships. Unlike human customer service representatives, AI chatbots are available 24/7, providing immediate responses to customer queries. They are equipped with natural language processing (NLP) capabilities, which allow them to understand and respond to customers in a conversational manner.

AI is also being used in the sales process. AI-based recommendation systems analyze customer data to suggest the most suitable cars for each individual, based on their preferences and buying history. This personalized approach improves customer satisfaction and increases sales.

Predictive Maintenance and AI

One of the significant advantages of AI in the car dealership landscape is predictive maintenance. Dealerships can use AI-based predictive analytics to anticipate vehicle issues before they become major problems. This technology relies on machine learning algorithms to analyze data from vehicles and predict potential malfunctions or parts that need replacement. By predicting maintenance needs, dealerships can provide better service to their customers and avoid unexpected vehicle breakdowns.

Inventory Management and AI

Inventory management is a significant challenge for car dealerships. With hundreds or even thousands of vehicles in stock, it can be difficult to keep track of which models are selling well and which are not. AI is solving this problem through data analysis. AI systems can track sales trends, customer preferences, and other factors to optimize inventory and ensure that the dealership always has the right mix of vehicles.

AI in Marketing and Advertising

AI is also proving beneficial in marketing and advertising. With AI, dealerships can create targeted marketing campaigns that are more likely to resonate with potential customers. AI can analyze a customer's past purchases, online behavior, and other data to predict what kind of car they might be interested in and then tailor advertisements to those preferences.

The Future of Car Dealerships and AI

The future of car dealerships lies in the continued integration of AI. As technology continues to advance, we can expect to see even more uses for AI, such as virtual test drives using virtual reality (VR) or augmented reality (AR), AI-powered credit scoring systems, and much more.

In summary, AI is changing the car dealership landscape by improving customer service, enhancing sales processes, predicting maintenance needs, optimizing inventory management, and personalizing marketing efforts. As AI technology becomes even more sophisticated, its role in car dealerships will undoubtedly continue to expand, bringing a new level of efficiency and customer satisfaction to the industry.
`


const BlogList = () => {
  const listN = 8;
  const [pageNum, setPageNum] = createSignal(1);
  const [blogList, setBlogList] = createSignal([]);
  

  // let blogs = []
  // for (let i = 0; i < titles.length; i++) {
  //   const post: BlogPostData = {
  //     id: i,
  //     title: titles[i],
  //     content: exampleContent,
  //     content_snippet: `This is the content of blog post ${i}`,
  //     slug: `blog-post-${i}`,
  //     date: "2021-01-01",
  //     updated: "2021-01-01",
  //     thumbnail_url: "https://via.placeholder.com/150"
  //   };
  //   blogs.push(post)
  // }

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
    return blogList().slice((pageNum() - 1) * listN, pageNum() * listN)
  });

  onMount(async () => {
    await getBlogPostList();
  });

  return (
    <Grid container my={5} spacing={6} justifyContent="space-evenly">
      {curList().map((post) => (
        <Grid container item xs={12} md={6} lg={4} justifyContent="center">
          <BlogListItem post={post} />
        </Grid>
      ))}
      <Grid container item xs={12} py={2} justifyContent='center'>
        <ToggleButtonGroup value={pageNum()} aria-label="outlined primary button group">
          {Array.from(Array(Math.ceil(blogList().length / listN)).keys()).map((i) => (
            <ToggleButton value={i+1} sx={{width: 50}} onClick={() => setPageNum(i+1)}>{i + 1}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default BlogList;
