import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const DiamondChart = () => {
  const data = [
    {
      subject: "넷플릭스",
      before_2008: 612,
      fullMark: 3000,
    },
    {
      subject: "웨이브",
      before_2008: 2503,
      fullMark: 3000,
    },
    {
      subject: "티빙",
      before_2008: 1173,
      fullMark: 3000,
    },
    {
      subject: "쿠팡플레이",
      before_2008: 341,
      fullMark: 3000,
    },
    {
      subject: "왓챠",
      before_2008: 2858,
      fullMark: 3000,
    },
    {
      subject: "디즈니+",
      before_2008: 528,
      fullMark: 3000,
    },
    {
      subject: "seezn",
      before_2008: 441,
      fullMark: 3000,
    },
    {
      subject: "라프텔",
      before_2008: 260,
      fullMark: 3000,
    },
  ];
  return (
    <div>
      <ResponsiveContainer width={500} height={500}>
        <RadarChart cx={250} cy={250} outerRadius={200} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 3000]} />
          <Radar
            name="before_2008"
            dataKey="before_2008"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiamondChart;
