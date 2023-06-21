import { A } from "@solidjs/router";
import { Close, Menu } from "@suid/icons-material";
import { Box, Divider, Drawer, Grid, IconButton, Stack, Typography } from "@suid/material";
import { createMemo, createSignal, For, lazy, Show } from "solid-js";
import logo from "../../assets/ILOTLogo.png";
import StackRowCentered from "../../elements/StackRowCentered";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";
// import NavigationOptions from "./NavigationOptions";
// const logo = lazy(() => import("../../assets/ILOTLogo.png"));
import NavigationOptions from "./NavigationOptions";
import IndexSectionContainer from "../IndexSections/IndexSectionContainer";
import CustomButton from "./CustomButton";

const LogoAppbar = lazy(() => import("../../elements/Logo/LogoAppbar"));

const AppBarDesktop = (props) => {
  const { navigate } = useGlobalContext();

  return (
    <IndexSectionContainer>
      <StackRowCentered justifyContent="space-between">
          <StackRowCentered>
            <LogoAppbar onClick={() => navigate('/')}/>

            <For each={NavigationOptions}>{(item) => (
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
          
          <CustomButton text="Request a Demo" type="red"/>
        </StackRowCentered>
    </IndexSectionContainer>
  )
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

        <For each={NavigationOptions}>{(item) =>
          <MobileDrawerOption item={item}/>
        }</For>
      </Stack>
    </Drawer>
  );
}

const AppBar = (props) => {
  const {isMobile} = useGlobalContext();

  return (
    <StackRowCentered 
      position="fixed" 
      zIndex={9999} 
      px={isMobile() ? 2 : 0}
      justifyContent="space-between" 
      sx={{...style.appbar}}>
      <Show 
        when={isMobile()}
        fallback={<AppBarDesktop/>}>
        <AppBarMobile/>
      </Show>
    </StackRowCentered>
  );
  
};

export default AppBar;