import { NavBar, List,InputItem } from "antd-mobile"
import header from "../../assets/header-images/头像1.png"
import "./chat.css"
export default function Chat() {
  return (
    <div>
      <NavBar className="navBar">aaa</NavBar>
      <List className="list">
        <List.Item thumb={header}>111</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item thumb={header}>你好</List.Item>
        <List.Item extra="我">我不好</List.Item>
      </List>
      <div className='input-bar'>
        <InputItem
          placeholder=" 请输入"
          extra={
            <span>发送</span>
          }
        />
      </div>
    </div>
  )
}