import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Dashboard from "./pages/Dashboard";
import ForecastDashboard from "./pages/ForecastDashboard";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitor" element={<Dashboard />} />
          <Route path="/forecast" element={<ForecastDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;