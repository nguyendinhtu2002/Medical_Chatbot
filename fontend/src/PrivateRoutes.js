import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const token = window.localStorage.getItem("access_token");
    return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
