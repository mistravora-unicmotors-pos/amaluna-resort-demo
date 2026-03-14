import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ActionBar from './components/ActionBar';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import ChatBot from './components/ChatBot';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import EmailCapture from './components/EmailCapture';
import { usePageMeta } from './hooks/usePageMeta';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Dining = lazy(() => import('./pages/Dining'));
const Pool = lazy(() => import('./pages/Pool'));
const Offers = lazy(() => import('./pages/Offers'));
const OfferDetail = lazy(() => import('./pages/OfferDetail'));
const Events = lazy(() => import('./pages/Events'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Location = lazy(() => import('./pages/Location'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'));
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings'));
const AdminRooms = lazy(() => import('./pages/admin/AdminRooms'));
const AdminGuests = lazy(() => import('./pages/admin/AdminGuests'));
const AdminOffers = lazy(() => import('./pages/admin/AdminOffers'));
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminEmails = lazy(() => import('./pages/admin/AdminEmails'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminPoolTickets = lazy(() => import('./pages/admin/AdminPoolTickets'));
const AdminRewards = lazy(() => import('./pages/admin/AdminRewards'));
const AdminMenu = lazy(() => import('./pages/admin/AdminMenu'));

// Page loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 border-3 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-500 text-sm font-body">Loading...</p>
    </div>
  </div>
);

// Wrapper to apply per-page SEO meta tags
const PageMetaProvider = ({ children }: { children: React.ReactNode }) => {
  usePageMeta();
  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Admin routes - no Header/Footer/ActionBar */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="guests" element={<AdminGuests />} />
              <Route path="offers" element={<AdminOffers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="emails" element={<AdminEmails />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="pool-tickets" element={<AdminPoolTickets />} />
              <Route path="rewards" element={<AdminRewards />} />
              <Route path="menu" element={<AdminMenu />} />
            </Route>

            {/* Main site routes */}
            <Route path="*" element={
              <PageMetaProvider>
              <div className="min-h-screen bg-white">
                <ScrollToTop />
                <Header />
                <main className="pb-20">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/rooms/:roomId" element={<RoomDetail />} />
                    <Route path="/dining" element={<Dining />} />
                    <Route path="/pool" element={<Pool />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/offers/:offerId" element={<OfferDetail />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/location" element={<Location />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <ActionBar />
                <ChatBot />
                <CookieConsent />
                <PWAInstallPrompt />
                <EmailCapture />
              </div>
              </PageMetaProvider>
            } />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;