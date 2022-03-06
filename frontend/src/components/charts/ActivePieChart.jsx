import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const ActivePieChart = (props) => {
  const noExp = props.noExp;
  const yesExp = props.yesExp;

  const data = [
    { name: "이용경험 없음", value: noExp },
    { name: "이용경험 있음", value: yesExp },
  ];
  const COLORS = ["#ff5252", "#00838f"];
  return (
    <div style={{ width: 400, height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={50}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivePieChart;
