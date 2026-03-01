import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function LineChartWidget({ data }) {

  return (
    <div className="chart-inner">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="time"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip />

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