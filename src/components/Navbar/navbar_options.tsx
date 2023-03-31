import { AccountCircle, Dashboard, Insights, Logout, TableChart } from "@suid/icons-material";
import style from "../../global/style";

const icon_style_light = {
  paddingLeft: 2,
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

const navbar_options = {
  top: [
    { 
      text: "Dashboard",
      icon: () => <Dashboard class="sidebar_item_text" sx={icon_style_dark}/>,
      color: style.palette.black,
      side_icon: () => <Dashboard class="sidebar_item_text" sx={icon_style_light}/>,
      side_color: style.palette.white,
      href: "/",
      flexGrow: 0,
    },{ 
      text: "Inventory",
      icon: () => <TableChart class="sidebar_item_text" sx={icon_style_dark}/>,
      color: style.palette.black,
      side_icon: () => <TableChart class="sidebar_item_text" sx={icon_style_light}/>,
      side_color: "#F7F7F7",
      href: "/inventory",
      flexGrow: 0,
    },{ 
      text: "Analytics",
      icon: () => <Insights class="sidebar_item_text" sx={icon_style_dark}/>,
      color: style.palette.black,
      side_icon: () => <Insights class="sidebar_item_text" sx={icon_style_light}/>,
      side_color: style.palette.white,
      href: "/analytics",
      flexGrow: 1,
    }
  ],
  bottom: [
    { 
      text: "My Account",
      icon: () => <AccountCircle class="sidebar_item_text" sx={icon_style_dark}/>,
      color: style.palette.black,
      side_icon: () => <AccountCircle class="sidebar_item_text" sx={icon_style_light}/>,
      side_color: style.palette.white,
      href: "/account",
      flexGrow: 0,
    },{ 
      text: "Logout",
      icon: () => <Logout class="sidebar_item_text" sx={icon_style_dark}/>,
      color: style.palette.primary,
      side_icon: () => <Logout class="sidebar_item_text" sx={{...icon_style_light, ...{color: style.palette.primary}}}/>,
      side_color: style.palette.primary,
      href: "/logout",
      flexGrow: 0,
    },
  ]
}

export default navbar_options;