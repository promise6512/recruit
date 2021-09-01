import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import {useSelector} from "react-redux";
import "./footer-nav.css"
function FooterNav(props) {
  const path = props.location.pathname;
  /* const navList = props.navList.filter(nav => path !== nav.path)
  console.log(navList) */
  let navList
  const user = useSelector((state)=>state.user)
  if(user.data.type === "laoban"){
    navList = [props.navList[0],...props.navList.slice(2)]
  }else if(user.data.type === "dashen"){
    navList = [...props.navList.slice(1)]
  }
  return (
    <div className="TabBar-container">
      <TabBar>
        {
          navList.map(nav => {
            return (
              <TabBar.Item
                key={nav.icon}
                title={nav.text}
                selected={path === nav.path}
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url("./footer-bar-images/${nav.icon}.png") center center /  21px 21px no-repeat`
                }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url("./footer-bar-images/${nav.icon}-selected.png") center center /  21px 21px no-repeat`
                }}
                />
                }
                onPress={()=>props.history.push(nav.path)}
              />
            )
          })
        }
      </TabBar>
    </div>
  )
}
export default withRouter(FooterNav)