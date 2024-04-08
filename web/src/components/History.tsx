"use client";
import axios from 'axios'
import React, { useEffect } from 'react'

const History = () => {
    const getData = async () => {
        const userId = sessionStorage.getItem("userId")
        try {
            const response = await axios.post(`/api/history`, {userId:userId});
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => { 
        getData();
    }, [])
  return (
    <div>History</div>
  )
}

export default History