import UserList from "../../componets/userList/userList";
export default function Dashen(){
  /* const [userList, setUserList] = useState([]);
  const {type} = useSelector(state => state.user).data;
  

  useEffect(()=>{
    const getUserList = async () => {
      //type1 = type === "dashen" ? "laoban" : "dashen"
      const result  = await (await reqGetUserList(type === "dashen" ? "laoban" : "dashen")).data
      if(result.code === 0){
        setUserList(result.data)
        //console.log(userList)
      }
    }
    getUserList()
  },[]) */

  return(
    <div>
      <UserList /* userList={userList} *//>
    </div>
  )
}