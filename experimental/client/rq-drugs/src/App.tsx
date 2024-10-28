import React, { Suspense } from "react";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import DrugList from "./components/DrugList/";
import DrugDetail from "./components/DrugDetail";

import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import MastheadLayout from "./components/Layout/MastheadLayout";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MastheadLayout />}>
          <Route index element={<DrugList />} />
          <Route path="/:id" element={<DrugDetail />} />
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
