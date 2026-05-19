import React from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import AppShell from "./pages/AppShell.jsx";
import ControlPanel from "./pages/ControlPanel.jsx";
import Docs from "./pages/Docs.jsx";
import OverlayLeft from "./pages/OverlayLeft.jsx";
import OverlayMain from "./pages/OverlayMain.jsx";
import OverlayRight from "./pages/OverlayRight.jsx";
import Preview from "./pages/Preview.jsx";
import "./styles/overlay.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/control" replace /> },
      { path: "control", element: <ControlPanel /> },
      { path: "preview", element: <Preview /> },
      { path: "docs", element: <Docs /> },
    ],
  },
  { path: "/overlay/main", element: <OverlayMain /> },
  { path: "/overlay/left", element: <OverlayLeft /> },
  { path: "/overlay/right", element: <OverlayRight /> },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
