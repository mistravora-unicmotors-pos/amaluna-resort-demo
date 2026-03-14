// =============================================================================
// Booking Service — Centralized room data, pricing, and booking logic
// Prepared for eZee PMS integration. All functions marked with TODO comments
// at integration points for easy swap from mock → real API.
// =============================================================================

// ---------------------------------------------------------------------------
// eZee PMS Configuration — fill these when integrating
// ---------------------------------------------------------------------------
export const EZEE_CONFIG = {
  apiKey: '',      // TODO: Set eZee API key
  hotelId: '',     // TODO: Set eZee Hotel ID
  baseUrl: '',     // TODO: Set eZee API base URL (e.g. https://live.ipms247.com/api)
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface Room {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;          // per night in LKR
  image: string;
  images: string[];
  amenities: string[];
  occupancy: string;
  maxAdults: number;
  maxChildren: number;
}

export interface BookingRequest {
  roomId: string;
  checkIn: string;        // YYYY-MM-DD
  checkOut: string;
  adults: number;
  children: number;
  promoCode: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    idPassport: string;
    arrivalTime: string;
    specialRequests: string;
  };
}

export interface PricingBreakdown {
  roomPrice: number;      // per night
  nights: number;
  subtotal: number;
  taxRate: number;
  taxes: number;
  advanceRate: number;    // e.g. 0.30 = 30%
  advanceAmount: number;
  total: number;
}

export interface BookingResponse {
  success: boolean;
  bookingRef: string;     // e.g. BK-23A7F
  message: string;
  pricing: PricingBreakdown;
}

