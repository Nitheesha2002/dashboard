export default function KpiCard({ title, value, unit }) {
  return (
    <div className="kpi-card">

      <div className="kpi-title">
        {title}
      </div>

      <div className="kpi-value">
        {value} {unit && <span className="kpi-unit">{unit}</span>}
      </div>

    </div>
  );
}