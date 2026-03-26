import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Shield, Check, CheckCircle, Loader2, Copy, Clock, Building2, CreditCard, AlertCircle, RefreshCw, Phone } from 'lucide-react';
import {
  rooms as allRooms,
  getRoomById,
  calculateNights,
  calculatePricing,
  checkAvailability,
  createBooking,
  BANK_DETAILS,
  type Room,
  type PricingBreakdown,
  type BookingResponse,
} from '../services/bookingService';
import { checkRateLimit, sanitizeInput, sanitizeEmail, sanitizePhone } from '../services/securityService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    promoCode: string;
    selectedRoom: string;
  };
}

const STEP_LABELS = ['Room', 'Details', 'Review', 'Payment'] as const;
const TOTAL_STEPS = STEP_LABELS.length;

const inputClass =
  'w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200 font-body bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500';
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-body';

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, bookingData }) => {
  // ── state ──────────────────────────────────────────────────────────────
  const preselected = bookingData.selectedRoom || '';
  const [step, setStep] = useState(preselected ? 2 : 1);
  const [selectedRoom, setSelectedRoom] = useState(preselected);

  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    idPassport: '',
    arrivalTime: '',
    specialRequests: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<{ checked: boolean; available: boolean; msg: string }>({
    checked: false,
    available: false,
    msg: '',
  });
  const [copied, setCopied] = useState(false);

  // ── derived ────────────────────────────────────────────────────────────
  const nights = calculateNights(bookingData.checkIn, bookingData.checkOut);
  const pricing: PricingBreakdown | null = selectedRoom
    ? calculatePricing(selectedRoom, nights, bookingData.promoCode)
    : null;
  const roomData: Room | undefined = selectedRoom ? getRoomById(selectedRoom) : undefined;

  // ── auto-skip step 1 when room is preselected ─────────────────────────
  useEffect(() => {
    if (isOpen && preselected) {
      setSelectedRoom(preselected);
      setStep(2);
    }
  }, [isOpen, preselected]);

  // ── helpers ────────────────────────────────────────────────────────────
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const handleField = (field: string, value: string) => {
    setGuestInfo((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => { const c = { ...e }; delete c[field]; return c; });
  };

  const validateGuest = (): boolean => {
    const e: Record<string, string> = {};
    if (!guestInfo.firstName.trim()) e.firstName = 'Required';
    if (!guestInfo.lastName.trim()) e.lastName = 'Required';
    if (!guestInfo.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) e.email = 'Invalid email';
    if (!guestInfo.phone.trim()) e.phone = 'Required';
    else if (!/^[+\d][\d\s\-()]{6,}$/.test(guestInfo.phone)) e.phone = 'Invalid phone number';
    if (!guestInfo.country.trim()) e.country = 'Required';
    if (!termsAccepted) e.terms = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckAvailability = async () => {
    if (!selectedRoom) return;
    const res = await checkAvailability(selectedRoom, bookingData.checkIn, bookingData.checkOut);
    setAvailability({ checked: true, available: res.available, msg: res.message });
  };

  const handleConfirmBooking = async () => {
    // Check rate limit
    if (!checkRateLimit('booking')) {
      setBookingError('Too many booking attempts. Please wait a few minutes and try again.');
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const res = await createBooking({
        roomId: selectedRoom,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        adults: bookingData.adults,
        children: bookingData.children,
        promoCode: bookingData.promoCode,
        guest: {
          firstName: sanitizeInput(guestInfo.firstName),
          lastName: sanitizeInput(guestInfo.lastName),
          email: sanitizeEmail(guestInfo.email),
          phone: sanitizePhone(guestInfo.phone),
          country: sanitizeInput(guestInfo.country),
          idPassport: sanitizeInput(guestInfo.idPassport),
          arrivalTime: guestInfo.arrivalTime,
          specialRequests: sanitizeInput(guestInfo.specialRequests),
        },
      });
      setBookingResult(res);
      if (res.success) {
        setStep(5); // success view
      } else {
        setBookingError(res.message || 'Booking failed. Please try again or contact us directly.');
      }
    } catch (error) {
      setBookingError('Something went wrong. Please try again or contact us directly at +94 77 055 7257.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setBookingResult(null);
    setBookingError(null);
    setStep(preselected ? 2 : 1);
    setSelectedRoom(preselected);
    setGuestInfo({ firstName: '', lastName: '', email: '', phone: '', country: '', idPassport: '', arrivalTime: '', specialRequests: '' });
    setTermsAccepted(false);
    setErrors({});
    setAvailability({ checked: false, available: false, msg: '' });
    onClose();
  };

  const retryBooking = () => {
    setBookingError(null);
    setBookingResult(null);
  };

  if (!isOpen) return null;

  // ── SUCCESS VIEW ──────────────────────────────────────────────────────
  if (step === 5 && bookingResult?.success) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-luxury">
          <div className="p-8 sm:p-10 text-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-body mb-6">
              Thank you, {guestInfo.firstName}! Your reservation has been placed.
            </p>

            {/* Booking Reference */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 mb-6">
              <p className="text-xs text-amber-700 dark:text-amber-400 font-body uppercase tracking-wide mb-1">Booking Reference</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-wider">{bookingResult.bookingRef}</span>
                <button
                  onClick={() => copyToClipboard(bookingResult.bookingRef)}
                  className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
                  aria-label="Copy booking reference"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="text-left bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6 text-sm font-body space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Room</span>
                <span className="font-medium text-gray-900 dark:text-white">{roomData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Dates</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatDate(bookingData.checkIn)} – {formatDate(bookingData.checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total</span>
                <span className="font-medium text-gray-900 dark:text-white">LKR {bookingResult.pricing.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Advance Due (30%)</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">LKR {bookingResult.pricing.advanceAmount.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 font-body text-xs mb-6">
              A confirmation email will be sent to <strong className="text-gray-700 dark:text-gray-200">{guestInfo.email}</strong>. If you don't see it, please check your spam folder or contact us directly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/94770557257?text=${encodeURIComponent(`Hi Amaluna, I just booked ${roomData?.name || 'a room'}. My booking ref is ${bookingResult.bookingRef}. Please confirm.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Confirm via WhatsApp
              </a>
              <button onClick={resetAndClose} className="btn-primary">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── BOOKING FAILURE VIEW ──────────────────────────────────────────────
  if (bookingError || (bookingResult && !bookingResult.success)) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-luxury">
          <div className="p-8 sm:p-10 text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              Booking Unsuccessful
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-body mb-6">
              {bookingError || bookingResult?.message || 'We couldn\'t complete your booking. Please try again or contact us directly.'}
            </p>

            {/* Fallback Contact Options */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5 mb-6">
              <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm mb-3">
                Alternative Ways to Book
              </h3>
              <div className="space-y-3 text-sm font-body">
                <a
                  href="tel:+94770557257"
                  className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 rounded-lg p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <Phone className="h-4 w-4 text-amber-600" />
                  <span>Call: +94 77 055 7257</span>
                </a>
                <a
                  href={`https://wa.me/94770557257?text=${encodeURIComponent(`Hi Amaluna, I tried to book ${roomData?.name || 'a room'} from ${bookingData.checkIn} to ${bookingData.checkOut} but had issues. Can you help?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-white rounded-lg p-3 hover:bg-emerald-600 transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href="mailto:reservations@amalunaresorts.com"
                  className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 rounded-lg p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <span>Email: reservations@amalunaresorts.com</span>
                </a>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 font-body text-xs mb-6">
              Our team is available 24/7 to assist with your booking.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={retryBooking} className="btn-outline flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <button onClick={resetAndClose} className="btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN BOOKING WIZARD ───────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-luxury">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4 sm:p-6 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 dark:text-white">
            {step === 1 && 'Select Room'}
            {step === 2 && 'Guest Details'}
            {step === 3 && 'Review Booking'}
            {step === 4 && 'Payment'}
          </h2>
          <button
            onClick={resetAndClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close booking modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            {STEP_LABELS.map((label, i) => {
              const s = i + 1;
              return (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      s <= step ? 'bg-amber-600 text-white shadow-gold' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {s < step ? <Check className="h-4 w-4" /> : s}
                  </div>
                  <span
                    className={`ml-2 text-xs font-body hidden sm:inline ${
                      s <= step ? 'text-amber-700 dark:text-amber-400 font-semibold' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-4">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-1 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Stay summary strip */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 sm:p-4 mb-6 border border-amber-100 dark:border-amber-800/30">
            <div className="flex flex-wrap items-center justify-between text-sm font-body gap-2">
              <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4 text-amber-600 mr-1 flex-shrink-0" />
                  <span className="truncate">{formatDate(bookingData.checkIn)} – {formatDate(bookingData.checkOut)}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Users className="h-4 w-4 text-amber-600 mr-1 flex-shrink-0" />
                  <span>
                    {bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''}
                    {bookingData.children > 0 && `, ${bookingData.children} Child${bookingData.children > 1 ? 'ren' : ''}`}
                  </span>
                </div>
              </div>
              <div className="font-semibold text-amber-700 dark:text-amber-400">{nights} night{nights > 1 ? 's' : ''}</div>
            </div>
          </div>

          {/* ────────────── STEP 1 — ROOM SELECTION ────────────── */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">Available Rooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                      selectedRoom === room.id
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 shadow-gold'
                        : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-luxury bg-white dark:bg-gray-800'
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedRoom(room.id)}
                  >
                    <div className="relative">
                      <img
                        src={room.image + '?auto=compress&cs=tinysrgb&w=400'}
                        alt={room.name}
                        className="w-full h-32 object-cover rounded-xl mb-3"
                        loading="lazy"
                      />
                      <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Available
                      </span>
                    </div>
                    <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">{room.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-body mb-2">{room.occupancy}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.amenities.slice(0, 5).map((a, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full font-body">{a}</span>
                      ))}
                      {room.amenities.length > 5 && (
                        <span className="px-2 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full font-body">+{room.amenities.length - 5}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">LKR {room.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/night</span>
                      </div>
                      {selectedRoom === room.id && <Check className="h-5 w-5 text-amber-600" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => { handleCheckAvailability(); setStep(2); }}
                  disabled={!selectedRoom}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ────────────── STEP 2 — GUEST DETAILS ────────────── */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">Guest Information</h3>

              {/* Availability badge */}
              {availability.checked && (
                <div className={`rounded-xl p-3 mb-4 flex items-center gap-2 text-sm font-body ${
                  availability.available ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300'
                }`}>
                  {availability.available ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  {availability.msg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* First Name */}
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input type="text" value={guestInfo.firstName} onChange={(e) => handleField('firstName', e.target.value)} className={`${inputClass} ${errors.firstName ? 'border-red-400 dark:border-red-500' : ''}`} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                {/* Last Name */}
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input type="text" value={guestInfo.lastName} onChange={(e) => handleField('lastName', e.target.value)} className={`${inputClass} ${errors.lastName ? 'border-red-400 dark:border-red-500' : ''}`} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" value={guestInfo.email} onChange={(e) => handleField('email', e.target.value)} className={`${inputClass} ${errors.email ? 'border-red-400 dark:border-red-500' : ''}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input type="tel" value={guestInfo.phone} onChange={(e) => handleField('phone', e.target.value)} placeholder="+94 77 055 7257" className={`${inputClass} ${errors.phone ? 'border-red-400 dark:border-red-500' : ''}`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                {/* Country */}
                <div>
                  <label className={labelClass}>Country *</label>
                  <input type="text" value={guestInfo.country} onChange={(e) => handleField('country', e.target.value)} placeholder="Sri Lanka" className={`${inputClass} ${errors.country ? 'border-red-400 dark:border-red-500' : ''}`} />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
                {/* ID / Passport */}
                <div>
                  <label className={labelClass}>ID / Passport No.</label>
                  <input type="text" value={guestInfo.idPassport} onChange={(e) => handleField('idPassport', e.target.value)} className={inputClass} />
                </div>
              </div>

              {/* Arrival Time */}
              <div className="mb-4">
                <label className={labelClass}>Estimated Arrival Time</label>
                <select value={guestInfo.arrivalTime} onChange={(e) => handleField('arrivalTime', e.target.value)} className={inputClass}>
                  <option value="">Select time</option>
                  <option value="12:00–14:00">12:00 – 14:00 (Early)</option>
                  <option value="14:00–16:00">14:00 – 16:00 (Standard check-in)</option>
                  <option value="16:00–18:00">16:00 – 18:00</option>
                  <option value="18:00–20:00">18:00 – 20:00</option>
                  <option value="20:00+">After 20:00 (Late arrival)</option>
                </select>
              </div>

              {/* Special Requests */}
              <div className="mb-4">
                <label className={labelClass}>Special Requests</label>
                <textarea
                  rows={3}
                  value={guestInfo.specialRequests}
                  onChange={(e) => handleField('specialRequests', e.target.value)}
                  placeholder="Any special requirements (e.g., extra bed, dietary needs)…"
                  className={inputClass}
                />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => { setTermsAccepted(e.target.checked); if (errors.terms) setErrors((p) => { const c = { ...p }; delete c.terms; return c; }); }}
                  className="mt-1 h-4 w-4 accent-amber-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-body">
                  I agree to the <span className="text-amber-700 dark:text-amber-400 font-medium">booking terms & cancellation policy</span>. I understand that a 30% advance payment is required to confirm the reservation.
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs -mt-4 mb-4">{errors.terms}</p>}

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                <button
                  onClick={() => { if (validateGuest()) setStep(3); }}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* ────────────── STEP 3 — REVIEW ────────────── */}
          {step === 3 && roomData && pricing && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">Review Your Booking</h3>

              {/* Room */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-4">
                  <img src={roomData.image + '?auto=compress&cs=tinysrgb&w=120'} alt={roomData.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{roomData.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {formatDate(bookingData.checkIn)} – {formatDate(bookingData.checkOut)} ({nights} night{nights > 1 ? 's' : ''})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''}
                      {bookingData.children > 0 && `, ${bookingData.children} Child${bookingData.children > 1 ? 'ren' : ''}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guest */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-4">
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-2 text-sm">Guest Details</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-body space-y-0.5">
                  <p className="text-gray-800 dark:text-gray-200">{guestInfo.firstName} {guestInfo.lastName}</p>
                  <p>{guestInfo.email} · {guestInfo.phone}</p>
                  <p>{guestInfo.country}</p>
                  {guestInfo.idPassport && <p>ID/Passport: {guestInfo.idPassport}</p>}
                  {guestInfo.arrivalTime && <p>Arrival: {guestInfo.arrivalTime}</p>}
                </div>
                {guestInfo.specialRequests && (
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Special Requests</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{guestInfo.specialRequests}</p>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-4 border border-amber-100 dark:border-amber-800/30">
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-3 text-sm">Price Breakdown</h4>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>LKR {pricing.roomPrice.toLocaleString()} × {pricing.nights} night{pricing.nights > 1 ? 's' : ''}</span>
                    <span>LKR {pricing.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Taxes & service charge (15%)</span>
                    <span>LKR {pricing.taxes.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-amber-200 dark:border-amber-700 pt-2 flex justify-between font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>LKR {pricing.total.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-amber-200 dark:border-amber-700 pt-2 flex justify-between text-amber-800 dark:text-amber-400 font-bold">
                    <span>Advance Payment (30%)</span>
                    <span>LKR {pricing.advanceAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                    Remaining LKR {(pricing.total - pricing.advanceAmount).toLocaleString()} payable at check-in.
                  </p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6 border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-300 font-body">
                    <p className="font-medium mb-1">Cancellation Policy</p>
                    <ul className="list-disc list-inside space-y-0.5 text-xs">
                      <li>Free cancellation up to 72 hours before check-in</li>
                      <li>50% refund for cancellations within 24–72 hours</li>
                      <li>No refund for cancellations within 24 hours or no-show</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="btn-outline">Back</button>
                <button onClick={() => setStep(4)} className="btn-primary">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {/* ────────────── STEP 4 — PAYMENT ────────────── */}
          {step === 4 && pricing && roomData && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">Payment</h3>

              {/* Amount due */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-4 border border-amber-100 dark:border-amber-800/30 text-center">
                <p className="text-xs text-amber-700 dark:text-amber-400 uppercase tracking-wide font-body mb-1">Advance Payment Due</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">LKR {pricing.advanceAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-body mt-1">30% of LKR {pricing.total.toLocaleString()} total</p>
              </div>

              {/* Bank Transfer */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-amber-600" />
                  <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-sm">Bank Transfer</h4>
                </div>
                <div className="space-y-2 text-sm font-body">
                  {[
                    ['Bank', BANK_DETAILS.bankName],
                    ['Account Name', BANK_DETAILS.accountName],
                    ['Account No.', BANK_DETAILS.accountNumber],
                    ['Branch', BANK_DETAILS.branchName],
                    ['SWIFT', BANK_DETAILS.swiftCode],
                  ].map(([lbl, val]) => (
                    <div key={lbl} className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">{lbl}</span>
                      <span className="font-medium text-gray-900 dark:text-white select-all">{val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-body">
                  <strong className="text-gray-700 dark:text-gray-300">Reference:</strong> Use your booking reference as the payment reference. You will receive the reference after confirming.
                </p>
              </div>

              {/* Pay at Check-in */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                  <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-sm">Pay at Check-in</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
                  You may also pay the full amount upon arrival. Cash (LKR / USD) and card payments accepted at the front desk.
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-sm">What Happens Next</h4>
                </div>
                <ol className="text-sm text-gray-600 dark:text-gray-400 font-body space-y-1 list-decimal list-inside">
                  <li>We'll send a confirmation email with your booking reference.</li>
                  <li>Our team will contact you within 2 hours to finalise details.</li>
                  <li>Transfer the advance within 24 hours to secure your dates.</li>
                  <li>Arrive and enjoy your stay at Amaluna!</li>
                </ol>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="btn-outline">Back</button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;