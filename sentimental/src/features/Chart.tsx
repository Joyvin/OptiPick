import { Annoyed, ChevronRightCircle, Search, SearchCheckIcon, ThumbsDown, ThumbsUp } from "lucide-react"
import React, { useEffect, useState } from "react"

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

const Chart = ({
  data,
  aspects,
  url
}: {
  data: ResponseData
  aspects: Aspect[]
  url: String
}) => {
  const [chartData, setChartData] = useState([
    {
      quality: "Excellent",
      type: "positive",
      percentage: 0
    },
    {
      quality: "Fine",
      type: "neutral",
      percentage: 0
    },
    {
      quality: "Poor",
      type: "negative",
      percentage: 0
    }
  ])

  useEffect(() => {
    setChartData([
      {
        quality: "Excellent",
        type: "positive",
        percentage: data.overall.p
      },
      {
        quality: "Fine",
        type: "neutral",
        percentage: data.overall.nt
      },
      {
        quality: "Poor",
        type: "negative",
        percentage: data.overall.n
      }
    ])
  }, [data])
  return (
    <div className="w-[90%] mx-auto  my-5">
      <div className="grid grid-cols-3 gap-3 justify-items-center">
        {chartData.map((value, i) => (
          <div key={i} className="align-center">
            {value.type === "positive" && <ThumbsUp />}
            {value.type === "neutral" && <Annoyed />}
            {value.type === "negative" && <ThumbsDown />}
            {(value.percentage * 100).toFixed(2)}%
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row items-center gap-3 mt-2 overflow-x-auto">
        {aspects.map((aspect, i) => (
          <div
            key={i}
            className="flex items-center justify-center shadow-md rounded-full px-7 py-0.5 border border-green-500">
            {aspect.target}: {aspect.value}
          </div>
        ))}
        {chartData.map((values, i) => {
          return values.type === "positive" ? (
            <div
              key={i}
              className="flex items-center justify-center  shadow-md rounded-full px-7 py-0.5 border border-green-500">
              {values.quality}
            </div>
          ) : values.type === "negative" ? (
            <div
              key={i}
              className="flex items-center justify-center  shadow-md rounded-full px-7 py-0.5 border border-red-500">
              {values.quality}
            </div>
          ) : (
            <div
              key={i}
              className="flex items-center justify-center  shadow-md rounded-full px-7 py-0.5 border border-gray-500">
              {values.quality}
            </div>
          )
        })}
      </div>
      <a href={`http://localhost:3000/dashboard?q=${url}`} target="_blank" className="">
        View More Details
        {/* <SearchCheckIcon size={10}/> */}
      </a>

    </div>
  )
}

export default Chart
