import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOTP from './pages/auth/VerifyOTP';
import ResetPassword from './pages/auth/ResetPassword';

// Layout & Protection
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';

// App Pages
import Products from './pages/products/Products';
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/EditProduct';
import ProductDetails from './pages/products/ProductDetails';
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <Routes>
          {/* Public Auth Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected Routes inside Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <Navigate to="/products" replace />
                </DashboardLayout>
              }
            />

            {/* Product Routes */}
            <Route
              path="/products"
              element={
                <DashboardLayout>
                  <Products />
                </DashboardLayout>
              }
            />
            <Route
              path="/products/create"
              element={
                <DashboardLayout>
                  <CreateProduct />
                </DashboardLayout>
              }
            />
            <Route
              path="/products/:id"
              element={
                <DashboardLayout>
                  <ProductDetails />
                </DashboardLayout>
              }
            />
            <Route
              path="/products/:id/edit"
              element={
                <DashboardLayout>
                  <EditProduct />
                </DashboardLayout>
              }
            />

            {/* Profile Route */}
            <Route
              path="/profile"
              element={
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
