//根据type和header判断路由路径
export default function getRedirect(type,header){
  let path;
  if(type === "dashen"){
    path = "/dashen";
  }else if(type === "laoban"){
    path = "/laoban";
  }

  if(!header){
    path += "info";
  }

  return path
} 