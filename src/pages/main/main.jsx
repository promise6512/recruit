/* 
  主路由组件
*/
import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { reqAutoLogin } from "../../store/features/userSlice";
import { reqGetMsgList} from "../../store/features/chatSlice";
import LaobanInfo from "../laoban-info/laoban-info";
import DashenInfo from "../dashen-info/dashen-info";
import NotFound from "../not-found/not-found";
import Laoban from "../laoban/laoban";
import Dashen from "../dashen/dashen";
import Message from "../message/message";
import Personal from "../personal/personal";
import FooterNav from "../../componets/footer-nav/footer-nav";
import { NavBar } from "antd-mobile";
import "./navBar.css"
import Chat from "../chat/chat";
import { initIO } from "../../store/features/chatSlice";
import { receiveMsg } from "../../store/features/chatSlice";
// 给组件对象添加属性
const navList = [ // 包含所有导航组件的相关信息数据
  {
    path: '/laoban', // 路由路径
    component: Laoban,
    title: '大神列表',
    icon: 'dashen',
    text: '大神',
  },
  {
    path: '/dashen', // 路由路径
    component: Dashen,
    title: '老板列表',
    icon: 'laoban',
    text: '老板',
  },
  {
    path: '/message', // 路由路径
    component: Message,
    title: '消息列表',
    icon: 'message',
    text: '消息',
  },
  {
    path: '/personal', // 路由路径
    component: Personal,
    title: '用户中心',
    icon: 'personal',
    text: '个人',
  }
]

export default function Main(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log(1123123)
    dispatch(reqAutoLogin());
    dispatch(reqGetMsgList());
    const socket = initIO();
    //console.log(socket)
    
    socket.on('receiveMsg',()=>{
      //console.log(chatMsg)
      //dispatch(receiveMsg(chatMsg))
      dispatch(reqGetMsgList());
    })

  }, [dispatch])

  //data为 user对象
  const { redirect, data } = useSelector(state => state.user);

  //const dispatch = useDispatch();
  //读取cookie中的id
  const userId = Cookies.get('userId');
  //cookie中没有_id则跳转到登录页面
  if (!userId) {
    props.history.push('/login');
  } else {
    if (!data._id) {
      return null
    } else {
      //如果cookie中有_id且请求根路径,则自动登录
      if (props.location.pathname === '/') {
        //dispatch(reqAutoLogin());
        return <Redirect to={redirect}></Redirect>;
      }
    }
  }

  const path = props.location.pathname;
  const currentNav = navList.find(nav => nav.path === path)

  return (
    <div>
      {currentNav ? <NavBar className="navBar">{currentNav.title}</NavBar> : null}
      <Switch>
        {
          navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} ></Route>)
        }
        <Route path='/dasheninfo' component={DashenInfo} />
        <Route path='/laobaninfo' component={LaobanInfo} />
        <Route path='/chat/:userId' component={Chat}></Route>
        <Route component={NotFound}></Route>
      </Switch>
      {currentNav ? <FooterNav navList={navList}></FooterNav> : null}
    </div>
  )
}