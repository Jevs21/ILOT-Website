import logo from "../../assets/ILOTLogo.png";

const LogoAppbar = (props) => {
  return (
    <img src={logo} onClick={props.onClick} style={{
      "display": "block",
      // "max-width": '365px', 
      // "max-height": '100%', 
      "margin-left": "20px",
      height: '80%',
      // height: 'auto',
    }}/>
  );
}

export default LogoAppbar;