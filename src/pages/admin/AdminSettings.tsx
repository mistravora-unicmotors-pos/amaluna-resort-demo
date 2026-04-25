import React, { useState, useEffect } from 'react';
import { Save, Globe, Phone, MapPin, Clock, Palette } from 'lucide-react';
import { getSiteSettings, saveSiteSettings, SiteSettings } from '../../services/siteSettingsService';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'content' | 'integration'>('general');
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    setSiteSettings(getSiteSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const success = saveSiteSettings(siteSettings);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const updateSocial = (field: keyof SiteSettings['social'], value: string) => {
    setSiteSettings(prev => ({
      ...prev,
      social: { ...prev.social, [field]: value }
    }));
  };

  const inputClass = "w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none";
  const labelClass = "block text-sm text-gray-400 mb-1";

  return (
    <div className="max-w-4xl">
      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm mb-6">
          Settings saved successfully!
        </div>
      )}

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-2">
        {[
          { id: 'general', label: 'General', icon: Globe },
          { id: 'content', label: 'Site Content', icon: Globe },
          { id: 'integration', label: 'Integrations', icon: Palette },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <tab.icon className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'general' && (
          <>
            {/* General */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><Globe className="h-5 w-5 text-amber-400" /> General Settings</h2>
              <div className="space-y-4">
                <div><label className={labelClass}>Hotel Name</label><input defaultValue="Amaluna Resorts" className={inputClass} /></div>
                <div><label className={labelClass}>Tagline</label><input defaultValue="Easy luxury by the lagoon" className={inputClass} /></div>
                <div><label className={labelClass}>Description</label><textarea rows={3} defaultValue="A boutique luxury resort in Negombo, Sri Lanka — just 15 minutes from the international airport." className={`${inputClass} resize-none`} /></div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><Phone className="h-5 w-5 text-amber-400" /> Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Phone</label><input defaultValue="+94 77 055 7257" className={inputClass} /></div>
                <div><label className={labelClass}>WhatsApp</label><input defaultValue="+94 77 055 7257" className={inputClass} /></div>
                <div><label className={labelClass}>Email</label><input defaultValue="info@amalunaresorts.com" type="email" className={inputClass} /></div>
                <div><label className={labelClass}>Booking Email</label><input defaultValue="reservations@amalunaresorts.com" type="email" className={inputClass} /></div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-amber-400" /> Address</h2>
              <div className="space-y-4">
                <div><label className={labelClass}>Street Address</label><input defaultValue="276, Pamunugama Road, Kepungoda" className={inputClass} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div><label className={labelClass}>City</label><input defaultValue="Negombo" className={inputClass} /></div>
                  <div><label className={labelClass}>Province</label><input defaultValue="Western Province" className={inputClass} /></div>
                  <div><label className={labelClass}>Country</label><input defaultValue="Sri Lanka" className={inputClass} /></div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><Clock className="h-5 w-5 text-amber-400" /> Operating Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Check-in Time</label><input defaultValue="14:00" type="time" className={inputClass} /></div>
                <div><label className={labelClass}>Check-out Time</label><input defaultValue="11:00" type="time" className={inputClass} /></div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'content' && (
          <>
            {/* Social Proof */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-4 flex items-center gap-2"><Globe className="h-5 w-5 text-amber-400" /> Social & SEO</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Google Maps Embed URL</label>
                  <input
                    type="url"
                    value={siteSettings.social.googleMapsUrl}
                    onChange={(e) => updateSocial('googleMapsUrl', e.target.value)}
                    placeholder="Google Maps iframe src URL"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>TripAdvisor URL</label>
                  <input
                    type="url"
                    value={siteSettings.social.tripAdvisorUrl}
                    onChange={(e) => updateSocial('tripAdvisorUrl', e.target.value)}
                    placeholder="https://tripadvisor.com/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Google Business URL</label>
                  <input
                    type="url"
                    value={siteSettings.social.googleBusinessUrl}
                    onChange={(e) => updateSocial('googleBusinessUrl', e.target.value)}
                    placeholder="https://g.page/..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'integration' && (
          <>
            {/* eZee PMS */}
            <div className="bg-gray-800/50 rounded-xl border border-dashed border-gray-600 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-2 flex items-center gap-2"><Palette className="h-5 w-5 text-amber-400" /> eZee PMS Integration</h2>
              <p className="text-gray-500 text-sm mb-4">Connect to eZee PMS to sync bookings, rooms, and guest data automatically.</p>
              <div className="space-y-4">
                <div><label className={labelClass}>API Key</label><input placeholder="Enter eZee API key" className={inputClass} /></div>
                <div><label className={labelClass}>Hotel ID</label><input placeholder="Enter eZee Hotel ID" className={inputClass} /></div>
                <div><label className={labelClass}>API Base URL</label><input placeholder="https://live.ipms247.com/api" className={inputClass} /></div>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-gray-800/50 rounded-xl border border-dashed border-gray-600 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-2 flex items-center gap-2"><Palette className="h-5 w-5 text-amber-400" /> Google Analytics</h2>
              <p className="text-gray-500 text-sm mb-4">Track website visitors and conversions.</p>
              <div className="space-y-4">
                <div><label className={labelClass}>GA4 Measurement ID</label><input placeholder="G-XXXXXXXXXX" className={inputClass} /></div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
              <h2 className="text-white font-heading font-bold mb-2 flex items-center gap-2"><Globe className="h-5 w-5 text-amber-400" /> Bank Details for Payments</h2>
              <p className="text-gray-500 text-sm mb-4">Displayed during booking for advance payments.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Bank Name</label><input defaultValue="Seylan Bank" className={inputClass} /></div>
                <div><label className={labelClass}>Account Name</label><input defaultValue="Amaluna Resorts (Pvt) Ltd" className={inputClass} /></div>
                <div><label className={labelClass}>Account Number</label><input defaultValue="0000 0000 0000" className={inputClass} /></div>
                <div><label className={labelClass}>Branch Name</label><input defaultValue="Negombo Branch" className={inputClass} /></div>
                <div><label className={labelClass}>SWIFT Code</label><input defaultValue="SEYBLKLX" className={inputClass} /></div>
              </div>
            </div>
          </>
        )}

        <button type="submit" className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </form>
    </div>
  );
}
