import logo from "./images/logo.png"
import "./logo.less"
export default function(){
  return(
    <div className="logo-container">
      <img src={logo} alt="logo" className="logo-img" />
    </div>
  )
}