import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthForm from "./pages/AuthForm";
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes Wrapper */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/sign-up" element={<AuthForm />} />
        </Route>

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoutes />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
