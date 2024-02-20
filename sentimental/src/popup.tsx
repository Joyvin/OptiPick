import Chart from "~features/Chart"
import { DonutChartTr } from "~features/DonutChartTr"

import "~style.css"

function IndexPopup() {
  return (
    <div className="h-[500px] w-80 my-3">
      <DonutChartTr/>
      <Chart/>
    </div>
  )
}

export default IndexPopup
