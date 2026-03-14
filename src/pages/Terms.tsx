import { FileText, CreditCard, Calendar, AlertCircle, Ban, Clock, Shield, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import { useState } from 'react';

const sections = [
  { id: 'general', title: 'General Terms', icon: FileText },
  { id: 'booking', title: 'Booking & Reservations', icon: Calendar },
  { id: 'payment', title: 'Payment Terms', icon: CreditCard },
  { id: 'cancellation', title: 'Cancellation Policy', icon: Ban },
  { id: 'checkin', title: 'Check-in & Check-out', icon: Clock },
  { id: 'conduct', title: 'Guest Conduct', icon: AlertCircle },
  { id: 'liability', title: 'Liability', icon: Shield },
];

const Terms = () => {
  const [activeSection, setActiveSection] = useState('general');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-dark text-white py-16 px-4">
        <div className="container-luxury text-center">
          <FileText className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Please review our terms carefully before making a reservation at Amaluna Resorts.
          </p>
          <p className="text-gray-400 text-sm mt-4">Effective Date: January 15, 2025</p>
        </div>
      </div>

      <div className="container-luxury py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-50 rounded-2xl p-5">
              <h3 className="font-heading font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Sections</h3>
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
          <div className="lg:col-span-3 space-y-12">
            <ScrollReveal>
              <section id="general" className="scroll-mt-28">
                <SectionHeader title="General Terms" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>By accessing and using the Amaluna Resorts website ("Site") and making a reservation, you agree to be bound by these Terms & Conditions ("Terms"). These Terms constitute a legally binding agreement between you and Amaluna Resorts (Pvt) Ltd.</p>
                  <p>We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated effective date. Your continued use of our services after changes are posted constitutes your acceptance of the modified Terms.</p>
                  <p>All content on this website, including text, images, logos, and design, is the property of Amaluna Resorts and is protected by applicable copyright and intellectual property laws.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="booking" className="scroll-mt-28">
                <SectionHeader title="Booking & Reservations" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>Reservations can be made through our website, by phone, or via email. All bookings are subject to availability and confirmation.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A valid credit/debit card is required to guarantee your reservation</li>
                    <li>Guests must be at least 18 years of age to make a reservation</li>
                    <li>Room rates are quoted in Sri Lankan Rupees (LKR) and are inclusive of service charges</li>
                    <li>Government taxes (currently 15%) are applicable and will be added to the final bill</li>
                    <li>Special requests (e.g., room preferences, dietary needs) will be accommodated where possible but cannot be guaranteed</li>
                    <li>The resort reserves the right to allot a room of a similar or higher category if the booked room is unavailable</li>
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                    <p className="text-amber-800 font-medium flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Group bookings of 5 or more rooms are subject to separate terms and require direct confirmation.
                    </p>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="payment" className="scroll-mt-28">
                <SectionHeader title="Payment Terms" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>We accept the following payment methods:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Visa, MasterCard, and American Express credit/debit cards</li>
                    <li>Bank transfers (for advance bookings)</li>
                    <li>Cash payments at check-in (subject to a security deposit)</li>
                  </ul>
                  <p>Payment policies vary by rate type:</p>
                  <div className="bg-gray-50 rounded-xl overflow-hidden mt-4">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-4 font-semibold text-gray-900">Rate Type</th>
                          <th className="text-left p-4 font-semibold text-gray-900">Payment</th>
                          <th className="text-left p-4 font-semibold text-gray-900">Refundable</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200">
                          <td className="p-4">Flexible Rate</td>
                          <td className="p-4">Pay at check-in</td>
                          <td className="p-4 text-green-600 font-medium">Yes</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="p-4">Advance Purchase</td>
                          <td className="p-4">Full payment at booking</td>
                          <td className="p-4 text-red-500 font-medium">No</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="p-4">Special Offers</td>
                          <td className="p-4">50% deposit required</td>
                          <td className="p-4 text-amber-600 font-medium">Partial</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>A security deposit of LKR 5,000 per room may be required at check-in to cover incidentals.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="cancellation" className="scroll-mt-28">
                <SectionHeader title="Cancellation Policy" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>Cancellation policies depend on the rate type and booking period:</p>
                  <div className="space-y-3">
                    {[
                      { period: 'More than 7 days before check-in', policy: 'Full refund (flexible rates only)', color: 'border-green-400' },
                      { period: '3-7 days before check-in', policy: '50% of the first night charged', color: 'border-amber-400' },
                      { period: 'Less than 3 days / no-show', policy: 'Full first night charged', color: 'border-red-400' },
                      { period: 'Advance Purchase rates', policy: 'Non-refundable, non-transferable', color: 'border-red-400' },
                    ].map(item => (
                      <div key={item.period} className={`border-l-4 ${item.color} bg-gray-50 rounded-r-xl p-4`}>
                        <p className="font-semibold text-gray-900">{item.period}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.policy}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4">During peak seasons (December 15 – January 15, April 1-20), a stricter cancellation policy may apply. You will be notified of any special conditions at the time of booking.</p>
                  <p>To cancel or modify a reservation, please contact us at least 24 hours before the applicable deadline via email or phone.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="checkin" className="scroll-mt-28">
                <SectionHeader title="Check-in & Check-out" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                      <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900 text-lg">Check-in</p>
                      <p className="text-2xl font-bold text-green-600">2:00 PM</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
                      <Clock className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900 text-lg">Check-out</p>
                      <p className="text-2xl font-bold text-red-500">11:00 AM</p>
                    </div>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Early check-in is subject to availability and may incur an additional charge</li>
                    <li>Late check-out until 3:00 PM may be available upon request (50% of room rate)</li>
                    <li>Check-out after 3:00 PM will be charged as an additional night</li>
                    <li>Valid government-issued photo ID or passport is required at check-in</li>
                    <li>Guests under 18 must be accompanied by a parent or legal guardian</li>
                  </ul>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="conduct" className="scroll-mt-28">
                <SectionHeader title="Guest Conduct" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>To ensure a pleasant experience for all guests, we ask that you observe the following:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintain reasonable noise levels, especially between 10:00 PM and 7:00 AM</li>
                    <li>Smoking is permitted only in designated areas</li>
                    <li>Pets are not permitted on the property unless prior written approval has been obtained</li>
                    <li>Guests are responsible for any damage caused to hotel property during their stay</li>
                    <li>The resort reserves the right to terminate a stay without refund in cases of disruptive behavior</li>
                    <li>Pool and recreational facilities have specific operating hours and rules posted at each facility</li>
                  </ul>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section id="liability" className="scroll-mt-28">
                <SectionHeader title="Limitation of Liability" align="left" />
                <div className="mt-6 space-y-4 text-gray-600 font-body">
                  <p>Amaluna Resorts shall not be held liable for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Loss, theft, or damage to personal property unless stored in the in-room safe or with the front desk</li>
                    <li>Injuries sustained during recreational activities where safety guidelines were not followed</li>
                    <li>Disruptions caused by force majeure events (natural disasters, political unrest, pandemics)</li>
                    <li>Third-party service failures (transportation, excursions, external catering)</li>
                  </ul>
                  <p>Maximum liability for any claim shall not exceed the total amount paid for the reservation in question.</p>
                  <div className="bg-gray-50 rounded-xl p-4 mt-4 border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of Sri Lanka.
                      Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
                    </p>
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

export default Terms;
