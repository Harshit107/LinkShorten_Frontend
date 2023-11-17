import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dashboard from "./pages/dashboard";
import Homepage from "./pages/homepage";
import Auth from "./pages/auth";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/dashboard',
    element: <Root />,
    children: [
      { path: '', index: true, element: <Dashboard /> }
    ]
  },
  {
    path: '/auth',
    element: <Auth />
  },

])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
