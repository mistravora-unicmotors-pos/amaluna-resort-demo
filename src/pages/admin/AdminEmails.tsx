import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Mail, Copy } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  lastModified: string;
  type: 'Booking' | 'Marketing' | 'System';
  active: boolean;
}

const sampleTemplates: EmailTemplate[] = [
  { id: 'ET-001', name: 'Booking Confirmation', subject: 'Your Reservation at Amaluna Resorts - {{booking_id}}', description: 'Sent automatically when a booking is confirmed', lastModified: '2025-01-15', type: 'Booking', active: true },
  { id: 'ET-002', name: 'Pre-Arrival Welcome', subject: 'We\'re preparing for your arrival! - Amaluna Resorts', description: 'Sent 3 days before check-in with arrival info', lastModified: '2025-01-20', type: 'Booking', active: true },
  { id: 'ET-003', name: 'Post-Stay Thank You', subject: 'Thank you for staying with us!', description: 'Sent 1 day after checkout with review request', lastModified: '2025-01-18', type: 'Booking', active: true },
  { id: 'ET-004', name: 'Cancellation Notice', subject: 'Booking Cancellation - {{booking_id}}', description: 'Sent when a booking is cancelled', lastModified: '2025-01-10', type: 'System', active: true },
  { id: 'ET-005', name: 'Special Offer Newsletter', subject: 'Exclusive Offers Just for You - Amaluna Resorts', description: 'Monthly newsletter with current offers and events', lastModified: '2025-02-01', type: 'Marketing', active: false },
  { id: 'ET-006', name: 'Inquiry Auto-Reply', subject: 'Thank you for your inquiry - Amaluna Resorts', description: 'Automatic reply to website contact form submissions', lastModified: '2025-01-12', type: 'System', active: true },
];

const typeColors: Record<string, string> = {
  Booking: 'bg-blue-500/20 text-blue-400',
  Marketing: 'bg-purple-500/20 text-purple-400',
  System: 'bg-gray-500/20 text-gray-400',
};

export default function AdminEmails() {
  const [templates] = useState(sampleTemplates);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-gray-400 text-sm">{templates.length} templates configured</p>
        <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> New Template
        </button>
      </div>

      <div className="space-y-3">
        {templates.map(tpl => (
          <div key={tpl.id} className={`bg-gray-800 rounded-xl border border-gray-700 p-5 ${!tpl.active ? 'opacity-50' : ''}`}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-2.5 rounded-lg bg-gray-700 flex-shrink-0">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold">{tpl.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${typeColors[tpl.type]}`}>{tpl.type}</span>
                    {!tpl.active && <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/20 text-red-400">Inactive</span>}
                  </div>
                  <p className="text-gray-400 text-sm mb-1 truncate">Subject: <span className="text-gray-300">{tpl.subject}</span></p>
                  <p className="text-gray-500 text-xs">{tpl.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Preview">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Edit">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Duplicate">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-xs mt-3 border-t border-gray-700 pt-3">Last modified: {tpl.lastModified}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
