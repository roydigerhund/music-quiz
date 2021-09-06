import { Router } from "@reach/router";
import React from "react";
import { Root, Routes } from "react-static";
import "./dist.css";

const App = () => {
  return (
    <Root>
      <div className="bg-indigo-600 min-h-screen text-white">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
};

export default App;
