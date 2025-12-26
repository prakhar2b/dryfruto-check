import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    businessName: 'DryFruto',
    slogan: 'Live With Health',
    logo: '',
    phone: '9870990795',
    email: 'info@dryfruto.com',
    address: '123, Main Street, New Delhi, India',
    whatsappLink: 'https://wa.me/919870990795'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/site-settings`);
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(`${API}/site-settings`, settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12 text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
        <p className="text-gray-600">Manage your business information and contact details</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
            <input
              type="text"
              value={settings.slogan}
              onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
            <input
              type="text"
              value={settings.logo}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
            {settings.logo && (
              <img src={settings.logo} alt="Logo Preview" className="mt-2 h-16 object-contain" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              rows="2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Link</label>
            <input
              type="text"
              value={settings.whatsappLink}
              onChange={(e) => setSettings({ ...settings, whatsappLink: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
