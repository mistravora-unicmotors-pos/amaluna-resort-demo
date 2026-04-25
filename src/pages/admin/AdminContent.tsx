import React, { useState, useEffect } from 'react';
import { Save, FileText, Shield, Scale, Ban, HelpCircle, Info, Plus, Trash2, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { getSiteSettings, saveSiteSettings, SiteSettings } from '../../services/siteSettingsService';
import { rooms } from '../../services/bookingService';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function AdminContent() {
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('homepage-stats');
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettings());
  const [activeFaqSection, setActiveFaqSection] = useState<'pool' | 'events' | 'dining' | 'rooms'>('pool');
  const [roomsFaqMode, setRoomsFaqMode] = useState<'default' | 'specific'>('default');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id ?? '');

  useEffect(() => {
    setSiteSettings(getSiteSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(siteSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateHomepageStats = (field: keyof SiteSettings['homepageStats'], value: number) => {
    setSiteSettings(prev => ({
      ...prev,
      homepageStats: { ...prev.homepageStats, [field]: value }
    }));
  };

  const getActiveFaqs = (): FAQItem[] => {
    if (activeFaqSection !== 'rooms') return (siteSettings.faqs?.[activeFaqSection] as FAQItem[]) ?? [];

    if (roomsFaqMode === 'default') return (siteSettings.faqs?.roomsDefault as FAQItem[]) ?? [];

    if (!selectedRoomId) return [];
    return (siteSettings.faqs?.roomsById?.[selectedRoomId] as FAQItem[]) ?? [];
  };

  const setActiveFaqs = (nextFaqs: FAQItem[]) => {
    setSiteSettings(prev => ({
      ...prev,
      faqs: {
        ...prev.faqs,
        ...(activeFaqSection !== 'rooms'
          ? { [activeFaqSection]: nextFaqs }
          : roomsFaqMode === 'default'
            ? { roomsDefault: nextFaqs }
            : {
                roomsById: {
                  ...prev.faqs.roomsById,
                  [selectedRoomId]: nextFaqs,
                },
              }),
      },
    }));
  };

  const addFAQ = () => {
    const newId =
      activeFaqSection === 'rooms' && roomsFaqMode === 'specific' && selectedRoomId
        ? `room-${selectedRoomId}-${Date.now()}`
        : `${activeFaqSection}-${Date.now()}`;
    setActiveFaqs([...getActiveFaqs(), { id: newId, question: '', answer: '' }]);
  };

  const removeFAQ = (id: string) => {
    setActiveFaqs(getActiveFaqs().filter(faq => faq.id !== id));
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setActiveFaqs(getActiveFaqs().map(faq => (faq.id === id ? { ...faq, [field]: value } : faq)));
  };

  const copyRoomsDefaultToSelectedRoom = () => {
    if (!selectedRoomId) return;
    const source = (siteSettings.faqs.roomsDefault ?? []) as FAQItem[];
    const copied = source.map((f) => ({
      ...f,
      id: `room-${selectedRoomId}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    }));
    setSiteSettings(prev => ({
      ...prev,
      faqs: {
        ...prev.faqs,
        roomsById: {
          ...prev.faqs.roomsById,
          [selectedRoomId]: copied,
        },
      },
    }));
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    { id: 'homepage-stats', label: 'Homepage Statistics', icon: BarChart3 },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms & Conditions', icon: Scale },
    { id: 'booking', label: 'Booking Terms', icon: FileText },
    { id: 'cancellation', label: 'Cancellation & Refund Policy', icon: Ban },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-4xl">
      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-lg text-sm">
          Content saved successfully!
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Manage important legal content and information displayed on your website. All content here will be stored in the database and can be updated at any time.
        </p>
      </div>

      {/* Homepage Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('homepage-stats')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span className="text-gray-900 dark:text-white font-heading font-bold">Homepage Statistics</span>
          </div>
          {activeSection === 'homepage-stats' ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        {activeSection === 'homepage-stats' && (
          <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-gray-500 text-sm mb-4">These values are displayed on the homepage counter section.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Happy Guests</label>
                <input
                  type="number"
                  value={siteSettings.homepageStats.happyGuests}
                  onChange={(e) => updateHomepageStats('happyGuests', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Room Categories</label>
                <input
                  type="number"
                  value={siteSettings.homepageStats.roomCategories}
                  onChange={(e) => updateHomepageStats('roomCategories', parseInt(e.target.value) || 0)}
                  min="1"
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Guest Rating (out of 5)</label>
                <input
                  type="number"
                  value={siteSettings.homepageStats.guestRating}
                  onChange={(e) => updateHomepageStats('guestRating', parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="1"
                  max="5"
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">From Airport (minutes)</label>
                <input
                  type="number"
                  value={siteSettings.homepageStats.fromAirport}
                  onChange={(e) => updateHomepageStats('fromAirport', parseInt(e.target.value) || 0)}
                  min="1"
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Policy */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('privacy')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span className="text-gray-900 dark:text-white font-heading font-bold">Privacy Policy</span>
          </div>
          {activeSection === 'privacy' ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        {activeSection === 'privacy' && (
          <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-gray-500 text-sm mb-3">Define how you collect, use, and protect guest data.</p>
            <textarea
              rows={12}
              defaultValue={`Privacy Policy for Amaluna Resorts

Last updated: March 2024

1. Information We Collect
We collect information you provide directly to us, such as when you make a reservation, create an account, or contact us.

2. How We Use Your Information
We use the information we collect to process reservations, communicate with you, and improve our services.

3. Information Sharing
We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.

4. Data Security
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. Cookies
We use cookies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.

6. Contact Us
If you have any questions about this Privacy Policy, please contact us at privacy@amalunaresorts.com.`}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none font-mono"
            />
          </div>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('terms')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-amber-400" />
            <span className="text-white font-heading font-bold">Terms & Conditions</span>
          </div>
          {activeSection === 'terms' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {activeSection === 'terms' && (
          <div className="px-6 pb-6 border-t border-gray-700 pt-4">
            <p className="text-gray-500 text-sm mb-3">General terms for using your website and services.</p>
            <textarea
              rows={12}
              defaultValue={`Terms & Conditions for Amaluna Resorts

Last updated: March 2024

1. Acceptance of Terms
By accessing and using this website, you accept and agree to be bound by these Terms & Conditions.

2. Use of Website
You may use this website for lawful purposes only. You must not use this website in any way that causes damage to the website or impairs the availability of the website.

3. Intellectual Property
All content on this website, including text, graphics, logos, and images, is the property of Amaluna Resorts and is protected by copyright laws.

4. Limitation of Liability
Amaluna Resorts shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of this website.

5. Governing Law
These Terms & Conditions shall be governed by and construed in accordance with the laws of Sri Lanka.

6. Changes to Terms
We reserve the right to modify these Terms & Conditions at any time. Your continued use of the website constitutes acceptance of the modified Terms.`}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none font-mono"
            />
          </div>
        )}
      </div>

      {/* Booking Terms */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('booking')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-amber-400" />
            <span className="text-white font-heading font-bold">Booking Terms</span>
          </div>
          {activeSection === 'booking' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {activeSection === 'booking' && (
          <div className="px-6 pb-6 border-t border-gray-700 pt-4">
            <p className="text-gray-500 text-sm mb-3">Terms specific to making reservations and bookings.</p>
            <textarea
              rows={12}
              defaultValue={`Booking Terms for Amaluna Resorts

1. Reservation Confirmation
All reservations are subject to availability and will be confirmed via email within 24 hours.

2. Payment
A deposit of 50% is required at the time of booking. The remaining balance is due upon check-in.

3. Check-in / Check-out
- Check-in: 2:00 PM
- Check-out: 11:00 AM
Early check-in and late check-out may be available upon request and subject to availability.

4. Identification
Guests must present valid government-issued photo identification upon check-in.

5. Children Policy
Children of all ages are welcome. Children under 5 stay free when using existing bedding.

6. Pet Policy
Pets are not allowed at the resort.

7. Smoking Policy
Smoking is prohibited in all indoor areas. Designated smoking areas are available outdoors.

8. Damages
Guests are responsible for any damage caused to the property during their stay.`}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none font-mono"
            />
          </div>
        )}
      </div>

      {/* Cancellation & Refund Policy */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('cancellation')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Ban className="h-5 w-5 text-amber-400" />
            <span className="text-white font-heading font-bold">Cancellation & Refund Policy</span>
          </div>
          {activeSection === 'cancellation' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {activeSection === 'cancellation' && (
          <div className="px-6 pb-6 border-t border-gray-700 pt-4">
            <p className="text-gray-500 text-sm mb-3">Define cancellation windows and refund policies.</p>
            <textarea
              rows={10}
              defaultValue={`Cancellation & Refund Policy

1. Free Cancellation
Cancellations made more than 7 days before check-in will receive a full refund.

2. Late Cancellation
Cancellations made between 3-7 days before check-in will be charged 50% of the total booking amount.

3. No-Show / Last Minute Cancellation
Cancellations made less than 3 days before check-in or no-shows will be charged 100% of the total booking amount.

4. Modifications
Booking modifications are subject to availability and may result in rate changes.

5. Refund Processing
Refunds will be processed within 7-10 business days to the original payment method.

6. Force Majeure
In case of natural disasters, pandemics, or other unforeseen circumstances, special cancellation policies may apply.`}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none font-mono"
            />
          </div>
        )}
      </div>

      {/* About Us */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('about')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-amber-400" />
            <span className="text-white font-heading font-bold">About Us</span>
          </div>
          {activeSection === 'about' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {activeSection === 'about' && (
          <div className="px-6 pb-6 border-t border-gray-700 pt-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Short Description (for homepage)</label>
              <textarea
                rows={3}
                defaultValue="Amaluna Resorts is a boutique luxury resort nestled by the serene lagoon in Negombo, Sri Lanka. Just 15 minutes from Bandaranaike International Airport, we offer the perfect blend of comfort, nature, and warm Sri Lankan hospitality."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full About Us Content</label>
              <textarea
                rows={10}
                defaultValue={`Welcome to Amaluna Resorts

Nestled along the tranquil shores of Negombo Lagoon, Amaluna Resorts offers an escape from the ordinary. Our boutique property combines modern comfort with traditional Sri Lankan hospitality, creating a unique retreat for travelers seeking authentic experiences.

Our Story
Founded with a vision to create a sanctuary where guests can reconnect with nature while enjoying contemporary amenities, Amaluna Resorts has been welcoming travelers from around the world since our opening.

Our Commitment
We are committed to providing exceptional service, sustainable practices, and unforgettable experiences. From our farm-to-table dining to our eco-friendly initiatives, every aspect of Amaluna reflects our dedication to responsible tourism.

Location
Strategically located just 15 minutes from Bandaranaike International Airport, we serve as the perfect first or last stop on your Sri Lankan adventure, without compromising on the peaceful, resort atmosphere our guests cherish.`}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('faq')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span className="text-white font-heading font-bold">FAQ</span>
            <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">{getActiveFaqs().length} items</span>
          </div>
          {activeSection === 'faq' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {activeSection === 'faq' && (
          <div className="px-6 pb-6 border-t border-gray-700 pt-4">
            <p className="text-gray-500 text-sm mb-4">Manage frequently asked questions displayed on your website.</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(
                [
                  { id: 'pool', label: 'Pool' },
                  { id: 'events', label: 'Events' },
                  { id: 'dining', label: 'Dining' },
                  { id: 'rooms', label: 'Rooms' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFaqSection(tab.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                    activeFaqSection === tab.id
                      ? 'bg-amber-600 text-white border-amber-500'
                      : 'bg-gray-700/40 text-gray-300 border-gray-600 hover:bg-gray-700/70 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeFaqSection === 'rooms' && (
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setRoomsFaqMode('default')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                      roomsFaqMode === 'default'
                        ? 'bg-amber-600 text-white border-amber-500'
                        : 'bg-gray-700/40 text-gray-300 border-gray-600 hover:bg-gray-700/70 hover:text-white'
                    }`}
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoomsFaqMode('specific')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                      roomsFaqMode === 'specific'
                        ? 'bg-amber-600 text-white border-amber-500'
                        : 'bg-gray-700/40 text-gray-300 border-gray-600 hover:bg-gray-700/70 hover:text-white'
                    }`}
                  >
                    Specific Room
                  </button>
                </div>

                {roomsFaqMode === 'specific' && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    >
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} ({r.id})
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={copyRoomsDefaultToSelectedRoom}
                      className="px-3 py-2.5 rounded-lg text-xs font-medium transition-colors border bg-gray-700/40 text-gray-300 border-gray-600 hover:bg-gray-700/70 hover:text-white"
                    >
                      Copy default into this room
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              {getActiveFaqs().map((faq, index) => (
                <div key={faq.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-amber-400 text-sm font-medium">Q{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeFAQ(faq.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.question}
                      onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    />
                    <textarea
                      placeholder="Answer"
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addFAQ}
              className="mt-4 flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium"
            >
              <Plus className="h-4 w-4" /> Add FAQ
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <Save className="h-4 w-4" /> Save All Content
        </button>
        <p className="text-gray-500 text-sm">Changes will be reflected on the website immediately after saving.</p>
      </div>
    </form>
  );
}
