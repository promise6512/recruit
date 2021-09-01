/* 
  完善大神信息
*/
import { useState } from "react";
import { NavBar,InputItem,TextareaItem,Button } from "antd-mobile"
import HeaderSelector from "../../componets/header-selector/header-selector"
import { Redirect } from "react-router-dom";
import { reqUpdateUser } from "../../store/features/userSlice";
import {useDispatch,useSelector} from "react-redux"
export default function DashenInfo(){
  const [header, setHeader] = useState();
  const [info, setInfo] = useState('');
  const [post, setPost] = useState('');
  const dispatch = useDispatch()
  const {redirect} = useSelector(state => state.user)

  const getAvator = (avator) => {
    setHeader(avator)
  }

  const saveInfo = () => {
    dispatch(reqUpdateUser({header,info,post}))
  }
  
  if(redirect === '/dashen'){
    return <Redirect to={redirect}></Redirect>
  }

  return (
    <div>
      <NavBar>大神信息完善</NavBar>
      <HeaderSelector getAvator={getAvator}></HeaderSelector>
      <InputItem onChange={val => setPost(val)}>求职岗位:</InputItem>
      <TextareaItem
        title="个人介绍:" 
        rows={3}
        onChange={val => setInfo(val)}
      />
      <Button type='primary' onClick={saveInfo}>保存&nbsp;&nbsp;</Button>
    </div>
  )
}