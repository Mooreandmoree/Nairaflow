import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

          <div className="space-y-6">
            {/* Security Settings */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-gray-500 text-sm">Update your password regularly</p>
                  </div>
                  <button className="text-neon hover:underline">Change</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                  </div>
                  <button className="text-neon hover:underline">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Transaction PIN</p>
                    <p className="text-gray-500 text-sm">Change your 4-digit PIN</p>
                  </div>
                  <button className="text-neon hover:underline">Change</button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-gray-500 text-sm">Receive transaction alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-dark-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">SMS Notifications</p>
                    <p className="text-gray-500 text-sm">Receive transaction alerts via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-dark-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;