// ---------------------------------------------------------------------------
// Room Data — Single source of truth
// ---------------------------------------------------------------------------
export const rooms: Room[] = [
  {
    id: 'lagoon-view-king',
    name: 'Lagoon View King',
    shortDescription: 'A bright king room with tranquil lagoon views and a private balcony.',
    description: 'Experience tranquil mornings with beautiful lagoon views from your private balcony. This spacious king room features contemporary Sri Lankan design with modern comforts, perfect for couples seeking a peaceful retreat.',
    price: 12500,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
    ],
    amenities: ['King bed', 'Air conditioning', 'Private ensuite bathroom', 'Private balcony with lagoon view', 'Complimentary Wi-Fi', 'Tea & coffee making facilities', 'Flat-screen TV', 'Mini-fridge'],
    occupancy: '2 adults',
    maxAdults: 2,
    maxChildren: 0,
  },
  {
    id: 'garden-twin',
    name: 'Garden Twin',
    shortDescription: 'Ground-floor twin room opening to leafy garden paths.',
    description: 'Ground-floor convenience meets garden serenity in this comfortable twin room. Step directly onto leafy garden paths from your private patio, ideal for families or friends traveling together.',
    price: 10500,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    ],
    amenities: ['Twin beds', 'Air conditioning', 'Private ensuite bathroom', 'Garden patio', 'Complimentary Wi-Fi', 'Flat-screen TV', 'Tea & coffee facilities'],
    occupancy: '2 adults / 2+1 child',
    maxAdults: 2,
    maxChildren: 1,
  },
  {
    id: 'family-suite',
    name: 'Family Suite',
    shortDescription: 'Two rooms and extra space—ideal for families.',
    description: 'Our most spacious accommodation featuring separate sleeping areas and extra amenities. Perfect for families needing room to spread out while maintaining comfort and privacy for everyone.',
    price: 18500,
    image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
    images: [
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    ],
    amenities: ['King bedroom', 'Separate twin bedroom', 'Air conditioning', 'Private ensuite bathroom', 'Mini-fridge', 'Complimentary Wi-Fi', 'Flat-screen TV', 'Seating area'],
    occupancy: '4 guests',
    maxAdults: 4,
    maxChildren: 2,
  },
  {
    id: 'poolside-deluxe',
    name: 'Poolside Deluxe',
    shortDescription: "A few steps from the resort's large pool and loungers.",
    description: 'Just steps from our resort-style pool, this deluxe room offers immediate access to loungers and poolside service. Perfect for guests who want to maximize their pool and sun time.',
    price: 14500,
    image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    images: [
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    ],
    amenities: ['King bed', 'Air conditioning', 'Private ensuite bathroom', 'Pool-facing patio', 'Complimentary Wi-Fi', 'Flat-screen TV', 'Direct pool access'],
    occupancy: '2–3 guests',
    maxAdults: 3,
    maxChildren: 1,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getRoomById(id: string): Room | undefined {
  return rooms.find(r => r.id === id);
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const ADVANCE_RATE = 0.30;   // 30 % advance — admin-configurable later
const TAX_RATE = 0.15;       // 15 % taxes & service charge

export function calculatePricing(
  roomId: string,
  nights: number,
  _promoCode?: string,       // TODO: implement promo code discounts
): PricingBreakdown | null {
  const room = getRoomById(roomId);
  if (!room) return null;

  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes;
  const advanceAmount = Math.round(total * ADVANCE_RATE);

  return {
    roomPrice: room.price,
    nights,
    subtotal,
    taxRate: TAX_RATE,
    taxes,
    advanceRate: ADVANCE_RATE,
    advanceAmount,
    total,
  };
}

// ---------------------------------------------------------------------------
// Availability Check
// ---------------------------------------------------------------------------
export async function checkAvailability(
  _roomId: string,
  _checkIn: string,
  _checkOut: string,
): Promise<{ available: boolean; message: string }> {
  // TODO: Replace with eZee PMS API call
  // const res = await fetch(`${EZEE_CONFIG.baseUrl}/availability`, { ... });
  // return res.json();

  // Mock — always available
  return { available: true, message: 'Room is available for your selected dates.' };
}

// ---------------------------------------------------------------------------
// Create Booking
// ---------------------------------------------------------------------------
function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'BK-';
  for (let i = 0; i < 5; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export async function createBooking(request: BookingRequest): Promise<BookingResponse> {
  // TODO: Replace with eZee PMS API call
  // const res = await fetch(`${EZEE_CONFIG.baseUrl}/booking`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${EZEE_CONFIG.apiKey}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ hotelId: EZEE_CONFIG.hotelId, ...request }),
  // });
  // return res.json();

  const nights = calculateNights(request.checkIn, request.checkOut);
  const pricing = calculatePricing(request.roomId, nights, request.promoCode);

  if (!pricing) {
    return {
      success: false,
      bookingRef: '',
      message: 'Unable to process booking. Please try again or contact us directly.',
      pricing: { roomPrice: 0, nights: 0, subtotal: 0, taxRate: 0, taxes: 0, advanceRate: 0, advanceAmount: 0, total: 0 },
    };
  }

  const bookingRef = generateBookingRef();

  // Store locally for admin panel reference (no backend)
  try {
    const existing = JSON.parse(localStorage.getItem('amaluna-bookings') || '[]');
    existing.push({
      ref: bookingRef,
      ...request,
      pricing,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    });
    localStorage.setItem('amaluna-bookings', JSON.stringify(existing));
  } catch {
    // localStorage not available — continue
  }

  return {
    success: true,
    bookingRef,
    message: `Booking ${bookingRef} confirmed! We will contact you within 2 hours to finalise.`,
    pricing,
  };
}

// ---------------------------------------------------------------------------
// Bank Details (for advance payment display)
// ---------------------------------------------------------------------------
export const BANK_DETAILS = {
  bankName: 'Seylan Bank',
  accountName: 'Amaluna Resorts (Pvt) Ltd',
  accountNumber: '0000 0000 0000',  // TODO: Set real account number
  branchName: 'Negombo Branch',
  swiftCode: 'SEYBLKLX',
  reference: 'Use your Booking Reference as payment reference',
};
