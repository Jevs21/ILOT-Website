
import { For, createEffect, createMemo, createSignal, lazy, onCleanup } from "solid-js";
import IndexLanding from "../elements/IndexSections/IndexLanding";
import IndexFeatures from "../elements/IndexSections/IndexFeatures";
import { Box } from "@suid/material";
import TestSVG from "../assets/TestSVG";
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
      <For each={[1,2,3,4,5,6,7,8,9,10]}>{(item) => (
        <Box height={200} width={"100%"} sx={{backgroundColor: '#E2E2E2'}}>{item}</Box>
      )}</For>
      <Contact/>

      
    </>      

  );
};

export default Index;
