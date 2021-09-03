import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ajax from "../../api/ajax";
import io from 'socket.io-client'
import Cookies from 'js-cookie';

//初始化io对象
export const initIO = () => {
  if(!io.socket){
    io.socket = io('ws://localhost:3000');
  }
  return io.socket
}

export const socket = io.socket; //对外暴露socket对象
//console.log(io.socket)
//发送消息的函数(非action)
export const sendMsg = ({from,to,content}) => {
  //console.log({from,to,content})
  io.socket.emit('sendMsg',{from,to,content});
}

//修改消息为已读
export const reqReadMsg = createAsyncThunk('chat/reqReadMsg',async({from})=>{
  const response = await ajax("/readmsg",{from},"POST");
  return response.data;
})



//获取消息列表的异步action
export const reqGetMsgList = createAsyncThunk('chat/reqGetMsgList',async()=>{
  const response = await ajax('/msgList');
  return response.data
})

const initialState = {
  users: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
  chatMsgs: [], // 当前用户所有相关msg的数组
  unReadCount: 0 // 总的未读数量
}

export const chatSlice = createSlice({
  name:"chat",
  initialState,
  reducers:{
    receiveMsg:(state,{payload}) => {
      state.chatMsgs = [...state.chatMsgs,payload];
      const userId =  Cookies.get('userId').slice(3,Cookies.get('userId').length-1)
      state.unReadCount += payload.read || userId===payload.from  ? 0 : 1;
    }
  },
  extraReducers:{
    [reqGetMsgList.fulfilled](state,{payload}){
      //console.log(payload)
      if(payload.code === 0){
        //登录的同时获取消息列表并初始化io对象
        initIO();
        state.users = payload.data.users;
        const userId =  Cookies.get('userId').slice(3,Cookies.get('userId').length-1)
        state.chatMsgs = payload.data.chatMsgs.map(msg=>{
          //如果消息为自己发送,则为已读
          if(msg.from === userId){
            return {...msg,read:true};
          }else{
            return msg
          }
        });
        state.unReadCount =  payload.data.chatMsgs.reduce((acc,cur)=>{
          //如果消息为未读且由对方发送,则为未读
          if(!cur.read && (cur.to === userId)){
            return acc + 1
          }else{
            return acc
          }
        },0)
      }
    },
    [reqReadMsg.fulfilled](state,{payload}){
      if(payload.code === 0){
        state.unReadCount -= payload.data.nModified;
        state.chatMsgs = state.chatMsgs.map(msg=>{
          if(msg.from === payload.data.from){
            return {...msg,read:true}
          }else{
            return msg
          }
        })
      }
    }
  }
})

export const {receiveMsg} = chatSlice.actions
export default chatSlice.reducer;