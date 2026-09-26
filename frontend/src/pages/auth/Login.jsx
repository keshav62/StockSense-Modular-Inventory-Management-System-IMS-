import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineCube } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateEmail } from '../../utils/validators';
import { APP_NAME } from '../../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      toast.success('Welcome back!');
      navigate('/products');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 w-full max-w-[420px] animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl mb-5 shadow-lg shadow-primary-500/30">
            <HiOutlineCube className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-outfit font-bold text-slate-900 tracking-tight">{APP_NAME}</h1>
          <p className="text-slate-500 mt-2 font-medium">Enterprise Inventory Management</p>
        </div>

        {/* Form Card */}
        <div className="glass-card">
          <div className="mb-8">
            <h2 className="text-2xl font-outfit font-semibold text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">Please enter your details to sign in.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              id="login-email"
              name="email"
              type="email"
              placeholder="admin@stocksense.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={HiOutlineEnvelope}
            />
            
            <div>
              <Input
                label="Password"
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={HiOutlineLockClosed}
                showPasswordToggle
              />
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-[13px] text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2 shadow-primary-500/25 shadow-lg" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-[13px] text-slate-500 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
