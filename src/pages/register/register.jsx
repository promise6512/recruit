/* 
  注册路由组件
*/
import {useState} from "react"
import { Redirect } from "react-router-dom";

import { NavBar, WingBlank, WhiteSpace, List, InputItem,Radio,Button,Toast } from "antd-mobile"
import Logo from "../../componets/logo/logo";
import { useSelector,useDispatch } from 'react-redux';
import {reqRegister,clearErrmsg} from '../../store/features/userSlice';
//import { reqRegister1 } from "../../api";
//import {reqRegister} from "../../api/index"
export default  function Register(props) {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPswd, setConfirmPswd] = useState('');
  const [type, setType] = useState('dashen')
  const dispatch = useDispatch();
  const {redirect,errmsg} = useSelector(state => state.user)
  const register = () => {
    if(!username){
      Toast.fail("用户名不能为空");
    }else if(!password){
      Toast.fail("密码不能为空");
    }else if(password !== confirmPswd){
      Toast.fail("两次输入的密码不一致");
    }else{
     // console.log(type)
      dispatch(reqRegister({username,password,type}))
    }
    
  }
  const turnToLogin = () => {
    props.history.push("/login")
  }
  
  if(errmsg){
    Toast.fail(errmsg);
    dispatch(clearErrmsg())
  }

  if(redirect){
    return <Redirect to={redirect}></Redirect>
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
