import { useLocation } from "@solidjs/router";
import { Breadcrumbs, Typography } from "@suid/material";
import { createMemo, Show } from "solid-js";
import navbar_options from "../components/Navbar/navbar_options";
import { useGlobalContext } from "../global/store";

const BreadcrumbsEl = (props) => {
  const {navigate, prevRoute} = useGlobalContext();
  const location = useLocation();
  // onMount(() => console.log(prevRoute()))
  
  const showBreadCrumbs = createMemo(() => location.pathname.includes('/vehicle'));
  const prevRouteName = createMemo(() => {
    if (showBreadCrumbs()) {
      const p = navbar_options.top.find((item) => item.href === prevRoute());
      if (p) return p.text.toLocaleUpperCase();
    }
    return 'DASHBOARD';
  });

  return (
    <Show when={showBreadCrumbs()} fallback={<></>}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography onClick={() => navigate(prevRoute())}>{prevRouteName()}</Typography>
        <Typography>VEHICLE</Typography>
      </Breadcrumbs>
    </Show>
  );
}

export default BreadcrumbsEl;