import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineCube } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { authApi } from '../../services/authApi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validatePassword, getPasswordStrength } from '../../utils/validators';
import { APP_NAME } from '../../utils/constants';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const resetToken = location.state?.resetToken;

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  // If no token in state, redirect to login
  if (!email || !resetToken) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const passwordErrors = validatePassword(formData.password);
    if (!formData.password) newErrors.password = 'Password is required';
    else if (passwordErrors.length > 0) newErrors.password = `Missing: ${passwordErrors.join(', ')}`;

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await authApi.resetPassword({
        email,
        resetToken,
        newPassword: formData.password
      });
      toast.success('Password reset successfully! Please login with your new password.');
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
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
            <h2 className="text-xl font-semibold text-slate-900">Create New Password</h2>
            <p className="text-sm text-slate-500 mt-1">
              Your new password must be different from previously used passwords.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="New Password"
                id="reset-password"
                name="password"
                type="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={HiOutlineLockClosed}
                showPasswordToggle
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength.level ? passwordStrength.color : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${
                    passwordStrength.level === 1 ? 'text-red-500' :
                    passwordStrength.level === 2 ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>
            <Input
              label="Confirm New Password"
              id="reset-confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={HiOutlineLockClosed}
              showPasswordToggle
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
