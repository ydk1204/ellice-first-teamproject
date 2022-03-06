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
      name: "여러번",
      빈도: `${age[7]}`,
      amt: 2400,
    },
    {
      name: "하루1번",
      빈도: `${age[6]}`,
      amt: 2210,
    },
    {
      name: "1주 5~6회",
      빈도: `${age[5]}`,
      amt: 2290,
    },
    {
      name: "1주 3~4회",
      빈도: `${age[4]}`,
      amt: 2000,
    },
    {
      name: "1주 1~2회",
      빈도: `${age[3]}`,
      amt: 2181,
    },
    {
      name: "월1~3회",
      빈도: `${age[2]}`,
      amt: 2500,
    },
    {
      name: "월1회",
      빈도: `${age[1]}`,
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
          <Bar dataKey="빈도" stackId="a" fill="#ffab91" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RenderBarChart;
