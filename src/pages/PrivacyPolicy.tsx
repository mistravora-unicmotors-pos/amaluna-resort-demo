import { Shield, Database, Cookie, Eye, Lock, Users, Mail, Globe, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import { useState } from 'react';

const sections = [
  { id: 'info-collected', title: 'Information We Collect', icon: Database },
  { id: 'how-use', title: 'How We Use Information', icon: Eye },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie },
  { id: 'data-sharing', title: 'Data Sharing', icon: Users },
  { id: 'security', title: 'Data Security', icon: Lock },
  { id: 'rights', title: 'Your Rights', icon: Shield },
  { id: 'international', title: 'International Transfers', icon: Globe },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('info-collected');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-dark text-white py-16 px-4">
        <div className="container-luxury text-center">
          <Shield className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how Amaluna Resorts collects, uses, and protects your personal data.
          </p>
          <p className="text-gray-400 text-sm mt-4">Last Updated: January 15, 2025</p>
        </div>
      </div>

      <div className="container-luxury py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar TOC */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-50 rounded-2xl p-5">
              <h3 className="font-heading font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Contents</h3>
              <nav className="space-y-1">
                {sections.map(s => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                        activeSection === s.id
                          ? 'bg-white text-amber-700 font-semibold shadow-sm'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{s.title}</span>
                      {activeSection === s.id && <ChevronRight className="h-3 w-3 ml-auto" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 prose prose-gray max-w-none">
            <ScrollReveal>
              <section id="info-collected" className="mb-12 scroll-mt-28">
                <SectionHeader title="Information We Collect" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, nationality, and passport/ID details when making a reservation.</li>
                    <li><strong>Payment Information:</strong> Credit card numbers, billing address, and transaction details processed securely through our payment partners.</li>
                    <li><strong>Booking Details:</strong> Room preferences, check-in/check-out dates, special requests, dietary requirements, and travel purpose.</li>
                    <li><strong>Account Information:</strong> Username, password (encrypted), loyalty program details, and communication preferences.</li>
                    <li><strong>Communication Data:</strong> Emails, enquiry form submissions, chat messages, and feedback provided to our team.</li>
                  </ul>
                  <p>We also automatically collect certain information when you visit our website, including your IP address, browser type, device information, pages visited, and referring URLs through cookies and similar technologies.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="how-use" className="mb-12 scroll-mt-28">
                <SectionHeader title="How We Use Your Information" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Processing and managing your room reservations and other bookings</li>
                    <li>Communicating with you about your stay, including confirmations, reminders, and post-stay feedback requests</li>
                    <li>Managing your loyalty program account and rewards</li>
                    <li>Personalizing your experience based on your preferences and history</li>
                    <li>Sending promotional offers and newsletters (only with your consent)</li>
                    <li>Improving our website, services, and guest experience</li>
                    <li>Complying with legal obligations and resolving disputes</li>
                    <li>Detecting and preventing fraud or unauthorized access</li>
                  </ul>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="cookies" className="mb-12 scroll-mt-28">
                <SectionHeader title="Cookies & Tracking Technologies" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>We use cookies and similar tracking technologies to enhance your browsing experience:</p>
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <div className="border-l-4 border-amber-400 pl-4">
                      <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                      <p className="text-sm">Required for the website to function properly. Cannot be disabled.</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                      <p className="text-sm">Help us understand how visitors interact with our website using Google Analytics.</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                      <p className="text-sm">Used to deliver relevant advertisements and track campaign effectiveness.</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-semibold text-gray-900">Preference Cookies</h4>
                      <p className="text-sm">Remember your language, currency, and other settings.</p>
                    </div>
                  </div>
                  <p>You can manage your cookie preferences through our Cookie Consent banner or through your browser settings.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="data-sharing" className="mb-12 scroll-mt-28">
                <SectionHeader title="Data Sharing & Third Parties" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>We do not sell your personal data. We may share your information with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> Payment processors, email service providers, and IT support partners who help us operate our business</li>
                    <li><strong>Travel Partners:</strong> Airport transfer services, tour operators, and activity providers when you request such services</li>
                    <li><strong>Legal Authorities:</strong> When required by law, regulation, or legal process</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  </ul>
                  <p>All third parties are contractually obligated to protect your data and use it only for the specific purpose for which it was shared.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="security" className="mb-12 scroll-mt-28">
                <SectionHeader title="Data Security" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>We implement appropriate technical and organizational measures to protect your personal data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS encryption for all data transmitted between your browser and our servers</li>
                    <li>Encryption of sensitive data at rest</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls limiting employee access to personal data on a need-to-know basis</li>
                    <li>Staff training on data protection and privacy procedures</li>
                  </ul>
                  <p>While we strive to protect your information, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="rights" className="mb-12 scroll-mt-28">
                <SectionHeader title="Your Rights" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>You have the following rights regarding your personal data:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Access', desc: 'Request a copy of the personal data we hold about you' },
                      { title: 'Rectification', desc: 'Request correction of inaccurate or incomplete data' },
                      { title: 'Erasure', desc: 'Request deletion of your personal data ("right to be forgotten")' },
                      { title: 'Restriction', desc: 'Request restriction of processing in certain circumstances' },
                      { title: 'Portability', desc: 'Receive your data in a portable, machine-readable format' },
                      { title: 'Objection', desc: 'Object to processing based on legitimate interests or marketing' },
                    ].map(right => (
                      <div key={right.title} className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                        <h4 className="font-semibold text-gray-900 mb-1">{right.title}</h4>
                        <p className="text-sm">{right.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p>To exercise any of these rights, please contact our Data Protection Officer using the details below.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="international" className="mb-12 scroll-mt-28">
                <SectionHeader title="International Data Transfers" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>As a hospitality business, your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including standard contractual clauses and data processing agreements, to protect your information during such transfers.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="contact" className="mb-12 scroll-mt-28">
                <SectionHeader title="Contact Us" align="left" />
                <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                  <p className="text-gray-600 mb-4">If you have questions about this Privacy Policy or wish to exercise your rights, please contact:</p>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-semibold">Data Protection Officer</p>
                    <p>Amaluna Resorts</p>
                    <p>Kalpitiya, North Western Province, Sri Lanka</p>
                    <p>Email: <a href="mailto:privacy@amalunaresorts.com" className="text-amber-600 hover:underline">privacy@amalunaresorts.com</a></p>
                    <p>Phone: <a href="tel:+94312230000" className="text-amber-600 hover:underline">+94 31 223 0000</a></p>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
