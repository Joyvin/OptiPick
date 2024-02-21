"use client";
import React, { useState } from "react";
import { AreaChart, Badge, BadgeDelta, BarChart, Card, CategoryBar, Icon, ProgressCircle } from "@tremor/react";
import { RiCashFill, RiRecordCircleFill, RiRefreshLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { Search } from "lucide-react";
// import Image from "next/image";
import axios from "axios";
// import myData from "@/data/myData";
import { green } from "tailwindcss/colors";

// Object.values(myData.datas[0]).forEach((value) => {
//   console.log(value.sentence);
// })


const datahero = [
  {
    name: "Noche Holding AG",
    value: 9800,
  },
  {
    name: "Rain Drop AG",
    value: 4567,
  },
  {
    name: "Push Rail AG",
    value: 3908,
  },
  {
    name: "Flow Steal AG",
    value: 2400,
  },
  {
    name: "Tiny Loop Inc.",
    value: 2174,
  },
  {
    name: "Anton Resorts Holding",
    value: 1398,
  },
];

const chartdata1 = [
  {
    date: "Jan 22",
    Positive: 2890,
    "Negative": 2338,
  },
  {
    date: "Feb 22",
    Positive: 2756,
    "Negative": 2103,
  },
  {
    date: "Mar 22",
    Positive: 3322,
    "Negative": 2194,
  },
  {
    date: "Apr 22",
    Positive: 3470,
    "Negative": 2108,
  },
  {
    date: "May 22",
    Positive: 3475,
    "Negative": 1812,
  },
  {
    date: "Jun 22",
    Positive: 3129,
    "Negative": 1726,
  },
  {
    date: "Jul 22",
    Positive: 3490,
    "Negative": 1982,
  },
  {
    date: "Aug 22",
    Positive: 2903,
    "Negative": 2012,
  },
  {
    date: "Sep 22",
    Positive: 2643,
    "Negative": 2342,
  },
  {
    date: "Oct 22",
    Positive: 2837,
    "Negative": 2473,
  },
  {
    date: "Nov 22",
    Positive: 2954,
    "Negative": 3848,
  },
  {
    date: "Dec 22",
    Positive: 3239,
    "Negative": 3736,
  },
];

const chartdata2 = [
  {
    name: "Colgate",
    "Number of similar products": 2488,
  },
  {
    name: "Mouthwash",
    "Number of similar products": 1445,
  },
  {
    name: "Toothpaste",
    "Number of similar products": 743,
  },
  {
    name: "Toothbrush",
    "Number of similar products": 281,
  },
  {
    name: "Dental Floss",
    "Number of similar products": 251,
  },
  {
    name: "Mouth Spray",
    "Number of similar products": 232,
  },
  {
    name: "Mouth Gel",
    "Number of similar products": 98,
  },
];

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

type Props = {};

const page = (props: Props) => {
  interface MyData {
    overall: any
  }
  const [inputValue, setInputValue] = useState("");
  const [showData, setShowData] = useState(false);
  const [myData, setMyData] = useState<any>();
  // const reviewLength = Object.keys(myData["datas"][0]).length
  const [details, setDetails] = useState<any>();

  async function getData(inputValue: string) {
    var formdata = new FormData();
    formdata.append(
      "url",
      inputValue.replace('/dp/', '/product-reviews/')
    );

    let res = await axios
      .post("http://localhost:3000/api/scrape", formdata)
      .then(async (e) => {
        console.log(e.data);
        await scrapeDetails(inputValue);
        setMyData(e.data);
        return e.data;
      });
  }

  async function scrapeDetails(inputValue: string) {
    var formdata = new FormData();
    formdata.append(
      "url",
      inputValue
    );

    let res = await axios
      .post("http://localhost:3000/api/details", formdata)
      .then((e) => {
        console.log(e.data);
        // setMyData(e.data);
        setDetails(e.data);
        return e.data;
      });
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.target.reset();
    await getData(inputValue);
    setShowData(true);
  };
  return (
    <div className="">
      {showData ? (
        <div
          className={`grid md:grid-cols-3 grid-cols-1 relative z-[20] mt-20`}
        >
          <div className="col-span-2">
            <form onSubmit={handleSubmit} className="mx-5">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                URL
              </label>
              <div className="relative w-full">
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
                <button
                  type="submit"
                  className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="grid grid-cols-2 gap-6 justify-center mt-8">
              <Card className="mx-auto max-w-sm" decoration="top" decorationColor="blue">
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
                      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Reviews</p>
                      <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                        {Object.keys(myData.datas[0]).length + Object.keys(myData.datas[1]).length}
                      </p>
                    </div>
                  )}

                  <Badge icon={RiRecordCircleFill}>live</Badge>
                </div>
              </Card>
              <Card className="mx-auto max-w-sm" decoration="top" decorationColor="yellow">
                <div className="flex items-center justify-between">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Sales</h4>
                  <BadgeDelta
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="xs"
                  >
                    +9.3%
                  </BadgeDelta>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">$23,456</p>
              </Card>
              <div className="col-span-1 flex flex-col gap-2">
                <div className="space-y-3">
                  <p className="text-center font-mono text-sm text-slate-500">
                    Total Positive Reviews - {myData.overall.p * 100}%
                  </p>
                  <div className="flex justify-center">
                    <Card className="max-w-sm" decoration="left" decorationColor="green">
                      <CategoryBar
                        values={[40, 30, 20, 10]}
                        colors={['emerald', 'yellow', 'orange', 'rose']}
                        markerValue={myData.overall.p * 100}
                      />
                    </Card>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-center font-mono text-sm text-slate-500">
                    Total Negative Reviews - {myData.overall.n * 100}%
                  </p>
                  <div className="flex justify-center">
                    <Card className="max-w-sm" decoration="left" decorationColor="red">
                      <CategoryBar
                        values={[40, 30, 20, 10]}
                        colors={['emerald', 'yellow', 'orange', 'rose']}
                        markerValue={myData.overall.n * 100}
                      />
                    </Card>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-center font-mono text-sm text-slate-500">
                    Total Neutral Reviews - {myData.overall.nt * 100}%
                  </p>
                  <div className="flex justify-center">
                    <Card className="max-w-sm" decoration="left" decorationColor="indigo">
                      <CategoryBar
                        values={[40, 30, 20, 10]}
                        colors={['emerald', 'yellow', 'orange', 'rose']}
                        markerValue={myData.overall.nt * 100}
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
              <div className="shadow-md rounded-md bg-transparent m-4">
                <BarChart
                  data={chartdata2}
                  index="name"
                  categories={["Number of similar products"]}
                  colors={["blue"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={48}
                  onValueChange={(v) => console.log(v)}
                />
              </div>
              <div>
                <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  donut variant 1
                </span>
                <DonutChart
                  data={datahero}
                  variant="donut"
                  valueFormatter={dataFormatter}
                  onValueChange={(v) => console.log(v)}
                />
              </div>
              {
                Object.values(myData.datas[0]).map((value: any) => {
                  return (
                    <Card className="shadow-md rounded-lg mx-auto max-w-md" decoration="left" decorationColor="blue">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-gray-300 font-semibold text-center">{value.sentence}</p>
                        <div className="flex gap-6 justify-center items-center">
                          <div className="flex flex-col gap-4">
                            <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              Positive
                            </span>
                            <ProgressCircle value={value.isPositive * 100} size="md" color="green">
                              <span className="text-xs font-medium text-white">{Math.round(value.isPositive * 100)}%</span>
                            </ProgressCircle>
                          </div>
                          <div className="flex flex-col gap-4">
                            <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              Negative
                            </span>
                            <ProgressCircle value={value.isNegative * 100} size="md" color="red">
                              <span className="text-xs font-medium text-white">{Math.round(value.isNegative * 100)}%</span>
                            </ProgressCircle>
                          </div>
                          <div className="flex flex-col gap-4">
                            <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              Neutral
                            </span>
                            <ProgressCircle value={value.isNegative * 100} size="md" color="indigo">
                              <span className="text-xs font-medium text-white">{Math.round(value.isNegative * 100)}%</span>
                            </ProgressCircle>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })
              }
              {
                Object.values(myData.datas[1]).map((value: any) => {
                  return (
                    <Card className="shadow-md rounded-lg mx-auto max-w-md" decoration="left" decorationColor="blue">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-gray-300 font-semibold text-center">{value.sentence}</p>
                        <div className="flex gap-6 justify-center items-center">
                          <div className="flex flex-col gap-4">
                            <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              Positive
                            </span>
                            <ProgressCircle value={value.isPositive * 100} size="md" color="green">
                              <span className="text-xs font-medium text-white">{Math.round(value.isPositive * 100)}%</span>
                            </ProgressCircle>
                          </div>
                          <div className="flex flex-col gap-4">
                            <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              Negative
                            </span>
                            <ProgressCircle value={value.isNegative * 100} size="md" color="red">
                              <span className="text-xs font-medium text-white">{Math.round(value.isNegative * 100)}%</span>
                            </ProgressCircle>
                          </div>
                          <div className="flex flex-col gap-4">
                            <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              Neutral
                            </span>
                            <ProgressCircle value={value.isNegative * 100} size="md" color="indigo">
                              <span className="text-xs font-medium text-white">{Math.round(value.isNegative * 100)}%</span>
                            </ProgressCircle>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })
              }
              {
                Object.values(myData.aspects).map((item: any) => {
                  return (
                    <Card className="shadow-md rounded-lg mx-auto max-w-md" decoration="left" decorationColor="blue">
                      {item.sentiment === "positive" ? (
                        <div>
                          <BadgeDelta deltaType="increase" isIncreasePositive={true}>
                            {item.value}
                          </BadgeDelta>
                          <span className="text-white">{item.target}</span>
                        </div>
                      ) : item.sentiment === "negative" ? (
                        <div>
                          <BadgeDelta deltaType="decrease" isIncreasePositive={true}>
                            {item.value}
                          </BadgeDelta>
                          <span className="text-white">{item.target}</span>
                        </div>
                      ) : (
                        <div>
                          <BadgeDelta deltaType="increase" isIncreasePositive={true}>
                            {item.value}
                          </BadgeDelta>
                          <span className="text-white">{item.target}</span>
                        </div>
                      )}
                      {item.sentiment === "positive" ? (
                        <Badge icon={RiCashFill} color="green">
                          {item.sentiment}
                        </Badge>
                      ) : item.sentiment === "negative" ? (
                        <Badge icon={RiCashFill} color="red">
                          {item.sentiment}
                        </Badge>
                      ) : (
                        <Badge icon={RiCashFill} color="blue">
                          {item.sentiment}
                        </Badge>
                      )}
                    </Card>
                  )
                })
              }
            </div>
          </div>

          <div className="text-white fixed right-10 xl:w-[420px] lg:w-[300px] md:w-[200px] w-[50px] flex flex-col gap-4">
            <img
              src="/checkup.png"
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
            <h1>Product title</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
              consequatur quidem expedita harum voluptatem dolores odio debitis
              officia nemo possimus velit porro reiciendis, cum libero iusto
              corrupti illo, reprehenderit veniam.
            </p>
          </div>
        </div>
      ) : (
        <div className="my-2 md:flex flex-row justify-between relative z-[20] mt-20">
          <form onSubmit={handleSubmit} className="md:w-[90%] mx-auto">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              URL
            </label>
            <div className="relative w-full">
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
              <button
                type="submit"
                className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
