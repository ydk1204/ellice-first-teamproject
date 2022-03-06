import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const RenderPieChart = (props) => {
  const w = props.w;
  const h = props.h;
  const d = props.data;

  const data = [
    { name: "하루에도 여러번", value: d[1] },
    { name: "하루1번(매일)", value: d[2] },
    { name: "1주일에 5~6회", value: d[3] },
    { name: "1주일에 3~4회", value: d[4] },
    { name: "1주일에 1~2회", value: d[5] },
    { name: "월1~3회", value: d[6] },
    { name: "월1회", value: d[7] },
  ];

  return (
    <div style={{ width: w, height: h }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill={props.color} label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RenderPieChart;
