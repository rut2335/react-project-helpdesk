import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loader from "./loading";
import { useEffect } from "react";

type RoleGuardProps = {
    allowedRoles: string[];
    children: React.ReactNode;
};

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated || !user) {
                navigate('/login');
                return;
            }
            if (!allowedRoles.includes(user.role)) {
                navigate('/404');
                return;
            }
        }
    }, [isAuthenticated, user, isLoading, navigate]);

    if (isLoading) {
        return <Loader />;
    }

    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
