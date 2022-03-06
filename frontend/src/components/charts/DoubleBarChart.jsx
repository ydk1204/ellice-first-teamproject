import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DoubleBarChart = () => {
  const data = [
    {
      name: "넷플릭스",
      origin: 4549,
      common: 1894,
      amt: 2400,
    },
    {
      name: "웨이브",
      origin: 2180,
      common: 8241,
      amt: 2400,
    },
    {
      name: "티빙",
      origin: 2194,
      common: 7459,
      amt: 2400,
    },
    {
      name: "쿠팡플레이",
      origin: 163,
      common: 1235,
      amt: 2400,
    },
    {
      name: "왓챠",
      origin: 3715,
      common: 10161,
      amt: 2400,
    },
    {
      name: "디즈니+",
      origin: 1477,
      common: 124,
      amt: 2400,
    },
    {
      name: "seezn",
      origin: 383,
      common: 1369,
      amt: 2400,
    },
    {
      name: "라프텔",
      origin: 320,
      common: 1381,
      amt: 2400,
    },
  ];
  return (
    <ResponsiveContainer width={1000} height={500}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="origin" fill="#8884d8" background={{ fill: "#424242" }} />
        <Bar dataKey="common" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DoubleBarChart;
