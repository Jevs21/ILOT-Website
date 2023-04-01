import { ThemeProvider } from "@suid/material";
import { mainTheme } from "./themes/theme";
import "./style/App.module.css"

import {Routes, Route } from '@solidjs/router';

import { createEffect, lazy, onMount } from "solid-js";
import { useGlobalContext } from "./global/store";

const ViewContainer = lazy(() => import("./views/ViewContainer"));

const Index = lazy(() => import("./views/Index"));
const Features = lazy(() => import("./views/Features"));
const NotFound = lazy(() => import("./views/NotFound"));

export default function App() {
  const { loadLocalStorage, setIsMobile } = useGlobalContext();

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
    loadLocalStorage();
    PageResize();
  })

  return (
    <ThemeProvider theme={mainTheme}>
      <div class="App">
        <ViewContainer>
          <Routes>
            <Route path='/' component={Index} />
            <Route path='/features' component={Features} />
            <Route path='/*' component={NotFound} />
          </Routes>
        </ViewContainer>
      </div>
    </ThemeProvider>
  );
}
