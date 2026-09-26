import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { HiOutlineCube, HiArrowLeft } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { authApi } from '../../services/authApi';
import Button from '../../components/common/Button';
import { APP_NAME } from '../../utils/constants';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  // If no email in state, redirect to forgot password
  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow only one character
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous on backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const pastedArray = pastedData.split('');
    setOtp(pastedArray);
    inputRefs.current[5].focus();
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setResending(true);
    try {
      await authApi.forgotPassword({ email });
      toast.success('New OTP sent to your email');
      setCountdown(60);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.verifyOtp({ email, otp: otpString });
      toast.success('OTP verified successfully');
      navigate('/reset-password', {
        state: { email, resetToken: res.data.data.resetToken },
        replace: true
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
      // Clear OTP fields on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-2xl mb-4">
            <HiOutlineCube className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">{APP_NAME}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <button
              onClick={() => navigate('/forgot-password')}
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
            >
              <HiArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h2 className="text-xl font-semibold text-slate-900">Enter OTP</h2>
            <p className="text-sm text-slate-500 mt-1">
              We've sent a 6-digit code to <span className="font-medium text-slate-800">{email}</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white"
                  maxLength={1}
                />
              ))}
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Verify OTP
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || resending}
                className={`font-medium ${
                  countdown > 0
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-primary-600 hover:text-primary-700'
                }`}
              >
                {resending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
