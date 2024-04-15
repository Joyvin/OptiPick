"use client";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Badge,
  BadgeDelta,
  Card,
  CategoryBar,
  Icon,
  ProgressCircle,
} from "@tremor/react";
import { RiCashFill, RiRecordCircleFill } from "@remixicon/react";
import { Button } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { Search } from "lucide-react";
import axios from "axios";
import { green } from "tailwindcss/colors";
import Loader from "./main/Loader";
import Image from "next/image";

// const resArr = [
//   {
//     title:
//       "Colgate MaxFresh Toothpaste, Red Gel Paste with Menthol for Super Fresh Breath, 600g, 150g X 4 (Spicy Fresh) (Combo Pack)",
//     link: "https://www.amazon.in/Colgate-Max-Fresh-Spicy-Toothpaste/dp/B01NAZBI08/ref=sr_1_4_sspa?crid=V4SV0X83S4S&dib=eyJ2IjoiMSJ9.UlK0dGUmfNyb7ShewyJ0nSr83TckOJAvrsMapGLIfKediUll1AHLGAI7EDifkkqOmNI16x2KuQhyaa52UULqFZ7CJbNthaEllvL6-lPbqyS-a_JTxdAj3SoKptXgsLrI8JvmRLBviN8Y4G8rok0pfHS1JLPu_eZF1w1zGGYRV1OyTsrMYtXLk2a2ItrTEWgTOXfvXvxr85qTr6AJJ4AI8th6Z7sh6koiUkertGsowJ2tY3ZHKvhZh8Dc_9OtrJGl8XG6_oHJ29qjhCW2hM4FxRJ86riJNc1ZDCteIMf3BPs.La6rrQ9wtLemKAlDCQoRl3_asQ779DbjHoDjxCdZP-A&dib_tag=se&keywords=toothpaste&qid=1712862425&sprefix=toot%2Caps%2C229&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
//     data: [
//       {
//         overall: {
//           p: 0.8065384615384616,
//           n: 0.01230769230769231,
//           nt: 0.17961538461538465,
//         },
//         datas: [
//           {
//             "0": {
//               sentence:
//                 "Very refreshing like a mouth freshener toothpaste seriously guys and also cleans your deepenly and whitening the teeth also go for it",
//               isPositive: 0.95,
//               isNegative: 0.01,
//               isNeutral: 0.05,
//               opinion: [],
//             },
//             "1": {
//               sentence:
//                 "The item purchased by this time has paid it's price with authentic cleaning capabilities and charming feeling even after a long time. ",
//               isPositive: 0.91,
//               isNegative: 0.01,
//               isNeutral: 0.08,
//               opinion: [
//                 {
//                   target: "cleaning capabilities",
//                   assessment: [
//                     { value: "authentic", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "2": {
//               sentence: "Better to try it. ",
//               isPositive: 0.54,
//               isNegative: 0.03,
//               isNeutral: 0.42,
//               opinion: [],
//             },
//             "3": {
//               sentence: "My suggestion to all valued customers.",
//               isPositive: 0.45,
//               isNegative: 0.01,
//               isNeutral: 0.54,
//               opinion: [],
//             },
//             "4": {
//               sentence:
//                 "Great experience with the brand and value for money too.",
//               isPositive: 1.0,
//               isNegative: 0.0,
//               isNeutral: 0.0,
//               opinion: [
//                 {
//                   target: "experience",
//                   assessment: [
//                     { value: "Great", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "5": {
//               sentence: "Good. ",
//               isPositive: 0.9,
//               isNegative: 0.01,
//               isNeutral: 0.08,
//               opinion: [],
//             },
//             "6": {
//               sentence: "Colgate is best for teeth,",
//               isPositive: 0.89,
//               isNegative: 0.02,
//               isNeutral: 0.09,
//               opinion: [
//                 {
//                   target: "Colgate",
//                   assessment: [
//                     { value: "best", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "7": {
//               sentence: "Good product",
//               isPositive: 0.99,
//               isNegative: 0.0,
//               isNeutral: 0.0,
//               opinion: [
//                 {
//                   target: "product",
//                   assessment: [
//                     { value: "Good", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "8": {
//               sentence: "good",
//               isPositive: 0.99,
//               isNegative: 0.0,
//               isNeutral: 0.01,
//               opinion: [],
//             },
//             "9": {
//               sentence: "Just okay",
//               isPositive: 0.85,
//               isNegative: 0.02,
//               isNeutral: 0.13,
//               opinion: [],
//             },
//             "10": {
//               sentence: "Best quality",
//               isPositive: 0.99,
//               isNegative: 0.0,
//               isNeutral: 0.01,
//               opinion: [
//                 {
//                   target: "quality",
//                   assessment: [
//                     { value: "Best", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "11": {
//               sentence: "Rich taste. ",
//               isPositive: 0.47,
//               isNegative: 0.02,
//               isNeutral: 0.51,
//               opinion: [
//                 {
//                   target: "taste",
//                   assessment: [
//                     { value: "Rich", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "12": {
//               sentence: "Full of mint. ",
//               isPositive: 0.13,
//               isNegative: 0.03,
//               isNeutral: 0.84,
//               opinion: [],
//             },
//             "13": {
//               sentence: "Value for money.",
//               isPositive: 0.94,
//               isNegative: 0.01,
//               isNeutral: 0.05,
//               opinion: [],
//             },
//             "14": {
//               sentence: "ok",
//               isPositive: 0.51,
//               isNegative: 0.04,
//               isNeutral: 0.45,
//               opinion: [],
//             },
//           },
//           {
//             "0": {
//               sentence:
//                 "Very refreshing like a mouth freshener toothpaste seriously guys and also cleans your deepenly and whitening the teeth also go for it",
//               isPositive: 0.95,
//               isNegative: 0.01,
//               isNeutral: 0.05,
//               opinion: [],
//             },
//             "1": {
//               sentence:
//                 "The item purchased by this time has paid it's price with authentic cleaning capabilities and charming feeling even after a long time. ",
//               isPositive: 0.91,
//               isNegative: 0.01,
//               isNeutral: 0.08,
//               opinion: [
//                 {
//                   target: "cleaning capabilities",
//                   assessment: [
//                     { value: "authentic", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "2": {
//               sentence: "Better to try it. ",
//               isPositive: 0.54,
//               isNegative: 0.03,
//               isNeutral: 0.42,
//               opinion: [],
//             },
//             "3": {
//               sentence: "My suggestion to all valued customers.",
//               isPositive: 0.45,
//               isNegative: 0.01,
//               isNeutral: 0.54,
//               opinion: [],
//             },
//             "4": {
//               sentence:
//                 "Great experience with the brand and value for money too.",
//               isPositive: 1.0,
//               isNegative: 0.0,
//               isNeutral: 0.0,
//               opinion: [
//                 {
//                   target: "experience",
//                   assessment: [
//                     { value: "Great", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "5": {
//               sentence: "Good. ",
//               isPositive: 0.9,
//               isNegative: 0.01,
//               isNeutral: 0.08,
//               opinion: [],
//             },
//             "6": {
//               sentence: "Colgate is best for teeth,",
//               isPositive: 0.89,
//               isNegative: 0.02,
//               isNeutral: 0.09,
//               opinion: [
//                 {
//                   target: "Colgate",
//                   assessment: [
//                     { value: "best", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "7": {
//               sentence: "Good product",
//               isPositive: 0.99,
//               isNegative: 0.0,
//               isNeutral: 0.0,
//               opinion: [
//                 {
//                   target: "product",
//                   assessment: [
//                     { value: "Good", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//             "8": {
//               sentence: "good",
//               isPositive: 0.99,
//               isNegative: 0.0,
//               isNeutral: 0.01,
//               opinion: [],
//             },
//             "9": {
//               sentence: "Just okay",
//               isPositive: 0.85,
//               isNegative: 0.02,
//               isNeutral: 0.13,
//               opinion: [],
//             },
//             "10": {
//               sentence: "Best quality",
//               isPositive: 0.99,
//               isNegative: 0.0,
//               isNeutral: 0.01,
//               opinion: [
//                 {
//                   target: "quality",
//                   assessment: [
//                     { value: "Best", sentiment: "positive", score: 1.0 },
//                   ],
//                 },
//               ],
//             },
//           },
//         ],
//         aspects: [
//           {
//             value: "authentic",
//             sentiment: "positive",
//             score: 1.0,
//             target: "cleaning capabilities",
//           },
//           {
//             value: "Great",
//             sentiment: "positive",
//             score: 1.0,
//             target: "experience",
//           },
//           {
//             value: "best",
//             sentiment: "positive",
//             score: 1.0,
//             target: "Colgate",
//           },
//           {
//             value: "Good",
//             sentiment: "positive",
//             score: 1.0,
//             target: "product",
//           },
//           {
//             value: "Best",
//             sentiment: "positive",
//             score: 1.0,
//             target: "quality",
//           },
//           { value: "Rich", sentiment: "positive", score: 1.0, target: "taste" },
//           {
//             value: "authentic",
//             sentiment: "positive",
//             score: 1.0,
//             target: "cleaning capabilities",
//           },
//           {
//             value: "Great",
//             sentiment: "positive",
//             score: 1.0,
//             target: "experience",
//           },
//           {
//             value: "best",
//             sentiment: "positive",
//             score: 1.0,
//             target: "Colgate",
//           },
//           {
//             value: "Good",
//             sentiment: "positive",
//             score: 1.0,
//             target: "product",
//           },
//           {
//             value: "Best",
//             sentiment: "positive",
//             score: 1.0,
//             target: "quality",
//           },
//         ],
//         nps: 10,
//       },
//     ],
//     time: "04/11/2024, 22:16:39",
//     id: "abdowb",
//     img: "https://m.media-amazon.com/images/I/51c+RwHEvsL._SY300_SX300_.jpg",
//   },
// ];

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

