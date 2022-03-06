import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MixBarChart = () => {
  const data = [
    {
      name: "넷플릭스",
      드라마: 1906,
      다큐: 293,
      예능: 321,
      애니: 752,
    },
    {
      name: "웨이브",
      드라마: 2735,
      다큐: 27,
      예능: 608,
      애니: 743,
    },
    {
      name: "티빙",
      드라마: 1325,
      다큐: 44,
      예능: 1188,
      애니: 781,
    },
    {
      name: "쿠팡플레이",
      드라마: 323,
      다큐: 57,
      예능: 46,
      애니: 160,
    },
    {
      name: "왓챠",
      드라마: 1884,
      다큐: 419,
      예능: 604,
      애니: 1112,
    },
    {
      name: "디즈니+",
      드라마: 398,
      다큐: 91,
      예능: 25,
      애니: 206,
    },
    {
      name: "seezn",
      드라마: 288,
      다큐: 1,
      예능: 107,
      애니: 10,
    },
    {
      name: "라프텔",
      드라마: 0,
      다큐: 0,
      예능: 0,
      애니: 1285,
    },
  ];

  return (
    <ResponsiveContainer width={1000} height={650}>
      <BarChart
        width={500}
        height={800}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="드라마" stackId="a" fill="#ffcdd2" />
        <Bar dataKey="다큐" stackId="a" fill="#ffd180" />
        <Bar dataKey="예능" stackId="a" fill="#ff9e80" />
        <Bar dataKey="애니" stackId="a" fill="#b2ebf2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MixBarChart;
