import { useState } from "react"
import { List, Grid } from "antd-mobile"
export default function HeaderSelector(props) {
  const [listHeader, setlistHeader] = useState("请选择头像")
  //头像数据列表
  const headerArray = new Array(20).fill(0).map((val, index) => {
    return {
      /*  icon: require(`@/assets/images/头像${index+1}.png`), */
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: `头像${index + 1}`,
    }
  })
  //console.log(data)
  return (
      <List renderHeader={() => listHeader}>
        <Grid
          data={headerArray}
          activeStyle={false}
          columnNum={5}
          onClick={(header) => {
            props.getAvator(header.icon);
            setlistHeader(
              <div>
                已选择头像:
                <img
                  src={header.text}
                  style={{
                    width: "20px"
                  }}
                />
              </div>
            )
          }}
        />
      </List>
  )
}