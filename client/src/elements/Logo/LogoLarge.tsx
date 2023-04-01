import logo from "../../assets/ILOTLogo.png";

const LogoLarge = () => {
  return (
    <img src={logo} style={{
      "display": "block",
      // "max-width": '365px', 
      // "max-height": '100%', 
      "margin-left": "auto",
      "margin-right": "auto",
      width: '60%',
      // height: 'auto',
      "border-radius": "38px",
      "-webkit-box-shadow": "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      "box-shadow": "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
      }}/>
  );
}

export default LogoLarge;