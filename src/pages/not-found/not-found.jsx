import { Button } from "antd-mobile"
export default function NotFound(props){
  return(
    <div>
      <h2>抱歉找不到页面！</h2>
      <Button 
        type="primary"
        onClick={()=>props.history.replace("/")}
      >
        回到首页
      </Button>
    </div>
  )
}