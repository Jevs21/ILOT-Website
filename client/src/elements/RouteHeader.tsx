import { Grid, Typography } from "@suid/material";
import StackRowCentered from "./StackRowCentered";
import style from "../global/style";
import { useGlobalContext } from "../global/store";
import { Show, createEffect, createMemo, createSignal, lazy } from "solid-js";
import { useLocation } from "@solidjs/router";
import NavigationOptions from "./Navbar/NavigationOptions";
const PaymentIcon = lazy(() => import("@suid/icons-material/Payments"));

// const BGImg = lazy(() => import("../assets/carlotarial_lg.jpeg"));

const RouteHeader = (props) => {
  const { isMobile } = useGlobalContext();
  const [path, setPath] = createSignal("/");
  const [name, setName] = createSignal("Home");
  const [icon, setIcon] = createSignal(() => PaymentIcon);
  createEffect(() => { 
    const location = useLocation();
    setPath(location.pathname);
    console.log(`path: ${path()}`)
  });

  const cur = createMemo(() => {
    const base = path().split("/")[1];
    const cur = NavigationOptions.find((item) => item.href.includes(base));
    if (cur) {
      return {
        path: cur.href,
        name: cur.text,
        icon: cur.icon,
        bgImg: cur.bg_img,
      }
    }
    return {
      path: "/",
      name: "Home",
      icon: PaymentIcon,
      bgImg: "",
    }
  });

  return (
    <Show when={cur().path !== "/"}>
      <Grid item container xs={12}  backgroundColor={style.palette.white}>
        <Grid item container xs={12}>
          <StackRowCentered height={"30vh"} sx={{
            backgroundImage: `url('../assets/${cur().bgImg}')`,
            backgroundPosition: 'center', // centers the background image
            backgroundSize: 'cover', // ensure the image covers the whole area
            backgroundRepeat: 'no-repeat', // prevent the image from repeating
            position: 'relative', // required for the pseudo-element to position correctly
            '::before': { // the pseudo-element for the overlay
              content: `""`,
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // black with 50% transparency
              zIndex: 1,
            },
            '::after': { // the pseudo-element for the centered text
              content: `"${cur().name}"`,
              color: '#fff',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              
            },
          }}>
              <Typography zIndex={10} variant="h1" 
                align="center"
                color={"#FFFFFF"}
                fontSize={(isMobile()) ? "3em" : "4.3em"} 
                lineHeight={1.3}>
              </Typography>
          </StackRowCentered>
        </Grid>
      </Grid>
    </Show>
  );
}

export default RouteHeader;