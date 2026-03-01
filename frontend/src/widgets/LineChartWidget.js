import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function LineChartWidget({ data, yAxisLabel }) {

  return (
    <div className="chart-inner">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data || []}>

          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11 } : undefined}
          />

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #334155",
              borderRadius: "6px",
              color: "white"
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}