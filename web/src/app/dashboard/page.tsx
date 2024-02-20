"use client";
import React, { useState } from 'react'
import { AreaChart, BarChart } from '@tremor/react';
import { RiRefreshLine } from '@remixicon/react';
import { Button } from '@tremor/react';
import { DonutChart } from '@tremor/react';
import styles from "@/styles/styles.module.css";

const datahero = [
  {
    name: 'Noche Holding AG',
    value: 9800,
  },
  {
    name: 'Rain Drop AG',
    value: 4567,
  },
  {
    name: 'Push Rail AG',
    value: 3908,
  },
  {
    name: 'Flow Steal AG',
    value: 2400,
  },
  {
    name: 'Tiny Loop Inc.',
    value: 2174,
  },
  {
    name: 'Anton Resorts Holding',
    value: 1398,
  },
];

const chartdata1 = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
  {
    date: 'Jul 22',
    SemiAnalysis: 3490,
    'The Pragmatic Engineer': 1982,
  },
  {
    date: 'Aug 22',
    SemiAnalysis: 2903,
    'The Pragmatic Engineer': 2012,
  },
  {
    date: 'Sep 22',
    SemiAnalysis: 2643,
    'The Pragmatic Engineer': 2342,
  },
  {
    date: 'Oct 22',
    SemiAnalysis: 2837,
    'The Pragmatic Engineer': 2473,
  },
  {
    date: 'Nov 22',
    SemiAnalysis: 2954,
    'The Pragmatic Engineer': 3848,
  },
  {
    date: 'Dec 22',
    SemiAnalysis: 3239,
    'The Pragmatic Engineer': 3736,
  },
];

const chartdata2 = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
  {
    name: 'Ferns',
    'Number of threatened species': 281,
  },
  {
    name: 'Arachnids',
    'Number of threatened species': 251,
  },
  {
    name: 'Corals',
    'Number of threatened species': 232,
  },
  {
    name: 'Algae',
    'Number of threatened species': 98,
  },
];

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

type Props = {}

const page = (props: Props) => {
  const [displayForm, setDisplayForm] = useState('flex');
  const [inputValue, setInputValue] = useState('');
  const [showData, setShowData] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDisplayForm('hidden');
    setShowData(true);
  };
  return (
    <div className=''>
      <div className={`${displayForm} ${styles.container} relative z-[20] mt-20 flex flex-col`}>
        <h1 className={`${styles.title} text-white`}>Product Review Analysis</h1>
        <input
          type="text"
          value={inputValue}
          className={styles.input}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL"
        />
        <button onClick={handleSubmit} className={`${styles.button} text-white`}>Submit</button>
      </div>
      {
        showData && (
          <div className={`grid md:grid-cols-3 grid-cols-1 relative z-[20] mt-20`}>
            <div className='shadow-md rounded-md bg-transparent m-4'>
              <AreaChart
                className=""
                data={chartdata1}
                index="date"
                categories={['SemiAnalysis', 'The Pragmatic Engineer']}
                colors={['indigo', 'rose']}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
              />
            </div>
            <div className='shadow-md rounded-md bg-transparent m-4'>
              <BarChart
                data={chartdata2}
                index="name"
                categories={['Number of threatened species']}
                colors={['blue']}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
                onValueChange={(v) => console.log(v)}
              />
            </div>
            <Button>
              <RiRefreshLine />
              Refresh
            </Button>
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
        )
      }
    </div>
  )
}

export default page