import logo from "../../assets/ILOTLogo.png";
import { useGlobalContext } from "../../global/store";

const LogoAppbar = (props) => {
  const {isMobile} = useGlobalContext();
  return (
    <img src={logo} onClick={props.onClick} style={{
      "display": "block",
      // "max-width": '365px', 
      // "max-height": '100%', 
      // "margin-left": "20px",
      'margin-left': (isMobile()) ? "20px" : "65px",
      'margin-right': "20px",
      height: '80%',
      // height: 'auto',
    }}/>
  );
}

export default LogoAppbar;