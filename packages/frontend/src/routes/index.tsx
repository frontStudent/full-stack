import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Workspace = lazy(() => import("../pages/Workspace"));
const User = lazy(() => import("../pages/User"));

const routeList = [
  // { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/workspace", element: <Workspace /> },
  { path: "/user", element: <User /> },
];

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={""}>
        {/* 定义路由 */}
        <Routes>
          {routeList.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
