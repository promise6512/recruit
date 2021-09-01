/* 
  登录路由组件
*/
import {useState} from "react"
import { withRouter } from "react-router";
import { NavBar, WingBlank, WhiteSpace, List, InputItem,Button,Toast  } from "antd-mobile"
import Logo from "../../componets/logo/logo";
import {useDispatch,useSelector} from "react-redux";
import { reqLogin,clearErrmsg } from "../../store/features/userSlice";
import {Redirect} from "react-router-dom"
function Login(props) {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const {redirect,errmsg} = useSelector(state => state.user)
  const login = () => {
    if(!username){
      Toast.fail("用户名不能为空")
    }else if(!password){
      Toast.fail("密码不能为空")
    }else{
      dispatch(reqLogin({username,password}))
    }
  }
  if(redirect){
    return <Redirect to={redirect}></Redirect>
  }
  const turnToRegister = () => {
    props.history.push("/register")
  }
  
  if(errmsg){
    Toast.fail(errmsg)
    dispatch(clearErrmsg())
  }

  

  return (
    <div>
      <NavBar>ZJU&nbsp;直&nbsp;聘</NavBar>
      <Logo></Logo>
      <WingBlank>
        <List>
          <WhiteSpace/>
          <InputItem placeholder="请输入用户名" onChange={(value)=>setUsername(value)}>用户名:</InputItem>
          <WhiteSpace />
          <InputItem type="password" placeholder="请输入密码" onChange={(value)=>setPassword(value)}>密码:</InputItem>
          <WhiteSpace/>
          <Button type="primary" onClick={login}>登&nbsp;&nbsp;&nbsp;陆</Button>
          <WhiteSpace/>
          <Button onClick={turnToRegister}>还没有账户</Button>
        </List>
      </WingBlank>
    </div>
  )
}
export default withRouter(Login)