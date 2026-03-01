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
          value={data[widget.metric] || "--"}
          unit={widget.unit}
        />
      );

    case "bar":
      return (
        <BarChartWidget data={widget.data || []} />
      );

    case "line":
      return (
        <LineChartWidget data={history} />
      );

    case "multiline":
      return (
        <MultiLineChartWidget data={history} />
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