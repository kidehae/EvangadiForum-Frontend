import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// import question page here
// import answer page here

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

      {/* <Route
        path="/postQuestion"
        element={
          <ProtectedRoute>
             <Layout>
                <QuestionPage />
            </Layout>
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/question/:questionId/answers"
        element={
          <ProtectedRoute>
            <Layout>
                <AnswerPage />
            </Layout>
          </ProtectedRoute>
        }
      /> */}

      {/* Public Route */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default Router;
