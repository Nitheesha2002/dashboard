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
    "#38bdf8",  // blue
     "#22c55e",  // green
      "#a855f7",   // purple
    "#facc15",  // yellow
    "#ef4444",  // red
    "#a855f7"   // purple
  ];

  return (
    <div className="chart-widget">

      <h4 className="widget-title">
        DATA ANALYSIS
      </h4>

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