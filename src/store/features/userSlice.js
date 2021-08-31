import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import ajax from "../../api/ajax";

//异步action reqRegister
export const reqRegister = createAsyncThunk('user/reqRegister',async(username,password,type)=>{
  const res = await ajax('/register',{username,password,type},'POST');
  return res.data;
})


export const userSlice = createSlice({
  name:"user",
  initialState:{
    username: '',
    type: '',
    msg: '', //错误提示信息
  },

  extraReducers:{

    [reqRegister.fulfilled](state,{payload}){
      console.log(payload)
    },
    [reqRegister.rejected](state,err){
      console.log(err)
    },
  }
})

export default userSlice.reducer;