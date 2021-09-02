import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ajax from "../../api/ajax";
import io from 'socket.io-client'

//初始化io对象
export const initIO = () => {
  if(!io.socket){
    io.socket = io('ws://localhost:3000');
    /* io.socket.on('receiveMsg',(chatMsg)=>{
      console.log(chatMsg)
      //useReceiveMsg(chatMsg)
    }) */
    //console.log(io.socket)
  }
  return io.socket
}

export const socket = io.socket; //对外暴露socket对象
//console.log(io.socket)
//发送消息的函数(非action)
export const sendMsg = ({from,to,content}) => {
  console.log({from,to,content})
  io.socket.emit('sendMsg',{from,to,content})
}



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
      state.unReadCount += payload.read ? 0 : 1;
    }
  },
  extraReducers:{
    [reqGetMsgList.fulfilled](state,{payload}){
      //console.log(payload)
      if(payload.code === 0){
        //登录的同时获取消息列表并初始化io对象
        initIO();
        state.users = payload.data.users;
        state.chatMsgs = payload.data.chatMsgs;
        state.unReadCount =  payload.data.chatMsgs.reduce((acc,cur)=>{
          if(cur.read){
            return acc
          }else{
            return acc + 1
          }
        },0)
       // console.log(state.unReadCount)
      }
    }
  }
})

export const {receiveMsg} = chatSlice.actions
export default chatSlice.reducer;