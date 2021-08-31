import ajax from "./ajax";
/* export const reqRegister = (username,password,type) => {
 // console.log(1)
  return ajax('/register',{username,password,type},'POST')
} */
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
//console.log(1)
/* reqRegister('abcd',"123","dashen").then(result=>{
  console.log(result)
}) */
/* reqLogin('abcd','1223').then(result=>{
  console.log(result)
}) */