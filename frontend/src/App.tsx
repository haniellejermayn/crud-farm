import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { AnimalList } from "./pages/animals/AnimalList";
// Import other list and form components as you create them

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/animals" element={<AnimalList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
