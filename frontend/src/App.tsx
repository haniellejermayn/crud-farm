import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { AnimalsPage } from "./pages/AnimalsPage";
import { FarmersPage } from "./pages/FarmersPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/farmers" element={<FarmersPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
