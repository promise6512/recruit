import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom"
function FooterNav(props) {
  const path = props.location.pathname;
  /* const navList = props.navList.filter(nav => path !== nav.path)
  console.log(navList) */
  let navList
  if(path === "/laoban"){
    navList = [props.navList[0],...props.navList.slice(2)]
  }else if(path === "/dashen"){
    navList = [...props.navList.slice(1)]
  }
  return (
    <div>
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
                  background: `url("./footer-nar-images/${nav.icon}.png") center center /  21px 21px no-repeat`
                }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url("./footer-nar-images/${nav.icon}-selected.png") center center /  21px 21px no-repeat`
                }}
                />
                }
              />
            )
          })
        }
      </TabBar>
    </div>
  )
}
export default withRouter(FooterNav)