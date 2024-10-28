import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const LazyHeader = lazy(() => import("../Header"));
const LazyFooter = lazy(() => import("../Footer"));
const MastheadLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen justify-between bg-earth">
        <header>
          <LazyHeader />
        </header>
        <main className="mb-auto">
          <Outlet />
        </main>
        <footer>
          <LazyFooter />
        </footer>
      </div>
    </>
  );
};

export default MastheadLayout;
