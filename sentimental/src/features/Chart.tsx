import { Annoyed, ThumbsDown, ThumbsUp } from "lucide-react"
import React from "react"

const chart = () => {
  const data = [
    {
      quality: "Excellent",
      type: "positive"
    },
    {
      quality: "Fine",
      type: "neutral"
    },
    {
      quality: "Poor",
      type: "negative"
    }
  ]
  return (
    <div className="w-[90%] mx-auto  my-5">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
      <div className="align-center">
        <ThumbsUp />
        50%
      </div>
      <div className="align-center">
        <Annoyed />
        50%
      </div>
      <div className="align-center">
        <ThumbsDown />
        50%
      </div>
        </div>
      <div className="w-full flex justify-center flex-row gap-3 my-2">
        {data.map((values, i) => {
          return values.type == "positive" ? (
            <div
              key={i}
              className="block shadow-md rounded-full px-3 py-2 border border-green-500">
              {values.quality}
            </div>
          ) : values.type == "negative" ? (
            <div
              key={i}
              className="block shadow-md rounded-full px-3 py-2 border border-red-500">
              {values.quality}
            </div>
          ) : (
            <div
              key={i}
              className="block shadow-md rounded-full px-3 py-2 border border-gray-500">
              {values.quality}
            </div>
          )
        })}
      </div>
      <a href="/dashboard" className="pt-5">
        <p className="text-blue-500 underline text-center">Click here to know more about the product </p>
      </a>
    </div>
  )
}

export default chart
