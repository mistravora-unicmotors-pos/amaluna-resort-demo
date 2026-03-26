import React, { useState } from 'react';
import { Calendar, Users, Clock, CreditCard, ArrowRight } from 'lucide-react';

const packages = [
  { id: 'adult', name: 'Adult Day Pass', price: 'LKR 3,500', desc: 'Pool access + welcome drink + lunch' },
  { id: 'child', name: 'Child Day Pass (5-12)', price: 'LKR 2,000', desc: 'Pool access + soft drink + kids menu' },
  { id: 'family', name: 'Family Package', price: 'LKR 10,000', desc: '2 adults + 2 children, all inclusive' },
  { id: 'vip', name: 'VIP Cabana', price: 'LKR 8,500', desc: 'Private cabana + premium drinks + platter' },
];

const DayPassBookingForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    selectedPackage: 'adult',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    _h: '', // honeypot
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._h) return; // honeypot check
    console.log('Day pass booking:', formData);
    setSubmitted(true);
  };

  const selectedPkg = packages.find(p => p.id === formData.selectedPackage)!;

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-2xl p-8 text-center">
        <div className="h-16 w-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">Booking Request Sent!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">We'll confirm your {selectedPkg.name} within 2 hours via email.</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">Book Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-luxury p-6 md:p-8">
      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-amber-600" /> Book a Day Pass
      </h3>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={formData._h}
          onChange={e => setFormData(p => ({ ...p, _h: e.target.value }))}
        />
      </div>

      {/* Package Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Package</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {packages.map(pkg => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setFormData(p => ({ ...p, selectedPackage: pkg.id }))}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                formData.selectedPackage === pkg.id
                  ? 'border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/30 shadow-sm'
                  : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{pkg.name}</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">{pkg.price}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{pkg.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Date & Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Clock className="inline h-4 w-4 mr-1" /> Preferred Date
          </label>
          <input
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.date}
            onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
            className="input-luxury"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Users className="inline h-4 w-4 mr-1" /> Number of Guests
          </label>
          <select
            value={formData.guests}
            onChange={e => setFormData(p => ({ ...p, guests: parseInt(e.target.value) }))}
            className="input-luxury"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
            className="input-luxury"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
            className="input-luxury"
            placeholder="+94 77 123 4567"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
          className="input-luxury"
          placeholder="you@example.com"
        />
      </div>

      {/* Summary & Submit */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Total</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
            <CreditCard className="h-5 w-5 text-amber-600" />
            {selectedPkg.price} × {formData.guests}
          </p>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">Pay at venue</p>
      </div>

      <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
        Request Booking <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">Subject to availability. Confirmation within 2 hours.</p>
    </form>
  );
};

export default DayPassBookingForm;
