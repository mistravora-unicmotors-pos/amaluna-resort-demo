import React, { useState } from 'react';
import { Save, Globe, Phone, MapPin, Clock, Palette } from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm">
          Settings saved successfully!
        </div>
      )}

      {/* General */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><Globe className="h-5 w-5 text-amber-400" /> General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Hotel Name</label>
            <input defaultValue="Amaluna Resorts" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tagline</label>
            <input defaultValue="Easy luxury by the lagoon" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea rows={3} defaultValue="A boutique luxury resort in Negombo, Sri Lanka — just 15 minutes from the international airport." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none" />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><Phone className="h-5 w-5 text-amber-400" /> Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Phone</label>
            <input defaultValue="+94 31 227 9279" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">WhatsApp</label>
            <input defaultValue="+94 77 123 4567" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input defaultValue="info@amalunaresorts.com" type="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Booking Email</label>
            <input defaultValue="reservations@amalunaresorts.com" type="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-amber-400" /> Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Street Address</label>
            <input defaultValue="276, Pamunugama Road, Kepungoda" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">City</label>
              <input defaultValue="Negombo" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Province</label>
              <input defaultValue="Western Province" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Country</label>
              <input defaultValue="Sri Lanka" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><Clock className="h-5 w-5 text-amber-400" /> Operating Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Check-in Time</label>
            <input defaultValue="14:00" type="time" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Check-out Time</label>
            <input defaultValue="11:00" type="time" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
        </div>
      </div>

      {/* eZee PMS */}
      <div className="bg-gray-800/50 rounded-xl border border-dashed border-gray-600 p-6">
        <h2 className="text-white font-heading font-bold mb-2 flex items-center gap-2"><Palette className="h-5 w-5 text-amber-400" /> eZee PMS Integration</h2>
        <p className="text-gray-500 text-sm mb-4">Connect to eZee PMS to sync bookings, rooms, and guest data automatically.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">API Key</label>
            <input placeholder="Enter eZee API key" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Hotel ID</label>
            <input placeholder="Enter eZee Hotel ID" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        <Save className="h-4 w-4" /> Save Settings
      </button>
    </form>
  );
}
