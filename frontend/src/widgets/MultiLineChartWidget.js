import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function MultiLineChartWidget({ data }) {

  return (
    <div style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px"
    }}>

      <h4 style={{ color: "white" }}>
        Multi Line Chart
      </h4>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="value1" stroke="#38bdf8" />
          <Line type="monotone" dataKey="value2" stroke="#facc15" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}