"use client";
import React, { useState } from "react";
import { AreaChart, BarChart } from "@tremor/react";
import { RiRefreshLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { Search } from "lucide-react";
import Image from "next/image";

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
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
  {
    date: "Jul 22",
    SemiAnalysis: 3490,
    "The Pragmatic Engineer": 1982,
  },
  {
    date: "Aug 22",
    SemiAnalysis: 2903,
    "The Pragmatic Engineer": 2012,
  },
  {
    date: "Sep 22",
    SemiAnalysis: 2643,
    "The Pragmatic Engineer": 2342,
  },
  {
    date: "Oct 22",
    SemiAnalysis: 2837,
    "The Pragmatic Engineer": 2473,
  },
  {
    date: "Nov 22",
    SemiAnalysis: 2954,
    "The Pragmatic Engineer": 3848,
  },
  {
    date: "Dec 22",
    SemiAnalysis: 3239,
    "The Pragmatic Engineer": 3736,
  },
];

const chartdata2 = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
  {
    name: "Ferns",
    "Number of threatened species": 281,
  },
  {
    name: "Arachnids",
    "Number of threatened species": 251,
  },
  {
    name: "Corals",
    "Number of threatened species": 232,
  },
  {
    name: "Algae",
    "Number of threatened species": 98,
  },
];

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

type Props = {};

const page = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [showData, setShowData] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.target.reset();
    setShowData(true);
  };
  return (
    <div className="">
      {showData ? (
        <div
          className={`grid md:grid-cols-3 grid-cols-1 relative z-[20] mt-20`}
        >
          <div className="col-span-2 ">
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
            <div className="grid grid-cols-2 gap-3">
              <div className="shadow-md rounded-md bg-transparent m-4">
                <AreaChart
                  className=""
                  data={chartdata1}
                  index="date"
                  categories={["SemiAnalysis", "The Pragmatic Engineer"]}
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
                  categories={["Number of threatened species"]}
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
              <div>
                <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  donut variant 2
                </span>
                <DonutChart
                  data={datahero}
                  variant="pie"
                  valueFormatter={dataFormatter}
                  onValueChange={(v) => console.log(v)}
                />
              </div>
            </div>
          </div>

          <div className="text-white">
            <Image
              src="/web/public/checker.png"
              height={100}
              width={100}
              alt=""
            />
            <h1>Product Name </h1>
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
