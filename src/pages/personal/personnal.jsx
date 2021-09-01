/* 
  个人中心界面路由
*/
import { Button, Result,List } from "antd-mobile"
import Cookies from 'js-cookie';
import { useSelector,useDispatch } from "react-redux";
import { clearUser } from "../../store/features/userSlice";
import { Redirect } from "react-router-dom";
export default function Personal(props) {
  const dispatch = useDispatch()
  const { username, type, header, company, post, salary,info } = useSelector(state => state.user).data;
  const logout = () => {
    Cookies.remove("userId");
    dispatch(clearUser());
    props.history.push("/login")
  }
  return (
    <div>
      <Result
        img={<img src="./header-images/头像1.png" />}
        title={username}
        message={company ? company : ''}
      />
      <List renderHeader={()=>"相关信息"}>
        <List.Item multipleLine>
          <List.Item.Brief >职位:{post}</List.Item.Brief>
          <List.Item.Brief >简介:{info}</List.Item.Brief>
          {type === "laoban" ? <List.Item.Brief >薪资:{salary}</List.Item.Brief> : null}
        </List.Item>
      </List>
      <Button type="warning" onClick={logout}>退出登录</Button>
    </div>
  )
}