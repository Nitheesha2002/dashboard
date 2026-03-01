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
          <Route path="/visibility" element={<Dashboard />} />
          <Route path="/forecast" element={<ForecastDashboard />} />
          <Route path="/rca" element={<Dashboard />} />
          <Route path="/cases" element={<Dashboard />} />
          <Route path="/knowledge" element={<Dashboard />} />
          <Route path="/governance" element={<Dashboard />} />
          <Route path="/support" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;