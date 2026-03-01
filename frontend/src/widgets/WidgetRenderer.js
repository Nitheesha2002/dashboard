import KpiCard from "../components/KpiCard";
import BarChartWidget from "./BarChartWidget";
import LineChartWidget from "./LineChartWidget";
import MultiLineChartWidget from "./MultiLineChartWidget";
import GaugeWidget from "./GaugeWidget";

export default function WidgetRenderer({
  widget,
  data,
  history
}) {

  switch (widget.type) {

    case "kpi":
      return (
        <KpiCard
          title={widget.title}
          value={widget.value != null ? widget.value : (data[widget.metric] ?? "--")}
          unit={widget.unit}
          statusText={widget.statusText}
          icon={widget.icon}
        />
      );

    case "bar":
      return (
        <BarChartWidget data={widget.data || []} />
      );

    case "line":
      return (
        <LineChartWidget data={widget.data || history} yAxisLabel={widget.yAxisLabel} />
      );

    case "multiline":
      return (
        <MultiLineChartWidget data={widget.data || history} series={widget.series} />
      );

    case "gauge":
      return (
        <GaugeWidget
          value={data[widget.metric] || 0}
        />
      );

    default:
      return null;
  }
}