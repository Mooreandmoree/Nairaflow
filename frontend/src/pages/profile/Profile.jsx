import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          <div className="glass-card p-8">
            {/* Avatar */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center text-4xl font-bold text-dark">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-400">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <div className="input-neon bg-dark-400">{user?.firstName || 'N/A'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <div className="input-neon bg-dark-400">{user?.lastName || 'N/A'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <div className="input-neon bg-dark-400">{user?.email || 'N/A'}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                  <div className="input-neon bg-dark-400">{user?.phone || 'N/A'}</div>
                </div>
              </div>

              <button className="btn-neon-solid px-6 py-3">
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;