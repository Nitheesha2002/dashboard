import { Zap, Thermometer, Activity, Cpu, Battery } from "lucide-react";

const KPI_ICONS = {
  lightning: Zap,
  thermometer: Thermometer,
  sine: Activity,
  circuit: Cpu,
  battery: Battery
};

export default function KpiCard({ title, value, unit, statusText, icon }) {
  const IconComponent = icon ? KPI_ICONS[icon] || null : null;

  return (
    <div className="kpi-card">
      <div className="kpi-title">
        {IconComponent && <IconComponent size={18} className="kpi-title-icon" />}
        {title}
      </div>
      <div className="kpi-value">
        {value} {unit && <span className="kpi-unit">{unit}</span>}
      </div>
      {statusText && (
        <div className="kpi-status">{statusText}</div>
      )}
    </div>
  );
}