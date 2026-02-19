import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can replace this with a loading spinner later
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center text-primary">
        Loading...
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated, saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
