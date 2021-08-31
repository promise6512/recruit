import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ajax from "../../api/ajax";
import getRedirect from "../../utils/getRedirect";
//异步action reqRegister
export const reqRegister = createAsyncThunk('user/reqRegister', async (user) => {
  // console.log(username,type)
  const res = await ajax('/register', user, 'POST');
  return res.data;
})

//异步action reqLogin
export const reqLogin = createAsyncThunk('user/reqLogin', async (user) => {
  const res = await ajax('/login', user, 'POST')
  return res.data
})

//异步action reqUpdateUser
export const reqUpdateUser = createAsyncThunk('user/reqUpdateUser',async(userInfo) => {
  const res = await ajax('/update',userInfo,'POST');
  return res.data
})
export const userSlice = createSlice({
  name: "user",
  initialState: {
    redirect: '',
    errmsg:'',
    data: {
      username: "",
      type: ""
    }
    
  },
  reducers:{
    clearErrmsg:(state)=>{
      state.errmsg = ''
    }
  },
  extraReducers: {
    [reqRegister.fulfilled](state, { payload }) {
      //console.log(payload)
      if (payload.code === 0) {
        const { username, type,header } = payload.data;
        state.data = { username, type }
        //console.log(type);
        //console.log(getRedirect(type,header))
        state.redirect = getRedirect(type,header)
      }else{
        state.errmsg = payload.msg
      }
    },
    [reqRegister.rejected](state, err) {
      console.log(err)
    },
    [reqLogin.fulfilled](state, { payload }) {
      if (payload.code === 0) {
        const { username, type,header } = payload.data;
        state.data = { username, type }
        state.redirect = getRedirect(type,header)
      }else{
        state.errmsg = payload.msg
      }
    },
    [reqUpdateUser.fulfilled](state,{payload}){
      if(payload.code === 0){
        state.data = payload.data;
        const { type,header } = payload.data;
        state.redirect = getRedirect(type,header)
      }
    }
  }
})
export const {clearErrmsg} = userSlice.actions
export default userSlice.reducer;