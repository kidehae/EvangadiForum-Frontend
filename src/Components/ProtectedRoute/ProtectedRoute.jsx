import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import { Spinner } from "react-bootstrap";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/signIn");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
