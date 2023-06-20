
import { For, createEffect, createMemo, createSignal, lazy, onCleanup } from "solid-js";
import IndexLanding from "../elements/IndexSections/IndexLanding";
import IndexFeatures from "../elements/IndexSections/IndexFeatures";
import { Box } from "@suid/material";
import TestSVG from "../assets/TestSVG";
import IndexBlog from "../elements/IndexSections/IndexBlog";
const Contact = lazy(() => import("./Contact"));

const Index = () => {
  const [scrollPosition, setScrollPosition] = createSignal(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    console.log("Scroll pos: ", scrollPosition())
  };

  createEffect(() => {
    window.addEventListener('scroll', handleScroll);
    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });
  
  return (
    <>
      <IndexLanding scrollPos={scrollPosition()}/>
      <IndexFeatures/>
      <IndexBlog/>
      <Contact/>

      
    </>      

  );
};

export default Index;
