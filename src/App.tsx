import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ChangePassword from "./Pages/Auth/ChangePassword";
import Profile from "./Pages/Profile/Profile";
import { App_url } from "./utils/constants/static";
import Setting from "./Pages/Settings/settings";
import Authentication from "./Pages/Auth/Authentication";
import { useAppSelector } from "./app/hooks";

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLogin);

  // Public routes (login/register/etc.)
  const publicRoutes = [
    App_url.link.LOGIN,
    App_url.link.REGISTER,
    App_url.link.FORGOT_PASSWORD,
    App_url.link.RESET_PASSWORD,
    App_url.link.VERIFY_OTP
  ];

  // Protected routes (dashboard/etc.)
  const protectedRoutes = [
    { path: App_url.link.DASHBOARD, element: <Dashboard /> },
    { path: App_url.link.CHANGE_PASSWORD, element: <ChangePassword /> },
    { path: App_url.link.SETTINGS, element: <Setting /> },
    { path: App_url.link.PROFILE, element: <Profile /> },
    { path: App_url.link.ADMIN_PROFILE, element: <Profile /> },
    { path: App_url.link.USER_PROFILE, element: <Profile /> },
  ];

  // Helper function for public route rendering
  const renderPublicRoute = (path: string) => (
    <Route
      key={path}
      path={path}
      element={!isLoggedIn ? <Authentication /> : <Navigate to={App_url.link.DASHBOARD} />}
    />
  );

  return (
    <Routes>
      {/* Redirect initial URL */}
      <Route path={App_url.link.INITIAL_URL} element={<Navigate to={App_url.link.DASHBOARD} />} />

      {/* Render all public routes */}
      {publicRoutes.map((path) => renderPublicRoute(path))}

      {/* Protected Layout */}
      <Route
        path="/"
        element={isLoggedIn ? <DefaultLayout /> : <Navigate to={App_url.link.LOGIN} />}
      >
        {protectedRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? App_url.link.DASHBOARD : App_url.link.LOGIN} />}
      />
    </Routes>
  );
}

export default App;