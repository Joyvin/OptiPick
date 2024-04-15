"use client";
import axios from "axios";
import { time } from "console";
import { ChevronLeft, HistoryIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HistoryItem from "./HistoryItem";

const History = () => {
  const [resArr, setResArr] = useState([]);
  const [showData, setShowData] = useState(false);

  const getData = async () => {
    const userId = sessionStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:3000/api/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await response.json();
      console.log(data);
      setResArr(data.res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const submitnext = (i) => {
    const id = sessionStorage.getItem("userId");
    sessionStorage.clear();
    sessionStorage.setItem("userId", id);
    const str = JSON.stringify(resArr[i]);
    sessionStorage.setItem("newData", str);
    setShowData(true);
  };

  const goBack = () => {
    const id = sessionStorage.getItem("userId");
    sessionStorage.clear();
    sessionStorage.setItem("userId", id);
    setShowData(false);
  };

  //   const resArr = [
  //     {
  //       name: "Colgate MaxFresh Toothpaste, Red Gel Paste with Menthol for Super Fresh Breath, 600g, 150g X 4 (Spicy Fresh) (Combo Pack)",
  //       link: "https://www.amazon.in/Colgate-Max-Fresh-Spicy-Toothpaste/dp/B01NAZBI08/ref=sr_1_4_sspa?crid=V4SV0X83S4S&dib=eyJ2IjoiMSJ9.UlK0dGUmfNyb7ShewyJ0nSr83TckOJAvrsMapGLIfKediUll1AHLGAI7EDifkkqOmNI16x2KuQhyaa52UULqFZ7CJbNthaEllvL6-lPbqyS-a_JTxdAj3SoKptXgsLrI8JvmRLBviN8Y4G8rok0pfHS1JLPu_eZF1w1zGGYRV1OyTsrMYtXLk2a2ItrTEWgTOXfvXvxr85qTr6AJJ4AI8th6Z7sh6koiUkertGsowJ2tY3ZHKvhZh8Dc_9OtrJGl8XG6_oHJ29qjhCW2hM4FxRJ86riJNc1ZDCteIMf3BPs.La6rrQ9wtLemKAlDCQoRl3_asQ779DbjHoDjxCdZP-A&dib_tag=se&keywords=toothpaste&qid=1712862425&sprefix=toot%2Caps%2C229&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
  //       data: [
  //         {
  //           overall: {
  //             p: 0.8065384615384616,
  //             n: 0.01230769230769231,
  //             nt: 0.17961538461538465,
  //           },
  //           datas: [
  //             {
  //               "0": {
  //                 sentence:
  //                   "Very refreshing like a mouth freshener toothpaste seriously guys and also cleans your deepenly and whitening the teeth also go for it",
  //                 isPositive: 0.95,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.05,
  //                 opinion: [],
  //               },
  //               "1": {
  //                 sentence:
  //                   "The item purchased by this time has paid it's price with authentic cleaning capabilities and charming feeling even after a long time. ",
  //                 isPositive: 0.91,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [
  //                   {
  //                     target: "cleaning capabilities",
  //                     assessment: [
  //                       { value: "authentic", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "2": {
  //                 sentence: "Better to try it. ",
  //                 isPositive: 0.54,
  //                 isNegative: 0.03,
  //                 isNeutral: 0.42,
  //                 opinion: [],
  //               },
  //               "3": {
  //                 sentence: "My suggestion to all valued customers.",
  //                 isPositive: 0.45,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.54,
  //                 opinion: [],
  //               },
  //               "4": {
  //                 sentence:
  //                   "Great experience with the brand and value for money too.",
  //                 isPositive: 1.0,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "experience",
  //                     assessment: [
  //                       { value: "Great", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "5": {
  //                 sentence: "Good. ",
  //                 isPositive: 0.9,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [],
  //               },
  //               "6": {
  //                 sentence: "Colgate is best for teeth,",
  //                 isPositive: 0.89,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.09,
  //                 opinion: [
  //                   {
  //                     target: "Colgate",
  //                     assessment: [
  //                       { value: "best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "7": {
  //                 sentence: "Good product",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "product",
  //                     assessment: [
  //                       { value: "Good", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "8": {
  //                 sentence: "good",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [],
  //               },
  //               "9": {
  //                 sentence: "Just okay",
  //                 isPositive: 0.85,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.13,
  //                 opinion: [],
  //               },
  //               "10": {
  //                 sentence: "Best quality",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [
  //                   {
  //                     target: "quality",
  //                     assessment: [
  //                       { value: "Best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "11": {
  //                 sentence: "Rich taste. ",
  //                 isPositive: 0.47,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.51,
  //                 opinion: [
  //                   {
  //                     target: "taste",
  //                     assessment: [
  //                       { value: "Rich", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "12": {
  //                 sentence: "Full of mint. ",
  //                 isPositive: 0.13,
  //                 isNegative: 0.03,
  //                 isNeutral: 0.84,
  //                 opinion: [],
  //               },
  //               "13": {
  //                 sentence: "Value for money.",
  //                 isPositive: 0.94,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.05,
  //                 opinion: [],
  //               },
  //               "14": {
  //                 sentence: "ok",
  //                 isPositive: 0.51,
  //                 isNegative: 0.04,
  //                 isNeutral: 0.45,
  //                 opinion: [],
  //               },
  //             },
  //             {
  //               "0": {
  //                 sentence:
  //                   "Very refreshing like a mouth freshener toothpaste seriously guys and also cleans your deepenly and whitening the teeth also go for it",
  //                 isPositive: 0.95,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.05,
  //                 opinion: [],
  //               },
  //               "1": {
  //                 sentence:
  //                   "The item purchased by this time has paid it's price with authentic cleaning capabilities and charming feeling even after a long time. ",
  //                 isPositive: 0.91,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [
  //                   {
  //                     target: "cleaning capabilities",
  //                     assessment: [
  //                       { value: "authentic", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "2": {
  //                 sentence: "Better to try it. ",
  //                 isPositive: 0.54,
  //                 isNegative: 0.03,
  //                 isNeutral: 0.42,
  //                 opinion: [],
  //               },
  //               "3": {
  //                 sentence: "My suggestion to all valued customers.",
  //                 isPositive: 0.45,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.54,
  //                 opinion: [],
  //               },
  //               "4": {
  //                 sentence:
  //                   "Great experience with the brand and value for money too.",
  //                 isPositive: 1.0,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "experience",
  //                     assessment: [
  //                       { value: "Great", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "5": {
  //                 sentence: "Good. ",
  //                 isPositive: 0.9,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [],
  //               },
  //               "6": {
  //                 sentence: "Colgate is best for teeth,",
  //                 isPositive: 0.89,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.09,
  //                 opinion: [
  //                   {
  //                     target: "Colgate",
  //                     assessment: [
  //                       { value: "best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "7": {
  //                 sentence: "Good product",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "product",
  //                     assessment: [
  //                       { value: "Good", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "8": {
  //                 sentence: "good",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [],
  //               },
  //               "9": {
  //                 sentence: "Just okay",
  //                 isPositive: 0.85,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.13,
  //                 opinion: [],
  //               },
  //               "10": {
  //                 sentence: "Best quality",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [
  //                   {
  //                     target: "quality",
  //                     assessment: [
  //                       { value: "Best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             },
  //           ],
  //           aspects: [
  //             {
  //               value: "authentic",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "cleaning capabilities",
  //             },
  //             {
  //               value: "Great",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "experience",
  //             },
  //             {
  //               value: "best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "Colgate",
  //             },
  //             {
  //               value: "Good",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "product",
  //             },
  //             {
  //               value: "Best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "quality",
  //             },
  //             {
  //               value: "Rich",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "taste",
  //             },
  //             {
  //               value: "authentic",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "cleaning capabilities",
  //             },
  //             {
  //               value: "Great",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "experience",
  //             },
  //             {
  //               value: "best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "Colgate",
  //             },
  //             {
  //               value: "Good",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "product",
  //             },
  //             {
  //               value: "Best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "quality",
  //             },
  //           ],
  //           nps: 10,
  //         },
  //       ],
  //       time: "04/11/2024, 22:16:39",
  //       id: "abdowb",
  //       img: "https://m.media-amazon.com/images/I/51c+RwHEvsL._SY300_SX300_.jpg",
  //     },
  //     {
  //       name: "Sensodyne Toothpaste Complete Protection sensitive",
  //       link: "https://www.amazon.in/Sensodyne-Toothpaste-Complete-Protection-sensitive/dp/B0BLNDYZXD/ref=sr_1_3_sspa?crid=V4SV0X83S4S&dib=eyJ2IjoiMSJ9.UlK0dGUmfNyb7ShewyJ0nSr83TckOJAvrsMapGLIfKediUll1AHLGAI7EDifkkqOmNI16x2KuQhyaa52UULqFZ7CJbNthaEllvL6-lPbqyS-a_JTxdAj3SoKptXgsLrI8JvmRLBviN8Y4G8rok0pfHS1JLPu_eZF1w1zGGYRV1OyTsrMYtXLk2a2ItrTEWgTOXfvXvxr85qTr6AJJ4AI8th6Z7sh6koiUkertGsowJ2tY3ZHKvhZh8Dc_9OtrJGl8XG6_oHJ29qjhCW2hM4FxRJ86riJNc1ZDCteIMf3BPs.La6rrQ9wtLemKAlDCQoRl3_asQ779DbjHoDjxCdZP-A&dib_tag=se&keywords=toothpaste&qid=1712862425&sprefix=toot%2Caps%2C229&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
  //       data: [
  //         {
  //           overall: {
  //             p: 0.8065384615384616,
  //             n: 0.01230769230769231,
  //             nt: 0.17961538461538465,
  //           },
  //           datas: [
  //             {
  //               "0": {
  //                 sentence:
  //                   "Very refreshing like a mouth freshener toothpaste seriously guys and also cleans your deepenly and whitening the teeth also go for it",
  //                 isPositive: 0.95,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.05,
  //                 opinion: [],
  //               },
  //               "1": {
  //                 sentence:
  //                   "The item purchased by this time has paid it's price with authentic cleaning capabilities and charming feeling even after a long time. ",
  //                 isPositive: 0.91,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [
  //                   {
  //                     target: "cleaning capabilities",
  //                     assessment: [
  //                       { value: "authentic", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "2": {
  //                 sentence: "Better to try it. ",
  //                 isPositive: 0.54,
  //                 isNegative: 0.03,
  //                 isNeutral: 0.42,
  //                 opinion: [],
  //               },
  //               "3": {
  //                 sentence: "My suggestion to all valued customers.",
  //                 isPositive: 0.45,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.54,
  //                 opinion: [],
  //               },
  //               "4": {
  //                 sentence:
  //                   "Great experience with the brand and value for money too.",
  //                 isPositive: 1.0,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "experience",
  //                     assessment: [
  //                       { value: "Great", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "5": {
  //                 sentence: "Good. ",
  //                 isPositive: 0.9,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [],
  //               },
  //               "6": {
  //                 sentence: "Colgate is best for teeth,",
  //                 isPositive: 0.89,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.09,
  //                 opinion: [
  //                   {
  //                     target: "Colgate",
  //                     assessment: [
  //                       { value: "best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "7": {
  //                 sentence: "Good product",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "product",
  //                     assessment: [
  //                       { value: "Good", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "8": {
  //                 sentence: "good",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [],
  //               },
  //               "9": {
  //                 sentence: "Just okay",
  //                 isPositive: 0.85,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.13,
  //                 opinion: [],
  //               },
  //               "10": {
  //                 sentence: "Best quality",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [
  //                   {
  //                     target: "quality",
  //                     assessment: [
  //                       { value: "Best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "11": {
  //                 sentence: "Rich taste. ",
  //                 isPositive: 0.47,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.51,
  //                 opinion: [
  //                   {
  //                     target: "taste",
  //                     assessment: [
  //                       { value: "Rich", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "12": {
  //                 sentence: "Full of mint. ",
  //                 isPositive: 0.13,
  //                 isNegative: 0.03,
  //                 isNeutral: 0.84,
  //                 opinion: [],
  //               },
  //               "13": {
  //                 sentence: "Value for money.",
  //                 isPositive: 0.94,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.05,
  //                 opinion: [],
  //               },
  //               "14": {
  //                 sentence: "ok",
  //                 isPositive: 0.51,
  //                 isNegative: 0.04,
  //                 isNeutral: 0.45,
  //                 opinion: [],
  //               },
  //             },
  //             {
  //               "0": {
  //                 sentence:
  //                   "Very refreshing like a mouth freshener toothpaste seriously guys and also cleans your deepenly and whitening the teeth also go for it",
  //                 isPositive: 0.95,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.05,
  //                 opinion: [],
  //               },
  //               "1": {
  //                 sentence:
  //                   "The item purchased by this time has paid it's price with authentic cleaning capabilities and charming feeling even after a long time. ",
  //                 isPositive: 0.91,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [
  //                   {
  //                     target: "cleaning capabilities",
  //                     assessment: [
  //                       { value: "authentic", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "2": {
  //                 sentence: "Better to try it. ",
  //                 isPositive: 0.54,
  //                 isNegative: 0.03,
  //                 isNeutral: 0.42,
  //                 opinion: [],
  //               },
  //               "3": {
  //                 sentence: "My suggestion to all valued customers.",
  //                 isPositive: 0.45,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.54,
  //                 opinion: [],
  //               },
  //               "4": {
  //                 sentence:
  //                   "Great experience with the brand and value for money too.",
  //                 isPositive: 1.0,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "experience",
  //                     assessment: [
  //                       { value: "Great", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "5": {
  //                 sentence: "Good. ",
  //                 isPositive: 0.9,
  //                 isNegative: 0.01,
  //                 isNeutral: 0.08,
  //                 opinion: [],
  //               },
  //               "6": {
  //                 sentence: "Colgate is best for teeth,",
  //                 isPositive: 0.89,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.09,
  //                 opinion: [
  //                   {
  //                     target: "Colgate",
  //                     assessment: [
  //                       { value: "best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "7": {
  //                 sentence: "Good product",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.0,
  //                 opinion: [
  //                   {
  //                     target: "product",
  //                     assessment: [
  //                       { value: "Good", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               "8": {
  //                 sentence: "good",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [],
  //               },
  //               "9": {
  //                 sentence: "Just okay",
  //                 isPositive: 0.85,
  //                 isNegative: 0.02,
  //                 isNeutral: 0.13,
  //                 opinion: [],
  //               },
  //               "10": {
  //                 sentence: "Best quality",
  //                 isPositive: 0.99,
  //                 isNegative: 0.0,
  //                 isNeutral: 0.01,
  //                 opinion: [
  //                   {
  //                     target: "quality",
  //                     assessment: [
  //                       { value: "Best", sentiment: "positive", score: 1.0 },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             },
  //           ],
  //           aspects: [
  //             {
  //               value: "authentic",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "cleaning capabilities",
  //             },
  //             {
  //               value: "Great",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "experience",
  //             },
  //             {
  //               value: "best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "Colgate",
  //             },
  //             {
  //               value: "Good",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "product",
  //             },
  //             {
  //               value: "Best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "quality",
  //             },
  //             {
  //               value: "Rich",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "taste",
  //             },
  //             {
  //               value: "authentic",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "cleaning capabilities",
  //             },
  //             {
  //               value: "Great",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "experience",
  //             },
  //             {
  //               value: "best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "Colgate",
  //             },
  //             {
  //               value: "Good",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "product",
  //             },
  //             {
  //               value: "Best",
  //               sentiment: "positive",
  //               score: 1.0,
  //               target: "quality",
  //             },
  //           ],
  //           nps: 10,
  //         },
  //       ],
  //       time: "09/11/2024, 22:16:39",
  //       id: "kjcnekeh",
  //     },
  //   ];

  return (
    <div className="z-[20] relative">
      <div className="text-[30px] text-white font-bold mt-[10px] mb-[15px]">
        History
      </div>

      {showData ? (
        <div>
          <button onClick={goBack}>
            <ChevronLeft />
            Back
          </button>
          <HistoryItem />
        </div>
      ) : (
        <div className="w-full p-6 py-3 border rounded-lg shadow border-gray-700">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {resArr.map((values, i) => {
              // Split the values.time outside of JSX
              let splitString = values.time.split(",");
              return (
                <li key={i}>
                  <button onClick={() => submitnext(i)} className="">
                    <div className="my-4 flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={values.image}
                          width={40}
                          height={40}
                          className="rounded-md"
                          alt="Image"
                        />
                      </div>
                      <div className="flex-1 min-w-0 mx-5">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {values.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {values.image}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <div>
                          {/* Use the split values inside JSX */}
                          <div>{splitString[0]}</div>
                          <div className="text-xs font-light">
                            {splitString[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default History;
