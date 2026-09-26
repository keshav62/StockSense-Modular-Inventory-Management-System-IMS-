import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineCube, HiArrowLeft } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { authApi } from '../../services/authApi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateEmail } from '../../utils/validators';
import { APP_NAME } from '../../utils/constants';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.forgotPassword({ email });
      toast.success(res.data?.message || 'OTP sent to your email');
      // Pass email to next step via state
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to request password reset. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-2xl mb-4">
            <HiOutlineCube className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">{APP_NAME}</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors">
              <HiArrowLeft className="w-4 h-4 mr-1" /> Back to login
            </Link>
            <h2 className="text-xl font-semibold text-slate-900">Forgot Password</h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your email address and we'll send you a 6-digit OTP to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              id="forgot-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              error={error}
              icon={HiOutlineEnvelope}
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Send OTP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
