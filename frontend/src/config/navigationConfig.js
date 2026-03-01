import { FaCog, FaFan, FaIndustry, FaBolt } from "react-icons/fa";

const navigationConfig = {

  monitor: {
    title: "NAVIGATOR",
    items: [
      { label: "Gearbox", icon: FaCog },
      { label: "Blade Pitch", icon: FaFan },
      { label: "Nacelle", icon: FaIndustry },
      { label: "Generator", icon: FaBolt }
    ]
  },

  forecast: {
    title: "FORECAST",
    items: [
      { label: "RUL Prediction", icon: FaCog },
      { label: "Failure Risk", icon: FaFan },
      { label: "Maintenance Window", icon: FaIndustry }
    ]
  }

};

export default navigationConfig;