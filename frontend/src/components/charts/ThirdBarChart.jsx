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

const ThirdBarChart = (props) => {
  const dataset = props.data;

  const data = [
    {
      name: "연간 1회",
      2019: dataset[7],
      2020: dataset[15],
      2021: dataset[23],
      amt: 2100,
    },
    {
      name: "월 1회",
      2019: dataset[6],
      2020: dataset[14],
      2021: dataset[22],
      amt: 2500,
    },
    {
      name: "월 1~3회",
      2019: dataset[5],
      2020: dataset[13],
      2021: dataset[21],
      amt: 2181,
    },
    {
      name: "1주 1~2회",
      2019: dataset[4],
      2020: dataset[12],
      2021: dataset[20],
      amt: 2181,
    },
    {
      name: "1주 3~4회",
      2019: dataset[3],
      2020: dataset[11],
      2021: dataset[19],
      amt: 2000,
    },
    {
      name: "1주 5~6회",
      2019: dataset[2],
      2020: dataset[10],
      2021: dataset[18],
      amt: 2290,
    },
    {
      name: "하루1번",
      2019: dataset[1],
      2020: dataset[9],
      2021: dataset[17],
      amt: 2210,
    },
    {
      name: "여러번",
      2019: dataset[0],
      2020: dataset[8],
      2021: dataset[16],
      amt: 2400,
    },
  ];

  return (
    <ResponsiveContainer width={1200} height={600}>
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
        <Bar dataKey={2019} fill="#ffcc80" />
        <Bar dataKey={2020} fill="#ffab91" />
        <Bar dataKey={2021} fill="#80cbc4" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ThirdBarChart;
