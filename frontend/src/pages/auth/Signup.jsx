import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser, HiOutlineCube } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateEmail, validatePassword } from '../../utils/validators';
import { APP_NAME } from '../../utils/constants';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 number and 1 letter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await signup(formData);
      toast.success('Account created successfully!');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse-slow"></div>

      <div className="relative z-10 w-full max-w-[420px] animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl mb-5 shadow-lg shadow-primary-500/30 hover:scale-105 transition-transform cursor-pointer">
            <HiOutlineCube className="w-8 h-8 text-white" />
          </Link>
          <h1 className="text-3xl font-outfit font-bold text-slate-900 tracking-tight">Join {APP_NAME}</h1>
          <p className="text-slate-500 mt-2 font-medium">Create your account to get started</p>
        </div>

        {/* Form Card */}
        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              id="signup-name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={HiOutlineUser}
            />
            <Input
              label="Email Address"
              id="signup-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={HiOutlineEnvelope}
            />
            <Input
              label="Password"
              id="signup-password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={HiOutlineLockClosed}
              showPasswordToggle
            />

            <div className="pt-2">
              <Button type="submit" loading={loading} className="w-full shadow-primary-500/25 shadow-lg" size="lg">
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-[13px] text-slate-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
