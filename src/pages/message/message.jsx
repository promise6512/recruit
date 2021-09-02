import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { List, Badge } from 'antd-mobile';
import "./message.css"

/* 
  对chat_id进行分组,得到每个组的lastMsg组成的数组
*/
const classifyChatMsg = (chatMsgs) => {
  //创建一个对象,对象结构为{chat_id:lastMsg}
  let lastMsgObj = {};
  for (let msg of chatMsgs) {
    lastMsgObj[msg.chat_id] = msg;
  }
  //创建数组,保存所有【最后一条消息】
  let lastMsgArr = [];
  for (let chat_id in lastMsgObj) {

    //遍历对象,取出所有值
    lastMsgArr.push(lastMsgObj[chat_id]);
  }
  return lastMsgArr;
}

//获取来自不同人的未读消息数
const getUnReadCount = (chatMsgs) => {
  let unReadCount = {};
  for (let msg of chatMsgs) {
    //如果消息未读
    if (!msg.read) {
      // console.log(unReadCount[msg.chat_id] ? 0 : unReadCount[msg.chat_id])
      unReadCount[msg.chat_id] = (unReadCount[msg.chat_id] ? unReadCount[msg.chat_id] : 0) + 1
    }
  }
  return unReadCount;
}

export default function Message() {
  const user = useSelector(state => state.user).data;
  const { users, chatMsgs } = useSelector(state => state.chat);
  //取出当前用户id
  const { _id } = user;
  const lastMsgArr = classifyChatMsg(chatMsgs);
  const unReadCount = getUnReadCount(chatMsgs);
  // console.log(unReadCount)

  const history = useHistory()
  //点击后跳转到与对应用户的聊天界面
  const turnToChat = (targetId) => {
    history.push(`/chat/${targetId}`)
  }

  return (
    <div className="message-container">
      <List className="list">
        {
          lastMsgArr.map(lastMsg => {
            {/* 如果消息为我方发送,通过lastMsg.to查找对方username, 如果消息为对方发送,则通过lastMsg.to查找对方username*/ }
            let targetId;
            if (lastMsg.from === _id) {
              targetId = lastMsg.to;
            } else {
              targetId = lastMsg.from;
            }
            return (
              <List.Item
                extra={<Badge text={unReadCount[lastMsg.chat_id]} />}
                thumb={require("../../assets/header-images/头像1.png").default}
                arrow='horizontal'
                key={lastMsg._id}
                onClick={() => turnToChat(targetId)}
              >
                {lastMsg.content}
                <List.Item.Brief>{users[targetId].username}</List.Item.Brief>
              </List.Item>
            )
          })
        }
      </List>
    </div>
  )
}