import someCoolImage from "data-base64:~/../assets/Binary code.mp4"
import Loader from "data-base64:~/../assets/Loader.mp4"
import { Moon, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

import Chart from "./Chart"
import DonutChartTr from "./DonutChartTr"

interface Opinion {
  target: string
  assessment: {
    value: string
    sentiment: string
    score: number
  }[]
}

interface Sentence {
  sentence: string
  isPositive: number
  isNegative: number
  isNeutral: number
  opinion: Opinion[]
}

interface Data {
  [key: string]: Sentence
}

interface Aspect {
  value: string
  sentiment: string
  score: number
  target: string
}

interface ResponseData {
  overall: {
    p: number
    n: number
    nt: number
  }
  datas: Data[]
  aspects: Aspect[]
  nps: number
}

export const CountButton = () => {
  const [url, setUrl] = useState("")
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url)
    })
  }, [])

  const sendRequest = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  const calculateCategoryValues = (responseData) => {
    const { p, n, nt } = responseData.overall
    return [
      parseFloat((p * 100).toFixed(2)),
      parseFloat((n * 100).toFixed(2)),
      parseFloat((nt * 100).toFixed(2))
    ]
  }

  const calculateFinalValue = (responseData) => {
    const { p } = responseData.overall
    return parseFloat((p * 100).toFixed(2))
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
            {!loading && <video src={someCoolImage} muted autoPlay loop />}

            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                className="rounded-md p-2 px-4 border border-black"
                onClick={sendRequest}>
                Analyse Product
              </button>
            </div>
          </>
        )}
        {loading && (
          <div className="">
            <video src={Loader} muted autoPlay loop />
          </div>
        )}

        {response && (
          <DonutChartTr
            rating={response.nps * 10}
            data={calculateFinalValue(response)}
            categoryValues={calculateCategoryValues(response)}
          />
        )}
        {response && <Chart data={response} aspects={response.aspects} />}
      </div>
    </>
  )
}
