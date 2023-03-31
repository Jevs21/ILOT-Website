import { A } from "@solidjs/router";
import { Close, Menu } from "@suid/icons-material";
import { Box, Divider, Drawer, IconButton, Stack, Typography } from "@suid/material";
import { createMemo, createSignal, For, lazy, Show } from "solid-js";
import logo from "../../assets/ILOTLogo.png";
import StackRowCentered from "../../elements/StackRowCentered";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";
import navbar_options from "./navbar_options";
// const logo = lazy(() => import("../../assets/ILOTLogo.png"));


const AppBarDesktop = (props) => {
  const { navigate } = useGlobalContext();
  const logoStyle = {
    objectFit: 'contain',
    height: '100%',
  }

  return (
    <>
      <Box 
        width={style.sidebar.width} 
        paddingY={1.5} 
        justifyContent='center' 
        sx={{display: 'flex'}}>
          <A href="/">
            <img src={logo} style={logoStyle}/> 
          </A>
      </Box>
    </>
  );
};

const AppBarMobile = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      {/* <Box paddingLeft={2} paddingY={1} sx={{display: 'flex'}}>
        <img src={logo} /> 
      </Box> */}
      <AppBarDesktop/>
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
      {props.item.icon()}
      <Typography variant="h2" paddingLeft={1} color={props.item.color}>{props.item.text}</Typography>
    </StackRowCentered>
  );

  return (
    <Drawer
      anchor="top"
      {...props}
      sx={{ zIndex: 8888 }}>
      <Stack paddingTop={style.appbar.height}>

        <Divider/>

        <For each={navbar_options.top}>{(item) =>
          <MobileDrawerOption item={item}/>
        }</For>

        <For each={navbar_options.bottom}>{(item) =>
          <MobileDrawerOption item={item}/>
        }</For>
      </Stack>
    </Drawer>
  );
}

const AppBar = (props) => {
  const {isMobile} = useGlobalContext();

  return (
    <Box sx={{...style.appbar, ...{width: '100%'}}}>
      <Show 
        when={isMobile()}
        fallback={<AppBarDesktop/>}>
        <AppBarMobile/>
      </Show>
    </Box>
  );
};

export default AppBar;