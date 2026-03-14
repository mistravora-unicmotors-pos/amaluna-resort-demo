import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://amalunaresorts.com';

interface PageMeta {
  title: string;
  description: string;
}

const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Amaluna Resorts - Easy Luxury by the Lagoon | Negombo, Sri Lanka',
    description: 'Amaluna Resorts - Easy luxury by the lagoon in Negombo, Sri Lanka. Spacious rooms, signature pool, and warm hospitality minutes from the coast.',
  },
  '/rooms': {
    title: 'Rooms & Suites | Amaluna Resorts Negombo',
    description: 'Explore our spacious rooms and suites with lagoon views, garden patios, and modern amenities at Amaluna Resorts, Negombo.',
  },
  '/dining': {
    title: 'Dining & Restaurant | Amaluna Resorts Negombo',
    description: 'Savour authentic Sri Lankan and international cuisine at Amaluna Resorts. Breakfast, lunch, dinner and poolside service.',
  },
  '/pool': {
    title: 'Pool & Day Pass | Amaluna Resorts Negombo',
    description: 'Enjoy our signature swimming pool and day-pass packages at Amaluna Resorts, Negombo. Open daily for guests and visitors.',
  },
  '/offers': {
    title: 'Special Offers & Deals | Amaluna Resorts Negombo',
    description: 'Discover exclusive offers, early bird discounts, honeymoon packages and seasonal deals at Amaluna Resorts, Negombo.',
  },
  '/events': {
    title: 'Events & Celebrations | Amaluna Resorts Negombo',
    description: 'Host weddings, corporate events, and private celebrations at Amaluna Resorts with lakeside venues, catering, and dedicated event planning.',
  },
  '/gallery': {
    title: 'Photo Gallery | Amaluna Resorts Negombo',
    description: 'Browse photos of our rooms, pool, dining, and gardens at Amaluna Resorts, Negombo, Sri Lanka.',
  },
  '/location': {
    title: 'Location & Directions | Amaluna Resorts Negombo',
    description: 'Find Amaluna Resorts at 276 Pamunugama Road, Kepungoda, Negombo. Directions from the airport, Colombo, and nearby attractions.',
  },
  '/contact': {
    title: 'Contact Us | Amaluna Resorts Negombo',
    description: 'Get in touch with Amaluna Resorts. Call, WhatsApp, or email us for reservations, inquiries, and assistance.',
  },
  '/about': {
    title: 'About Us | Amaluna Resorts Negombo',
    description: 'Learn about Amaluna Resorts — our story, values, and commitment to easy luxury by the lagoon in Negombo, Sri Lanka.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Amaluna Resorts',
    description: 'Read the privacy policy of Amaluna Resorts regarding data collection, usage, and your rights.',
  },
  '/terms': {
    title: 'Terms & Conditions | Amaluna Resorts',
    description: 'Review the terms and conditions for bookings, cancellations, and use of Amaluna Resorts services.',
  },
};

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Match exact path or fall back to base path for detail pages like /rooms/:id
    const basePath = '/' + pathname.split('/').filter(Boolean)[0] || '/';
    const meta = pageMeta[pathname] || pageMeta[basePath] || pageMeta['/'];

    // Title
    document.title = meta.title;

    // Meta description
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', meta.description);

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${BASE_URL}${pathname}`);

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `${BASE_URL}${pathname}`);

    // Twitter
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', meta.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', meta.description);
  }, [pathname]);
}
