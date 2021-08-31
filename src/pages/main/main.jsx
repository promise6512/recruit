/* 
  主路由组件
*/
import { Switch, Route } from "react-router-dom"
import LaobanInfo from "../laoban-info/laoban-info"
import DashenInfo from "../dashen-info/dashen-info"

export default function Main() {
  return (
    <div>
      <Switch>
        <Route path='/dasheninfo' component={DashenInfo} />
        <Route path='/laobaninfo' component={LaobanInfo} />
      </Switch>
    </div>
  )
}