/* 
  注册路由组件
*/
import {useState} from "react"
import { withRouter } from "react-router";
import { NavBar, WingBlank, WhiteSpace, List, InputItem,Radio,Button } from "antd-mobile"
import Logo from "../../componets/logo/logo";
import { useSelector,useDispatch } from 'react-redux';
import {reqRegister} from '../../store/features/userSlice'
//import {reqRegister} from "../../api/index"
function Register(props) {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPswd, setConfirmPswd] = useState('');
  const [type, setType] = useState('dashen')
  const dispatch = useDispatch();
  const register = () => {
    dispatch(reqRegister("zy1",'123','laoban'))  
  }
  const turnToLogin = () => {
    props.history.push("/login")
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
          <InputItem type="password" placeholder="请确认密码" onChange={(value)=>setConfirmPswd(value)}>确认密码:</InputItem>
          <WhiteSpace/>
          <List.Item>
            <span>用户类型:</span>
            &nbsp;&nbsp;&nbsp;
            <Radio checked={type==='dashen'} onChange={()=>setType('dashen')}>大神</Radio>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio checked={type==='laoban'} onChange={()=>setType('laoban')}>老板</Radio>
          </List.Item>
          <WhiteSpace/>
          <Button type="primary" onClick={register}>注&nbsp;&nbsp;&nbsp;册</Button>
          <WhiteSpace/>
          <Button onClick={turnToLogin}>已有账户</Button>
        </List>
      </WingBlank>
    </div>
  )
}
export default withRouter(Register)