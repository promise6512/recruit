import { useEffect,useState } from "react";
import {useSelector} from "react-redux"
import {withRouter} from "react-router-dom"
import { reqGetUserList } from "../../api";
import { Card,WingBlank } from "antd-mobile";
import "./userList.css"
function UserList(props) {
  const [userList, setUserList] = useState([]);
  const {type} = useSelector(state => state.user).data;

  useEffect(()=>{
    const getUserList = async () => {
      //type1 = type === "dashen" ? "laoban" : "dashen"
      const result  = await (await reqGetUserList(type === "dashen" ? "laoban" : "dashen")).data
      if(result.code === 0){
        setUserList(result.data)
        //console.log(userList)
      }
    }
    getUserList()
  },[])
  return (
    <WingBlank className="userList-container">
      {
        userList.map(user => {
          return (
            <Card full key={user._id} onClick={()=>props.history.push(`/chat/${user._id}`)}>
              <Card.Header
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                extra={<span>{user.username}</span>}
              />
              <Card.Body>
                {user.post ? <div>职位:{user.post}</div> : null}
                {user.company ? <div>公司:{user.company}</div> : null}
                {user.salary ? <div>月薪:{user.salary}</div> : null}
                {user.info ? <div>描述:{user.info}</div> : null}
              </Card.Body>
            </Card>
          )
        })
      }
    </WingBlank>
  )
}
export default withRouter(UserList)