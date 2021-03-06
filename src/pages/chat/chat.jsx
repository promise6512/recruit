import { NavBar, List, InputItem, Icon, Grid } from "antd-mobile"
//import header from "../../assets/header-images/ๅคดๅ1.png"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "./chat.css"
import { sendMsg, reqReadMsg } from "../../store/features/chatSlice";

const emojisList = ['๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐'
  , '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ'
  , '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ'
  , '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ', '๐', '๐', '๐คฃ']
const emojis = emojisList.map(emoji => ({ text: emoji }))
export default function Chat() {
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'auto'
    })
  })

  useEffect(() => {
    return () => {
      dispatch(reqReadMsg({ from: params.userId }))
    }
  }, [])

  const [content, setContent] = useState('');//ๅจๅญ่ๅคฉๅบๅฅๆก็ๅๅฎน
  const [isShowEmojiList, setIsShowEmojiList] = useState(false); //ๆฏๅฆๆพ็คบๆ ็ญพ็ฝๆ ผ
  const history = useHistory()
  //่ทๅๅฝๅ่ทฏๅพๅๆฐ
  const params = useParams()
  const dispatch = useDispatch();
  const user = useSelector(state => state.user).data;
  const { users, chatMsgs } = useSelector(state => state.chat);

  //ๅๅบๅฝๅ็ปๅฝ็จๆท็id
  const { _id } = user;
  //่ฎก็ฎๅฝๅ่ๅคฉ็chat_id
  const myId = _id;  //ๆ็id
  const targetId = params.userId; //ๅฏนๆนid

  const chat_id = [myId, targetId].sort().join('_');

  //ๅฏนchatMsgs่ฟ่ก่ฟๆปค,่ทๅๅฝๅ็จๆทไธๅฏนๆน็่ๅคฉ่ฎฐๅฝ
  const msgs = chatMsgs.filter(msg => msg.chat_id === chat_id)
  //console.log(msgs)

  //่ทๅ่ๅคฉๅฏน่ฑก็็จๆทๅ
  //console.log(targetId,users,user)
  const { username } = users[targetId];

  const handleSend = () => {
    //fromไธบๅฝๅ็จๆทid
    const from = _id;
    //่ทฏๅพๅๆฐ็ไธญ็userIdไธบๆถๆฏ็ๆฅๆถๆน
    const to = params.userId;
    if (content) {
      //console.log(to, from, content)
      sendMsg({ from, to, content })
      setContent('')
    }
  }

  const showEmojiList = () => {
    setIsShowEmojiList(isShow => {
      //ๅฝๆพ็คบไบ่กจๆๆ ๆฏ่ฐๆด่ๅคฉ็้ขๅบ้จmargin,้ฒๆญข่กจๆๆ ้ฎๆก่ๅคฉ็้ข
      if (isShow) {
        document.getElementById("list").style.marginBottom = "50px"
      } else {
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
            //ๅฏนๆนๅ็ๆถๆฏ
            if (msg.from === targetId) {
              return <List.Item thumb={require("../../assets/header-images/ๅคดๅ1.png").default} key={msg._id}>{msg.content}</List.Item>
            } else {
              //ๆๅๅ็ๆถๆฏ
              return <List.Item extra="ๆ" key={msg._id}>{msg.content}</List.Item>
            }
          })
        }
      </List>
      <div className='input-bar'>
        <InputItem
          placeholder=" ่ฏท่พๅฅ"
          onChange={(value) => setContent(value)}
          value={content}  //ๅๆญฅ่ๅคฉ่พๅฅๆกๅๅฎนๅcontent็ถๆ
          extra={
            <span>
              <span onClick={showEmojiList}>๐ </span>
              <span onClick={handleSend}>ๅ้</span>
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