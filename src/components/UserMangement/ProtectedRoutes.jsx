// src/components/ProtectedRoutes.js
import withAuth from "./WithAuth";
import AdminDashboard from "../../pages/Admin"
import UserDashboard from "../../pages/User";

const ProtectedAdminDashboard = withAuth(AdminDashboard, "admin");
const ProtectedUserDashboard = withAuth(UserDashboard, "user");

export { ProtectedAdminDashboard, ProtectedUserDashboard };
