import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import chatSlice from "./features/chatSlice";
export default configureStore({
  reducer:{
    user:userSlice,
    chat:chatSlice
  }
})