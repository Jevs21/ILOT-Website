import logo from "../../assets/ILOTLogo.png";
import { useGlobalContext } from "../../global/store";

const LogoAppbar = (props) => {
  const {isMobile} = useGlobalContext();
  return (
    <img src={logo} onClick={props.onClick} style={{
      "display": "block",
      "width": '120px',
      "height": 'auto', 
      'margin-left': "0px",
      'margin-right': "20px",
      // height: '80%',
      // height: 'auto',
    }}/>
  );
}

export default LogoAppbar;