import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { AnimalsPage } from "./pages/AnimalsPage";
import { FarmersPage } from "./pages/FarmersPage";
import { FeedsPage } from "./pages/FeedsPage";
import { TasksPage } from "./pages/TasksPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/farmers" element={<FarmersPage />} />
          <Route path="/feeds" element={<FeedsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
