import { Card, CategoryBar, ProgressCircle } from "@tremor/react"
import { Sparkles } from "lucide-react"
import React from "react"

interface DonutChartTrProps {
  data: number
  categoryValues: number[]
}

export const DonutChartTr: React.FC<DonutChartTrProps> = ({
  data,
  categoryValues
}) => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-center flex-row gap-3 my-4 border-b pb-2">
        <Sparkles />
        <h1 className="font-bold text-xl">Welcome to OptiPick</h1>
      </div>
      <h1 className="font-semibold text-lg">Product Name</h1>
      <div className=" grid grid-cols-1 gap-12 ">
        <div className="flex justify-center my-3">
          <ProgressCircle
            value={data}
            radius={70}
            strokeWidth={15}
            tooltip="Overall Positive Score">
            <span className="text-3xl font-semibold text-slate-700">
              {data}%
            </span>
          </ProgressCircle>
        </div>
      </div>
      <Card className="mx-auto max-w-sm my-3">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span>Product Rating</span>
          <span>{data}%</span>
        </p>
        <CategoryBar
          values={categoryValues}
          colors={["rose", "orange", "yellow", "emerald"]}
          markerValue={data}
          className="mt-3"
        />
      </Card>
    </div>
  )
}

export default DonutChartTr
