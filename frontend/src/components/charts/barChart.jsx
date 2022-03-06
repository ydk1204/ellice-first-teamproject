import React from "react";
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

const RenderBarChart = (props) => {
  const w = props.w;
  const h = props.h;

  const age = props.age;

  const data = [
    {
      name: "5분 미만",
      시간: `${age[1]}`,
      amt: 2400,
    },
    {
      name: "10분 미만",
      시간: `${age[2]}`,
      amt: 2210,
    },
    {
      name: "30분 미만",
      시간: `${age[3]}`,
      amt: 2290,
    },
    {
      name: "1시간 미만",
      시간: `${age[4]}`,
      amt: 2000,
    },
    {
      name: "2시간 미만",
      시간: `${age[5]}`,
      amt: 2181,
    },
    {
      name: "2시간 이상",
      시간: `${age[6]}`,
      amt: 2500,
    },
  ];

  return (
    <div>
      <ResponsiveContainer width={w} height={h}>
        <BarChart
          width={w}
          height={h}
          data={data}
          margin={{
            top: 20,
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
          <Bar dataKey="시간" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RenderBarChart;
