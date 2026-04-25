// Site Settings Service - Manages site content settings with localStorage persistence

export interface SiteSettings {
  homepageStats: {
    happyGuests: number;
    roomCategories: number;
    guestRating: number;
    fromAirport: number;
  };
  ratings: {
    starRating: number;
    totalReviews: number;
  };
  video: {
    youtubeId: string;
    videoTitle: string;
  };
  social: {
    googleMapsUrl: string;
    tripAdvisorUrl: string;
    googleBusinessUrl: string;
  };
  faqs: {
    pool: { id: string; question: string; answer: string }[];
    events: { id: string; question: string; answer: string }[];
    dining: { id: string; question: string; answer: string }[];
    roomsDefault: { id: string; question: string; answer: string }[];
    roomsById: Record<string, { id: string; question: string; answer: string }[]>;
  };
}

const STORAGE_KEY = 'amaluna-site-settings';

const defaultSettings: SiteSettings = {
  homepageStats: {
    happyGuests: 5000,
    roomCategories: 4,
    guestRating: 4.8,
    fromAirport: 15,
  },
  ratings: {
    starRating: 4.7,
    totalReviews: 156,
  },
  video: {
    youtubeId: '1J5fGcvRBzI',
    videoTitle: 'Amaluna Resorts Video Tour',
  },
  social: {
    googleMapsUrl: '',
    tripAdvisorUrl: '',
    googleBusinessUrl: '',
  },
  faqs: {
    pool: [
      {
        id: 'pool-1',
        question: 'What are the pool operating hours?',
        answer:
          'Our pool is open daily from 6:00 AM to 10:00 PM for resort guests. Day-pass visitors can enjoy pool access during their specified time slots.',
      },
      {
        id: 'pool-2',
        question: "Is there a children's area?",
        answer:
          "Yes, we have a shallow section of the pool that's perfect for children. Children must be supervised by adults at all times.",
      },
      {
        id: 'pool-3',
        question: 'Are lockers available?',
        answer:
          'Yes, secure lockers are available for day-pass guests to store personal belongings. Keys are provided at check-in.',
      },
      {
        id: 'pool-4',
        question: 'Can I bring my own food and drinks?',
        answer:
          'Outside food and beverages are not permitted. However, our poolside bar and restaurant offer a wide selection of refreshments and meals.',
      },
      {
        id: 'pool-5',
        question: 'Do I need to book in advance?',
        answer:
          'We recommend booking day-passes in advance, especially during weekends and holidays, to guarantee availability.',
      },
      {
        id: 'pool-6',
        question: 'What should I bring?',
        answer:
          'Just bring swimwear, sunscreen, and a valid ID. We provide towels, lounge chairs, and shower facilities.',
      },
    ],
    events: [
      {
        id: 'events-1',
        question: 'How far in advance should I book?',
        answer:
          'We recommend booking at least 6-8 weeks in advance for weekends and special dates. For larger events, 2-3 months advance booking ensures the best availability.',
      },
      {
        id: 'events-2',
        question: 'Can you accommodate dietary restrictions?',
        answer:
          'Absolutely. Our chefs can prepare vegetarian, vegan, gluten-free, and other special dietary requirements with advance notice.',
      },
      {
        id: 'events-3',
        question: 'Do you provide decorations?',
        answer:
          'Yes, we offer decoration services including tropical flowers, linens, lighting, and themed setups. We can also work with your preferred decorators.',
      },
      {
        id: 'events-4',
        question: 'Is there parking available for guests?',
        answer:
          'Yes, we provide complimentary parking for event guests. Our parking area can accommodate cars and small buses.',
      },
    ],
    dining: [
      {
        id: 'dining-1',
        question: 'Do you accept walk-ins?',
        answer:
          'Walk-ins are welcome based on availability. For the best experience, we recommend reserving in advance—especially on weekends and holidays.',
      },
      {
        id: 'dining-2',
        question: 'Can you accommodate dietary requirements?',
        answer:
          'Yes. We can accommodate vegetarian, vegan, gluten-free, and other dietary needs. Please mention your requirements when booking or ordering.',
      },
      {
        id: 'dining-3',
        question: 'Do you offer a kids menu?',
        answer:
          "We can prepare kid-friendly options on request. Please ask our team for today's available choices.",
      },
      {
        id: 'dining-4',
        question: 'Is the restaurant open to non-resort guests?',
        answer:
          'Yes, dining is available to both resort guests and visitors, subject to seating availability.',
      },
    ],
    roomsDefault: [
      {
        id: 'rooms-1',
        question: 'What are the check-in and check-out times?',
        answer: 'Check-in is at 2:00 PM and check-out is at 11:00 AM.',
      },
      {
        id: 'rooms-2',
        question: 'Is Wi‑Fi included?',
        answer: 'Complimentary high-speed Wi‑Fi is available throughout the resort, including all rooms.',
      },
      {
        id: 'rooms-3',
        question: 'Do you offer airport transfers?',
        answer:
          'Yes, airport transfers can be arranged for an additional fee. Please contact us in advance to schedule pickup and drop-off.',
      },
      {
        id: 'rooms-4',
        question: 'Is early check-in or late check-out available?',
        answer:
          'Early check-in and late check-out may be available upon request, subject to occupancy and housekeeping schedules.',
      },
    ],
    roomsById: {},
  },
};

export function getSiteSettings(): SiteSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const parsedRoomsDefault = Array.isArray(parsed?.faqs?.roomsDefault)
        ? parsed.faqs.roomsDefault
        : Array.isArray(parsed?.faqs?.rooms)
          ? parsed.faqs.rooms
          : undefined;

      const parsedRoomsById =
        parsed?.faqs?.roomsById && typeof parsed.faqs.roomsById === 'object' && !Array.isArray(parsed.faqs.roomsById)
          ? parsed.faqs.roomsById
          : undefined;

      // Merge with defaults to handle any missing fields
      return {
        homepageStats: { ...defaultSettings.homepageStats, ...parsed.homepageStats },
        ratings: { ...defaultSettings.ratings, ...parsed.ratings },
        video: { ...defaultSettings.video, ...parsed.video },
        social: { ...defaultSettings.social, ...parsed.social },
        faqs: {
          pool: Array.isArray(parsed?.faqs?.pool) ? parsed.faqs.pool : defaultSettings.faqs.pool,
          events: Array.isArray(parsed?.faqs?.events) ? parsed.faqs.events : defaultSettings.faqs.events,
          dining: Array.isArray(parsed?.faqs?.dining) ? parsed.faqs.dining : defaultSettings.faqs.dining,
          roomsDefault: parsedRoomsDefault ?? defaultSettings.faqs.roomsDefault,
          roomsById: Object.fromEntries(
            Object.entries(parsedRoomsById ?? defaultSettings.faqs.roomsById).map(([roomId, faqs]) => [
              roomId,
              Array.isArray(faqs) ? faqs : [],
            ]),
          ),
        },
      };
    }
  } catch (error) {
    console.error('Error loading site settings:', error);
  }
  return { ...defaultSettings };
}

export function saveSiteSettings(settings: SiteSettings): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving site settings:', error);
    return false;
  }
}

export function getDefaultSettings(): SiteSettings {
  return { ...defaultSettings };
}
