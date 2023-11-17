import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Api from "./pages/api";
import Analytics from "./pages/analytics";

const router = createBrowserRouter([
  {
    path: '/', element: <Root />, children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'api', element: <Api /> },
      { path: 'analytics', element: <Analytics /> },
    ]
  },
  { path: '/auth', element: <Auth /> },

])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
