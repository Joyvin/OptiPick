import someCoolImage from "data-base64:~/../assets/Binary code.mp4"
import { Moon, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

import Chart from "./Chart"
import DonutChartTr from "./DonutChartTr"

interface Aspect {
  value: string
  sentiment: string
  score: number
  target: string
}

interface ResponseData {
  overall: {
    positive: number[]
    negative: number[]
    neutral: number[]
  }
  nps: number
  aspects: Aspect[]
}

export const CountButton = () => {
  const [url, setUrl] = useState("")
  const [response, setResponse] = useState<ResponseData | null>(null)

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url)
    })
  }, [])

  const sendRequest = async () => {
    if (url) {
      try {
        const response = await fetch("http://127.0.0.1:4000/endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "http://127.0.0.1:4000"
          },
          body: JSON.stringify({ url: url })
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setResponse(data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <div className="block w-[90%] mx-auto text-center">
        <div className="flex justify-center flex-row gap-3 my-4 border-b pb-2">
          <Sparkles />
          <h1 className="font-bold text-xl">Welcome to OptiPick</h1>
        </div>
        {!response && (
          <>
            <p className="mb-3">
              Analyse your page in one click and find the best product
              experienced by customers
            </p>
            {/* <img src={someCoolImage} alt="Some pretty cool image" /> */}
            <video src={someCoolImage} muted autoPlay loop />
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                className="rounded-md p-2 px-4 border border-black "
                onClick={sendRequest}>
                <Moon size={20} />
              </button>

              <button
                className="rounded-md p-2 px-4 border border-black"
                onClick={sendRequest}>
                Analyse Product
              </button>
            </div>
          </>
        )}
        {response && <Chart data={response} aspects={response.aspects} />}
        {response && <DonutChartTr data={response.nps * 10} />}{" "}
      </div>
    </>
  )
}
