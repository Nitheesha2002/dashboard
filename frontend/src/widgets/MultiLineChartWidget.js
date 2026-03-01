import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const DEFAULT_SERIES = [
  { dataKey: "value1", name: "Series 1", stroke: "#38bdf8" },
  { dataKey: "value2", name: "Series 2", stroke: "#facc15" }
];

export default function MultiLineChartWidget({ data, series }) {
  const lines = series && series.length > 0 ? series : DEFAULT_SERIES;

  return (
    <div className="chart-widget">
      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data || []}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft", fill: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid #334155",
                borderRadius: "6px",
                color: "white"
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {lines.map((s) => (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.stroke}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}