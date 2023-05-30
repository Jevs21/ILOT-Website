import { A } from "@solidjs/router";
import { Close, Menu } from "@suid/icons-material";
import { Box, Divider, Drawer, IconButton, Stack, Typography } from "@suid/material";
import { createMemo, createSignal, For, lazy, Show } from "solid-js";
import logo from "../../assets/ILOTLogo.png";
import StackRowCentered from "../../elements/StackRowCentered";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";
// import navbar_options from "./navbar_options";
// const logo = lazy(() => import("../../assets/ILOTLogo.png"));
const LogoAppbar = lazy(() => import("../../elements/Logo/LogoAppbar"));
const HomeIcon = lazy(() => import("@suid/icons-material/Home"));
const ExtensionIcon = lazy(() => import("@suid/icons-material/Extension"));
const PaymentIcon = lazy(() => import("@suid/icons-material/Payments"));
const PeopleIcon = lazy(() => import("@suid/icons-material/People"));


const icon_style_light = {
  color: style.palette.white,
  '&:hover': {
    color: style.palette.accent,
  }
}
const icon_style_dark = {
  paddingLeft: 3,
  color: style.palette.black,
  '&:hover': {
    color: style.palette.accent,
  }
}

const navbar_options = [
  { 
    text: "Home",
    icon: () => <HomeIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <HomeIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/",
    flexGrow: 0,
  },{ 
    text: "Features",
    icon: () => <ExtensionIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <ExtensionIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/features",
    flexGrow: 0,
  },{ 
    text: "Pricing",
    icon: () => <PaymentIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <PaymentIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/pricing",
    flexGrow: 0,
  },{ 
    text: "Contact",
    icon: () => <PeopleIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <PeopleIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/contact",
    flexGrow: 1,
  }
];

const AppBarDesktop = (props) => {
  const { navigate } = useGlobalContext();
  const logoStyle = {
    objectFit: 'contain',
    height: '100%',
  }

  return (
    <>
      <LogoAppbar onClick={() => navigate('/')}/>
      <StackRowCentered width="100%" paddingX={2}>
        <For each={navbar_options}>{(item) => (
          <A href={item.href}>
            <StackRowCentered>
              {item.icon()}
              <Typography 
                align="left"
                paddingRight={3} 
                color={style.palette.white}>
                  {item.text.toLocaleUpperCase()}
              </Typography>
            </StackRowCentered>
          </A>
        )}</For>
      </StackRowCentered>
    </>
  );
};

const AppBarMobile = (props) => {
  const { navigate } = useGlobalContext();
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <LogoAppbar onClick={() => navigate('/')}/>
      <IconButton 
        sx={{paddingRight: 2}}
        onClick={() => setIsOpen(!isOpen())}>
          {isOpen() ? <Close fontSize="large" sx={{color: style.palette.white}}/> : <Menu fontSize="large" sx={{color: style.palette.white}}/>}
      </IconButton>
      <AppBarMobileDrawer 
        open={isOpen()} 
        onClose={() => setIsOpen(false)}/>
    </>
  );
}

const AppBarMobileDrawer = (props) => {
  const { navigate } = useGlobalContext();
  const followLink = (href) => {
    navigate(href);
    props.onClose();
  }

  const MobileDrawerOption = (props) => (
    <StackRowCentered 
      paddingY={3}
      onClick={() => followLink(props.item.href)}
      sx={style.treven}>
      {props.item.mobile_icon()}
      <Typography variant="h2" paddingLeft={1} color={props.item.color}>{props.item.text}</Typography>
    </StackRowCentered>
  );

  return (
    <Drawer
      anchor="top"
      {...props}
      sx={{ zIndex: 7888 }}>
      <Stack paddingTop={style.appbar.height}>

        <Divider/>

        <For each={navbar_options}>{(item) =>
          <MobileDrawerOption item={item}/>
        }</For>
      </Stack>
    </Drawer>
  );
}

const AppBar = (props) => {
  const {isMobile} = useGlobalContext();

  return (
    <StackRowCentered position="fixed" zIndex={9999} justifyContent="space-between" sx={{...style.appbar}}>
      <Show 
        when={isMobile()}
        fallback={<AppBarDesktop/>}>
        <AppBarMobile/>
      </Show>
    </StackRowCentered>
  );
};

export default AppBar;