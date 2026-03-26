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
};

export function getSiteSettings(): SiteSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle any missing fields
      return {
        homepageStats: { ...defaultSettings.homepageStats, ...parsed.homepageStats },
        ratings: { ...defaultSettings.ratings, ...parsed.ratings },
        video: { ...defaultSettings.video, ...parsed.video },
        social: { ...defaultSettings.social, ...parsed.social },
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
