/* 
  老板信息完善
*/
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { NavBar,InputItem,TextareaItem,Button } from "antd-mobile"
import HeaderSelector from "../../componets/header-selector/header-selector";
import { reqUpdateUser,clear } from "../../store/features/userSlice";
import {useDispatch,useSelector} from "react-redux"
export default function LaobanInfo(){
  const [header, setHeader] = useState('');
  const [post, setPost] = useState('');
  const [jobReq, setjobReq] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const dispatch = useDispatch()
  const {redirect} = useSelector(state => state.user)

  const getAvator = (avator) => {
    setHeader(avator)
  }

  const saveInfo = () => {
    dispatch(reqUpdateUser({header,post,jobReq,company,salary}))
  }

  if(redirect === "/laoban"){
    return <Redirect to={redirect}></Redirect>
  }

  return(
    <div>
      <NavBar>老板信息完善</NavBar>
      <HeaderSelector getAvator={getAvator}></HeaderSelector>
      <InputItem onChange={val => setPost(val)}>招聘职位:</InputItem>
      <InputItem onChange={val => setCompany(val)}>公司名称:</InputItem>
      <InputItem onChange={val => setSalary(val)}>职业薪资:</InputItem>
      <TextareaItem
        title="职位要求:" 
        rows={3}
        onChange={val => setjobReq(val)}
      />
      <Button type='primary' onClick={saveInfo}>保存&nbsp;&nbsp;</Button>
    </div>
  )

}