import { NavBar, List, InputItem, Icon, Grid } from "antd-mobile"
//import header from "../../assets/header-images/头像1.png"
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "./chat.css"
import { sendMsg,reqReadMsg } from "../../store/features/chatSlice";

const emojisList = ['😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀'
  , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
  , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
  , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣']
const emojis = emojisList.map(emoji => ({ text: emoji }))
export default function Chat() {
  useEffect(()=>{
    window.scrollTo({
      top:document.body.scrollHeight,
      behavior:'auto'
    })
  })
  
  useEffect(()=>{
    return () => {
      dispatch(reqReadMsg({from:params.userId}))
    }
  },[])

  const [content, setContent] = useState('');//储存聊天出入框的内容
  const [isShowEmojiList, setIsShowEmojiList] = useState(false); //是否显示标签网格
  const history = useHistory()
  //获取当前路径参数
  const params = useParams()
  const dispatch = useDispatch();
  const user = useSelector(state => state.user).data;
  const { users, chatMsgs } = useSelector(state => state.chat);

  //取出当前登录用户的id
  const { _id } = user;
  //计算当前聊天的chat_id
  const myId = _id;  //我的id
  const targetId = params.userId; //对方id
  
  const chat_id = [myId, targetId].sort().join('_');

  //对chatMsgs进行过滤,获取当前用户与对方的聊天记录
  const msgs = chatMsgs.filter(msg => msg.chat_id === chat_id)
  //console.log(msgs)

  //获取聊天对象的用户名
  //console.log(targetId,users,user)
  const { username } = users[targetId];

  const handleSend = () => {
    //from为当前用户id
    const from = _id;
    //路径参数的中的userId为消息的接收方
    const to = params.userId;
    if (content) {
      //console.log(to, from, content)
      sendMsg({ from, to, content })
      setContent('')
    }
  }

  const showEmojiList = () => {
    setIsShowEmojiList(isShow => {
      //当显示了表情栏是调整聊天界面底部margin,防止表情栏遮挡聊天界面
      if(isShow){
        document.getElementById("list").style.marginBottom = "50px"
      }else{
        document.getElementById("list").style.marginBottom = "325.5px"
      }
      return !isShow
    });
  }

  return (
    <div>
      <NavBar
        className="navBar"
        icon={<Icon type="left" onClick={history.goBack} />}
      >
        {username}
      </NavBar>
      <List className="list" id="list">
        {
          msgs.map((msg, index) => {
            //对方发的消息
            if (msg.from === targetId) {
              return <List.Item thumb={require("../../assets/header-images/头像1.png").default} key={msg._id}>{msg.content}</List.Item>
            } else {
              //我发发的消息
              return <List.Item extra="我" key={msg._id}>{msg.content}</List.Item>
            }
          })
        }
      </List>
      <div className='input-bar'>
        <InputItem
          placeholder=" 请输入"
          onChange={(value) => setContent(value)}
          value={content}  //同步聊天输入框内容和content状态
          extra={
            <span>
              <span onClick={showEmojiList}>😀 </span>
              <span onClick={handleSend}>发送</span>
            </span>
          }
        />
        {
          isShowEmojiList ?
            <Grid
              data={emojis}
              columnNum={8}
              onClick={(obj) => {
                //console.log(obj)
                setContent(content => content + obj.text);
              }}
            />
            : null
        }
      </div>
    </div>
  )
}