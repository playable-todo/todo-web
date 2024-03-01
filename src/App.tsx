import React from 'react';

import { Routes, Route } from "react-router-dom";

import Layout from './Layout';

// Import Routes all
import { publicRoutes, authProtectedRoutes } from "./routes";
import AuthCheck from './routes/route';

function App() {

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<>{route.component}</>}
            key={idx}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AuthCheck>
                <Layout>{route.component}</Layout>
              </AuthCheck>
            }
            key={idx}
          />
        ))}
      </Routes>
    </React.Fragment>
  )
}

export default App
