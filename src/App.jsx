import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import MovieSearch from "./components/MovieSearch";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />
      <div className="max-w-6xl mx-auto p-6">{children}</div>
    </div>
  );
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <MovieSearch />
        </Layout>
      ),
    },
    {
      path: "/watchlist",
      element: (
        <Layout>
          <Watchlist />
        </Layout>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
