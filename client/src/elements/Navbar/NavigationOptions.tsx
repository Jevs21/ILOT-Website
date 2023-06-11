import { lazy } from "solid-js";
import style from "../../global/style";

const HomeIcon = lazy(() => import("@suid/icons-material/Home"));
const ExtensionIcon = lazy(() => import("@suid/icons-material/Extension"));
const PaymentIcon = lazy(() => import("@suid/icons-material/Payments"));
const BlogIcon = lazy(() => import("@suid/icons-material/LibraryBooks"));
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

const NavigationOptions = [
  { 
    text: "Home",
    icon: () => <HomeIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <HomeIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/",
    bg_img: "",
    flexGrow: 0,
  },{ 
    text: "Features",
    icon: () => <ExtensionIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <ExtensionIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/features",
    bg_img: "lotarial.jpeg",
    flexGrow: 0,
  },
  // { 
  //   text: "Pricing",
  //   icon: () => <PaymentIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
  //   mobile_icon: () => <PaymentIcon class="sidebar_item_text" sx={icon_style_dark}/>,
  //   color: style.palette.black,
  //   href: "/pricing",
  //   flexGrow: 0,
  // },
  { 
    text: "Blog",
    icon: () => <BlogIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <BlogIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/blog",
    bg_img: "carlotarial_lg.jpeg",
    flexGrow: 0,
  },{ 
    text: "Contact",
    icon: () => <PeopleIcon fontSize="small" class="sidebar_item_text" sx={icon_style_light}/>,
    mobile_icon: () => <PeopleIcon class="sidebar_item_text" sx={icon_style_dark}/>,
    color: style.palette.black,
    href: "/contact",
    bg_img: "deal.jpeg",
    flexGrow: 1,
  }
];

export default NavigationOptions;