import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import Chart from "~features/Chart"
import { DonutChartTr } from "~features/DonutChartTr"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return <div className="z-50 flex fixed top-32 right-8"></div>
}

export default PlasmoOverlay
