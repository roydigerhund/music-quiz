import { Router } from "@reach/router";
import React from "react";
import { Root, Routes } from "react-static";
import "./dist.css";

const App = () => {
  return (
    <Root>
      <div>
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
