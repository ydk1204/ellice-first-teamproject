import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const RenderPieChart = (props) => {
  const w = props.w;
  const h = props.h;
  const d = props.data;

  const data = [
    { name: "5분 미만", value: d[1] },
    { name: "5분 이상 10분 미만", value: d[2] },
    { name: "10분 이상 30분 미만", value: d[3] },
    { name: "30분 이상 1시간 미만", value: d[4] },
    { name: "1시간 이상 2시간 미만", value: d[5] },
    { name: "2시간 이상", value: d[6] },
  ];

  return (
    <div style={{ width: w, height: h }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            // cx={200}
            // cy={200}
            // innerRadius={50}
            // outerRadius={100}
            dataKey="value"
            data={data}
            fill={props.color}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RenderPieChart;
