import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import QuestionPage from "./Pages/Question/QuestionPage";
import PostAnswer from "./Pages/Answer/Answer";

function Router() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/postQuestion"
        element={
          <ProtectedRoute>
            <Layout>
              <QuestionPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/question/:questionId"
        element={
          <ProtectedRoute>
            <Layout>
              <QuestionPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/question/:questionId/answers"
        element={
          <ProtectedRoute>
            <Layout>
              <PostAnswer />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Public fallback route */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default Router;
