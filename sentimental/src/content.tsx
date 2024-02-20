import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { DonutChartTr } from "~features/DonutChartTr"

import Chart from "~features/Chart"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="z-50 flex fixed top-32 right-8">
      <DonutChartTr/>
      <Chart />
    </div>
  )
}

export default PlasmoOverlay
