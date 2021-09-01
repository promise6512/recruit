import ajax from "./ajax";
export const reqGetUserList = (type) => ajax("/userList",{type})

