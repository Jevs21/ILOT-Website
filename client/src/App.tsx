import { ThemeProvider, Typography } from "@suid/material";
import { mainTheme } from "./themes/theme";
import "./style/App.module.css"

import { Routes, Route } from '@solidjs/router';

import { For, createEffect, createSignal, lazy, onMount } from "solid-js";
import ViewContainer from "./views/ViewContainer";
import { useGlobalContext } from "./global/store";
// import { useGlobalContext } from "./global/store";
// import ViewContainer from "./views/ViewContainer";
// import { useGlobalContext } from "./global/store";

// const ViewContainer = lazy(() => import("./views/ViewContainer"));
const Index = lazy(() => import("./views/Index"));
const Features = lazy(() => import("./views/Features"));
// const Pricing = lazy(() => import("./views/Pricing"));
const Blog = lazy(() => import("./views/Blog"));
const BlogPost = lazy(() => import("./views/BlogPost"));
const Contact = lazy(() => import("./views/Contact"));
const NotFound = lazy(() => import("./views/NotFound"));

export default function App() {
  const { setIsMobile } = useGlobalContext();

  // onMount(() => loadLocalStorage());
  const PageResize = () => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900); // Set isMobile to true if screen width is less than 768px
    };
    window.addEventListener('resize', handleResize); // Add event listener for window resize
    handleResize(); // Call handleResize function on component mount to set initial value of isMobile
    return () => {
      window.removeEventListener('resize', handleResize); // Remove event listener on component unmount
    };
  }

  createEffect(() => PageResize());

  onMount(() => {
    // loadLocalStorage();
    console.log("Mounted")
    PageResize();
  });
  
  return (
    <ThemeProvider theme={mainTheme}>
      <ViewContainer>
        <Routes>
          <Route path="/" component={Index} />
          <Route path='/features' component={Features} />
          {/* <Route path='/pricing' component={Pricing} /> */}
          <Route path='/blog' component={Blog} />
          <Route path='/blog/:slug' component={BlogPost} />
          <Route path='/contact' component={Contact} />
          <Route path='/*' component={NotFound} />
        </Routes>
      </ViewContainer>
    </ThemeProvider>
  );
}
