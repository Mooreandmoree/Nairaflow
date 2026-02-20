import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, uploadProfilePhoto } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`,
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`,
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      await uploadProfilePhoto(file);
      toast.success('Profile photo updated!');
    } catch (error) {
      toast.error(error.message || 'Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  const getInitials = () => {
    const first = user?.firstName?.[0] || user?.fullName?.[0] || 'U';
    const last = user?.lastName?.[0] || user?.fullName?.split(' ')[1]?.[0] || '';
    return (first + last).toUpperCase();
  };

  const getProfileImage = () => {
    if (user?.profilePhoto) {
      // If it starts with http, use directly, otherwise prepend backend URL
      if (user.profilePhoto.startsWith('http')) {
        return user.profilePhoto;
      }
      return `http://localhost:8081${user.profilePhoto}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          <div className="glass-card p-8">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              {/* Profile Photo */}
              <div className="relative group">
                <div
                  onClick={handlePhotoClick}
                  className="w-28 h-28 rounded-full overflow-hidden cursor-pointer relative border-4 border-neon/30 hover:border-neon transition-colors"
                >
                  {getProfileImage() ? (
                    <img
                      src={getProfileImage()}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center text-4xl font-bold text-dark">
                      {getInitials()}
                    </div>
                  )}

                  {/* Upload Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isUploading ? (
                      <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                {/* Camera Badge */}
                <button
                  onClick={handlePhotoClick}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-neon rounded-full flex items-center justify-center text-dark shadow-lg hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* User Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`}
                </h2>
                <p className="text-gray-400">{user?.email}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                    ✓ Verified
                  </span>
                  <span className="inline-block px-3 py-1 bg-neon/20 text-neon text-sm rounded-full">
                    {user?.role || 'USER'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click on your photo to change it
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-6"></div>

            {/* Profile Info */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-neon border border-neon rounded-lg hover:bg-neon/10 transition-colors text-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-400 border border-gray-600 rounded-lg hover:bg-dark-300 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-neon text-dark rounded-lg hover:bg-neon-dark transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="input-neon"
                      placeholder="Your full name"
                    />
                  ) : (
                    <div className="input-neon bg-dark-400 cursor-not-allowed">
                      {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}` || 'N/A'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <div className="input-neon bg-dark-400 cursor-not-allowed flex items-center justify-between">
                    <span>{user?.email || 'N/A'}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-neon"
                      placeholder="+234 800 000 0000"
                    />
                  ) : (
                    <div className="input-neon bg-dark-400 cursor-not-allowed">
                      {user?.phone || 'Not set'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Account Type</label>
                  <div className="input-neon bg-dark-400 cursor-not-allowed">
                    {user?.role === 'ADMIN' ? 'Administrator' : 'Personal Account'}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-6"></div>

            {/* Security Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Password</p>
                      <p className="text-gray-500 text-sm">Last changed: Recently</p>
                    </div>
                  </div>
                  <a href="/forgot-password" className="text-neon text-sm hover:underline">
                    Change Password
                  </a>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-gray-500 text-sm">Add extra security to your account</p>
                    </div>
                  </div>
                  <span className="text-yellow-400 text-sm">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
