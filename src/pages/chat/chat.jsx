import { NavBar, List, InputItem, Icon } from "antd-mobile"
import header from "../../assets/header-images/头像1.png"
import { useState } from "react";
import {useSelector} from "react-redux"
import { useHistory,useParams } from "react-router-dom";
import "./chat.css"
import { sendMsg } from "../../store/features/chatSlice";

export default function Chat() {
  const [content, setContent] = useState('');//储存聊天出入框的内容
  const history = useHistory()
  //获取当前路径参数
  const params = useParams()
  const user = useSelector(state => state.user).data;
  const {users,chatMsgs} = useSelector(state => state.chat);
  const {_id} = user;

  //计算当前聊天的chat_id
  const myId = _id;  //我的id
  const targetId = params.userId; //对方id
  const chat_id = [myId,targetId].sort().join('_');

  //对chatMsgs进行过滤,获取当前用户与对方的聊天记录
  const msgs = chatMsgs.filter(msg => msg.chat_id === chat_id)
  //console.log(msgs)
  
  //获取聊天对象的用户名
  const {username} = users[targetId];

  const handleSend = () => {
    //from为当前用户id
    const from = _id;
    //路径参数的中的userId为消息的接收方
    const to = params.userId;
    if(content){
      //console.log(to,from,content)
      sendMsg({from,to,content})
      setContent('')
    }
  }
  return (
    <div>
      <NavBar
        className="navBar"
        icon={<Icon type="left" onClick={history.goBack}/>}
      >
        {username}
      </NavBar>
      <List className="list">
        {
          msgs.map(msg => {
            //对方发的消息
            if(msg.from === targetId){
              return <List.Item thumb={header} key={msg._id}>{msg.content}</List.Item>
            }else{
            //我发发的消息
              return <List.Item extra="我" key={msg._id}>{msg.content}</List.Item>
            }
          })
        }
      </List>
      <div className='input-bar'>
        <InputItem
          placeholder=" 请输入"
          onChange={(value)=>setContent(value)}
          value={content}  //同步聊天输入框内容和content状态
          extra={
            <span onClick={handleSend}>发送</span>
          }
        />
      </div>
    </div>
  )
}