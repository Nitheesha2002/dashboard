import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from "recharts";

export default function GaugeWidget({ value }) {

  const data = [
    {
      name: "Failure",
      value: value,
      fill:
        value > 80
          ? "#ef4444"
          : value > 60
          ? "#facc15"
          : "#22c55e"
    }
  ];

  return (
    <div className="chart-inner">

      <h4 className="widget-title">
        Failure Probability
      </h4>

      <ResponsiveContainer width="100%" height="85%">
        <RadialBarChart
          data={data}
          innerRadius="70%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
        >

          {/* hides ticks */}
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            dataKey="value"
            cornerRadius={10}
          />

        </RadialBarChart>
      </ResponsiveContainer>

      <div className="gauge-value">
        {value}%
      </div>

    </div>
  );
}