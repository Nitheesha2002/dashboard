import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function BarChartWidget({ data }) {

  const colors = [
    "#38bdf8",  // blue (Blade 1)
    "#22d3ee",  // cyan (Blade 2)
    "#ec4899",  // pink (Blade 3)
    "#facc15",
    "#ef4444",
    "#a855f7"
  ];

  return (
    <div className="chart-widget">
      <div className="chart-area">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              label={{ value: "Mean Component Temp Coeff of Variation", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11 }}
            />

            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid #334155",
                borderRadius: "6px",
                color: "white"
              }}
            />

            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}