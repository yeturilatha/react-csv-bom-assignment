import { Routes, Route, NavLink } from "react-router-dom";
import CSVPage from "./pages/CSVPage";
import TreeTable from "./pages/TreeTable";
import "./App.css";

export default function App() {
  return (
    <div className="landing-wrapper">
      <Routes>
        {/* LANDING */}
        <Route
          path="/"
          element={
            <div className="landing">
              <h1>CSV Assignment</h1>
              <p className="landing-subtitle">
                Supplier comparison using CSV & hierarchical tables
              </p>

              <div className="landing-actions">
                <NavLink to="/csv" className="landing-card">
                  📊 CSV Table
                </NavLink>

                <NavLink to="/tree" className="landing-card">
                  🌳 Tree Table
                </NavLink>
              </div>
            </div>
          }
        />

        {/* EXISTING PAGES – UNTOUCHED */}
        <Route path="/csv" element={<CSVPage />} />
        <Route path="/tree" element={<TreeTable />} />
      </Routes>
    </div>
  );
}