type Props = {};

const HistoryItem = (props: Props) => {
  const [resArr, setResArr] = useState([]);
  // const obj = JSON.parse(sessionStorage.getItem("newData"));
  setResArr(sessionStorage.getItem("newData"));

  const chartdata1 = [
    {
      date: "Jan 22",
      Positive: 0,
      Negative: 0,
    },
    {
      date: "Feb 22",
      Positive: 2,
      Negative: 1,
    },
    {
      date: "Mar 22",
      Positive: 0,
      Negative: 0,
    },
    {
      date: "Apr 22",
      Positive: 4,
      Negative: 2,
    },
    {
      date: "May 22",
      Positive: 0,
      Negative: 0,
    },
    {
      date: "Jun 22",
      Positive: 0,
      Negative: 0,
    },
    {
      date: "Jul 22",
      Positive: 0,
      Negative: 0,
    },
    {
      date: "Aug 22",
      Positive: 4,
      Negative: 4,
    },
    {
      date: "Sep 22",
      Positive: 0,
      Negative: 0,
    },
    {
      date: "Oct 22",
      Positive: 0,
      Negative: 0,
    },
    {
      date: "Nov 22",
      Positive: 5,
      Negative: 1,
    },
    {
      date: "Dec 22",
      Positive: 3,
      Negative: 0,
    },
  ];
  interface MyData {
    overall: any;
  }
  const [inputValue, setInputValue] = useState("");
  const [showData, setShowData] = useState(true);
  const [myData, setMyData] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<any>();

  useEffect(() => {
    setMyData((prevData) => {
      if (!Array.isArray(prevData)) {
        // Handle the case where prevData is not an array
        return [resArr[0].data];
      }
      return [...prevData, ...resArr[0].data];
    });
  }, []);

  return (
    <div className="">
      {showData ? (
        <div
          className={`grid md:grid-cols-3 grid-cols-1 relative z-[20] mt-20`}
        >
          {Array.isArray(resArr) &&
            resArr.map((values, i) => {
              let splitString = values.time.split(",");

              return (
                <div
                  key={i}
                  className="text-white fixed right-10 xl:w-[420px] lg:w-[300px] md:w-[200px] w-[50px] flex flex-col gap-4"
                >
                  <img
                    src={values.img}
                    className="object-cover w-full h-full rounded-lg"
                    alt=""
                  />
                  <h1>{values.title}</h1>
                </div>
              );
            })}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-6 justify-center mt-8">
              <Card
                className="mx-auto max-w-sm"
                decoration="top"
                decorationColor="blue"
              >
                <div className="flex items-start space-x-6">
                  <Icon
                    icon={RiCashFill}
                    color="blue"
                    variant="solid"
                    tooltip="Sum of Sales"
                    size="lg"
                  />
                  {myData && myData.datas && myData.datas.length !== 0 && (
                    <div>
                      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                        Reviews
                      </p>
                      <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                        {Object.keys(myData.datas[0]).length +
                          Object.keys(myData.datas[1]).length}
                      </p>
                    </div>
                  )}

                  <Badge icon={RiRecordCircleFill}>live</Badge>
                </div>
              </Card>
              <Card
                className="mx-auto max-w-sm"
                decoration="top"
                decorationColor="yellow"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    NPS
                  </h4>
                  <Badge icon={RiRecordCircleFill}>live</Badge>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  8
                </p>
              </Card>
              <div className="col-span-1 flex flex-col gap-2">
                <div className="space-y-3">
                  <p className="text-center font-mono text-sm text-slate-500">
                    Total Positive Reviews -{" "}
                    {myData?.overall?.p ? myData.overall.p * 100 : 0}%
                  </p>

                  <div className="flex justify-center">
                    <Card
                      className="max-w-sm"
                      decoration="left"
                      decorationColor="green"
                    >
                      <CategoryBar
                        values={[40, 30, 20, 10]}
                        colors={["emerald", "yellow", "orange", "rose"]}
                        markerValue={
                          myData?.overall?.p ? myData.overall.p * 100 : 0
                        }
                      />
                    </Card>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-center font-mono text-sm text-slate-500">
                    Total Negative Reviews -{" "}
                    {myData?.overall?.n ? myData.overall.n * 100 : 0}%
                  </p>
                  <div className="flex justify-center">
                    <Card
                      className="max-w-sm"
                      decoration="left"
                      decorationColor="red"
                    >
                      <CategoryBar
                        values={[40, 30, 20, 10]}
                        colors={["emerald", "yellow", "orange", "rose"]}
                        markerValue={
                          myData?.overall?.n ? myData.overall.n * 100 : 0
                        }
                      />
                    </Card>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-center font-mono text-sm text-slate-500">
                    Total Neutral Reviews -{" "}
                    {myData?.overall?.nt ? myData.overall.nt * 100 : 0}%
                  </p>
                  <div className="flex justify-center">
                    <Card
                      className="max-w-sm"
                      decoration="left"
                      decorationColor="indigo"
                    >
                      <CategoryBar
                        values={[40, 30, 20, 10]}
                        colors={["emerald", "yellow", "orange", "rose"]}
                        markerValue={
                          myData?.overall?.nt ? myData.overall.nt * 100 : 0
                        }
                      />
                    </Card>
                  </div>
                </div>
              </div>
              <div className="shadow-md rounded-md bg-transparent m-4">
                <AreaChart
                  className=""
                  data={chartdata1}
                  index="date"
                  categories={["Positive", "Negative"]}
                  colors={["indigo", "rose"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={60}
                  onValueChange={(v) => console.log(v)}
                />
              </div>
              {Object.values(myData?.datas?.[0] ?? {}).map((value: any) => {
                return (
                  <Card
                    className="shadow-md rounded-lg mx-auto max-w-md"
                    decoration="left"
                    decorationColor="blue"
                    key="1"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p className="text-gray-300 font-semibold text-center">
                        {value.sentence}
                      </p>
                      <div className="flex gap-6 justify-center items-center">
                        <div className="flex flex-col gap-4">
                          <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Positive
                          </span>
                          <ProgressCircle
                            value={value.isPositive * 100}
                            size="md"
                            color="green"
                          >
                            <span className="text-xs font-medium text-white">
                              {Math.round(value.isPositive * 100)}%
                            </span>
                          </ProgressCircle>
                        </div>
                        <div className="flex flex-col gap-4">
                          <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Negative
                          </span>
                          <ProgressCircle
                            value={value.isNegative * 100}
                            size="md"
                            color="red"
                          >
                            <span className="text-xs font-medium text-white">
                              {Math.round(value.isNegative * 100)}%
                            </span>
                          </ProgressCircle>
                        </div>
                        <div className="flex flex-col gap-4">
                          <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Neutral
                          </span>
                          <ProgressCircle
                            value={value.isNegative * 100}
                            size="md"
                            color="indigo"
                          >
                            <span className="text-xs font-medium text-white">
                              {Math.round(value.isNegative * 100)}%
                            </span>
                          </ProgressCircle>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              {Object.values(myData?.datas?.[1] ?? {}).map((value: any) => {
                return (
                  <Card
                    className="shadow-md rounded-lg mx-auto max-w-md"
                    decoration="left"
                    decorationColor="blue"
                    key="2"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p className="text-gray-300 font-semibold text-center">
                        {value.sentence}
                      </p>
                      <div className="flex gap-6 justify-center items-center">
                        <div className="flex flex-col gap-4">
                          <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Positive
                          </span>
                          <ProgressCircle
                            value={value.isPositive * 100}
                            size="md"
                            color="green"
                          >
                            <span className="text-xs font-medium text-white">
                              {Math.round(value.isPositive * 100)}%
                            </span>
                          </ProgressCircle>
                        </div>
                        <div className="flex flex-col gap-4">
                          <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Negative
                          </span>
                          <ProgressCircle
                            value={value.isNegative * 100}
                            size="md"
                            color="red"
                          >
                            <span className="text-xs font-medium text-white">
                              {Math.round(value.isNegative * 100)}%
                            </span>
                          </ProgressCircle>
                        </div>
                        <div className="flex flex-col gap-4">
                          <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Neutral
                          </span>
                          <ProgressCircle
                            value={value.isNegative * 100}
                            size="md"
                            color="indigo"
                          >
                            <span className="text-xs font-medium text-white">
                              {Math.round(value.isNegative * 100)}%
                            </span>
                          </ProgressCircle>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              {Object.values(myData?.aspects ?? {}).map((value: any) => {
                return (
                  <Card
                    key="3"
                    className="shadow-md rounded-lg mx-auto max-w-md flex flex-col gap-2"
                    decoration="left"
                    decorationColor="blue"
                  >
                    {value.sentiment === "positive" ? (
                      <div className="flex gap-2">
                        <BadgeDelta
                          deltaType="increase"
                          isIncreasePositive={true}
                        >
                          {value.value}
                        </BadgeDelta>
                        <span className="text-white">{value.target}</span>
                      </div>
                    ) : value.sentiment === "negative" ? (
                      <div className="flex gap-2">
                        <BadgeDelta
                          deltaType="decrease"
                          isIncreasePositive={true}
                        >
                          {value.value}
                        </BadgeDelta>
                        <span className="text-white">{value.target}</span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <BadgeDelta
                          deltaType="increase"
                          isIncreasePositive={true}
                        >
                          {value.value}
                        </BadgeDelta>
                        <span className="text-white">{value.target}</span>
                      </div>
                    )}
                    {value.sentiment === "positive" ? (
                      <Badge icon={RiCashFill} color="green">
                        {value.sentiment}
                      </Badge>
                    ) : value.sentiment === "negative" ? (
                      <Badge icon={RiCashFill} color="red">
                        {value.sentiment}
                      </Badge>
                    ) : (
                      <Badge icon={RiCashFill} color="blue">
                        {value.sentiment}
                      </Badge>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="text-white fixed right-10 xl:w-[420px] lg:w-[300px] md:w-[200px] w-[50px] flex flex-col gap-4">
            {resArr.map((values, i) => {
              let splitString = values.time.split(",");

              return (
                <div
                  key={i}
                  className="text-white fixed right-10 xl:w-[420px] lg:w-[300px] md:w-[200px] w-[50px] flex flex-col gap-4"
                >
                  <img
                    src={values.img}
                    className="object-cover w-full h-full rounded-lg"
                    alt=""
                  />
                  <h1>{values.title}</h1>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="my-2 md:flex flex-row justify-between relative z-[20] mt-20">
          {/* <form onSubmit={handleSubmit} className="md:w-[90%] mx-auto">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              URL
            </label>
            <div className="relative w-full flex">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <Search className="text-white" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter URL"
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              {isLoading ? (
                <button
                  type="submit"
                  className="flex items-center px-1 bg-blue-700 ml-4 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit{" "}
                  <svg
                    aria-hidden="true"
                    className="p-1 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-700 ml-4 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              )}
            </div>
          </form> */}
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
