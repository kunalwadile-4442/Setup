// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ChangePassword from "./Pages/Auth/ChangePassword";
import Profile from "./Pages/Profile/Profile";
import { App_url } from "./utils/constants/static";
import Setting from "./Pages/Settings/settings";

function App() {
  return (
    <Routes>
      <Route path={App_url.link.INITIAL_URL} element={<Navigate to={App_url.link.DASHBOARD} />} />
      
      {/* Public Routes */}
      <Route path={App_url.link.LOGIN} element={<Login />} />
      <Route path={App_url.link.REGISTER} element={<Register />} />
      <Route path={App_url.link.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={App_url.link.RESET_PASSWORD} element={<ResetPassword />} />

      {/* Protected Routes (DefaultLayout-wrapped) */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path={App_url.link.DASHBOARD} element={<Dashboard />} />
        <Route path={App_url.link.CHANGE_PASSWORD} element={<ChangePassword />} />
         <Route path={App_url.link.SETTINGS} element={<Setting />} />
        <Route path={App_url.link.PROFILE} element={<Profile />} />
          <Route path={App_url.link.ADMIN_PROFILE} element={<Profile />} />
        <Route path={App_url.link.USER_PROFILE} element={<Profile />} />


      </Route>
    </Routes>
  );
}

export default App;
