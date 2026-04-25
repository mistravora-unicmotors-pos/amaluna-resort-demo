import React, { useMemo, useState } from 'react';
import { Users, Clock, CreditCard, ArrowRight, Minus, Plus } from 'lucide-react';
import {
  computeDayoutTotal,
  dayoutPackages,
  FREE_CHILD_AGE,
  resolveDayoutPrices,
  type DayoutPackageId,
} from '../services/dayoutPricingService';

const DayPassBookingForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    selectedPackage: 'day-out' as DayoutPackageId,
    adults: 1,
    children: 0,
    infantsFree: 0,
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

  const pricingDateStr = useMemo(
    () => formData.date || new Date().toISOString().split('T')[0],
    [formData.date],
  );

  const selectedPkg = dayoutPackages.find((p) => p.id === formData.selectedPackage)!;

  const total = useMemo(() => {
    return computeDayoutTotal({
      packageId: formData.selectedPackage,
      dateStr: formData.date || undefined,
      adults: formData.adults,
      childrenTotal: formData.children,
      infantsFree: formData.infantsFree,
    });
  }, [formData.adults, formData.children, formData.infantsFree, formData.date, formData.selectedPackage]);

  const setAdults = (next: number) => setFormData((p) => ({ ...p, adults: Math.max(1, Math.trunc(next)) }));
  const setChildrenTotal = (next: number) =>
    setFormData((p) => {
      const children = Math.max(0, Math.trunc(next));
      return { ...p, children, infantsFree: Math.min(p.infantsFree, children) };
    });
  const setInfantsFree = (next: number) =>
    setFormData((p) => ({ ...p, infantsFree: Math.max(0, Math.min(Math.trunc(next), p.children)) }));

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-2xl p-8 text-center">
        <div className="h-16 w-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">Booking Request Sent!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We'll confirm your {selectedPkg.name} within 2 hours via email. Estimated total: LKR {total.total.toLocaleString()}.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">Book Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-luxury p-6 md:p-8">
      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-amber-600" /> Book a Day Pass
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
          {dayoutPackages.map((pkg) => {
            const { adultPrice, childPrice } = resolveDayoutPrices(pkg.id, pricingDateStr);
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, selectedPackage: pkg.id }))}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  formData.selectedPackage === pkg.id
                    ? 'border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/30 shadow-sm'
                    : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg" aria-hidden="true">{pkg.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{pkg.name}</span>
                    </div>
                    <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      {pkg.perks.map((perk, i) => (
                        <li key={i}>- {perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-3 text-[11px] flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Adult</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">LKR {adultPrice.toLocaleString()}</span>
                </div>
                <div className="text-[11px] flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Child</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">LKR {childPrice.toLocaleString()}</span>
                </div>
              </button>
            );
          })}
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
            <Users className="inline h-4 w-4 mr-1" /> Guests
          </label>

          <div className="space-y-3">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Adults</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAdults(formData.adults - 1)}
                  className="h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formData.adults <= 1}
                  aria-label="Decrease adults"
                >
                  <Minus className="h-4 w-4 mx-auto" />
                </button>
                <div className="w-10 text-center font-bold text-gray-900 dark:text-white">{formData.adults}</div>
                <button
                  type="button"
                  onClick={() => setAdults(formData.adults + 1)}
                  className="h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Increase adults"
                >
                  <Plus className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Children</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setChildrenTotal(formData.children - 1)}
                  className="h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formData.children <= 0}
                  aria-label="Decrease children"
                >
                  <Minus className="h-4 w-4 mx-auto" />
                </button>
                <div className="w-10 text-center font-bold text-gray-900 dark:text-white">{formData.children}</div>
                <button
                  type="button"
                  onClick={() => setChildrenTotal(formData.children + 1)}
                  className="h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Increase children"
                >
                  <Plus className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>

            {/* Infants (Free) */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Infants (Free, under {FREE_CHILD_AGE})</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInfantsFree(formData.infantsFree - 1)}
                  className="h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formData.infantsFree <= 0}
                  aria-label="Decrease free infants"
                >
                  <Minus className="h-4 w-4 mx-auto" />
                </button>
                <div className="w-10 text-center font-bold text-gray-900 dark:text-white">{formData.infantsFree}</div>
                <button
                  type="button"
                  onClick={() => setInfantsFree(formData.infantsFree + 1)}
                  className="h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formData.infantsFree >= formData.children}
                  aria-label="Increase free infants"
                >
                  <Plus className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
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
            LKR {total.total.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {total.adults} Adult(s) × LKR {total.adultPrice.toLocaleString()} + {total.childrenPaid} Paying Child(ren) × LKR {total.childPrice.toLocaleString()}
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
