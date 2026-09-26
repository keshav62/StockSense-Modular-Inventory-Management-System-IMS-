import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { authApi } from '../../services/authApi';
import PageContainer from '../../components/layout/PageContainer';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required' });
      return;
    }

    setLoading(true);
    try {
      await authApi.updateProfile({ name: formData.name });
      await refreshUser();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="My Profile"
      subtitle="Manage your account settings and preferences."
    >
      <div className="max-w-2xl card relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 p-2">
          <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-primary-500/10">
              <span className="text-4xl font-bold text-primary-700">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-outfit font-bold text-slate-900">{user?.name}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{user?.role}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="badge badge-success">Active Account</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <Input
              label="Full Name"
              id="profile-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              label="Email Address"
              id="profile-email"
              name="email"
              value={formData.email}
              disabled
              title="Email address cannot be changed"
              className="bg-slate-50/50 cursor-not-allowed text-slate-500 opacity-75"
            />
            <div className="pt-6 mt-6">
              <Button type="submit" variant="primary" loading={loading} className="px-8 shadow-md shadow-primary-500/20">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
