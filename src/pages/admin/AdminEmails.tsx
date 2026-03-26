import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Mail, Copy, X } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  body: string;
  lastModified: string;
  type: 'Booking' | 'Marketing' | 'System';
  active: boolean;
}

const sampleTemplates: EmailTemplate[] = [
  { id: 'ET-001', name: 'Booking Confirmation', subject: 'Your Reservation at Amaluna Resorts - {{booking_id}}', description: 'Sent automatically when a booking is confirmed', body: 'Dear {{guest_name}},\n\nThank you for choosing Amaluna Resorts!\n\nYour booking has been confirmed:\nBooking Reference: {{booking_id}}\nCheck-in: {{check_in_date}}\nCheck-out: {{check_out_date}}\n\nWe look forward to welcoming you!\n\nBest regards,\nAmaluna Resorts Team', lastModified: '2025-01-15', type: 'Booking', active: true },
  { id: 'ET-002', name: 'Pre-Arrival Welcome', subject: "We're preparing for your arrival! - Amaluna Resorts", description: 'Sent 3 days before check-in with arrival info', body: 'Dear {{guest_name}},\n\nWe are excited to welcome you in just 3 days!', lastModified: '2025-01-20', type: 'Booking', active: true },
  { id: 'ET-003', name: 'Post-Stay Thank You', subject: 'Thank you for staying with us!', description: 'Sent 1 day after checkout with review request', body: 'Dear {{guest_name}},\n\nThank you for staying at Amaluna Resorts.', lastModified: '2025-01-18', type: 'Booking', active: true },
  { id: 'ET-004', name: 'Cancellation Notice', subject: 'Booking Cancellation - {{booking_id}}', description: 'Sent when a booking is cancelled', body: 'Dear {{guest_name}},\n\nYour booking {{booking_id}} has been cancelled.', lastModified: '2025-01-10', type: 'System', active: true },
  { id: 'ET-005', name: 'Special Offer Newsletter', subject: 'Exclusive Offers Just for You - Amaluna Resorts', description: 'Monthly newsletter with current offers and events', body: 'Dear Guest,\n\nCheck out our latest offers!', lastModified: '2025-02-01', type: 'Marketing', active: false },
  { id: 'ET-006', name: 'Inquiry Auto-Reply', subject: 'Thank you for your inquiry - Amaluna Resorts', description: 'Automatic reply to website contact form submissions', body: 'Dear {{name}},\n\nThank you for contacting us.', lastModified: '2025-01-12', type: 'System', active: true },
];

const typeColors: Record<string, string> = { Booking: 'bg-blue-500/20 text-blue-400', Marketing: 'bg-purple-500/20 text-purple-400', System: 'bg-gray-500/20 text-gray-400' };
type ModalType = 'add' | 'edit' | 'preview' | 'delete' | null;

export default function AdminEmails() {
  const [templates] = useState(sampleTemplates);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [formData, setFormData] = useState({ name: '', subject: '', description: '', body: '', type: 'Booking' as EmailTemplate['type'] });

  const openModal = (type: ModalType, template?: EmailTemplate) => {
    setModalType(type);
    setSelectedTemplate(template || null);
    if (template && type === 'edit') setFormData({ name: template.name, subject: template.subject, description: template.description, body: template.body, type: template.type });
    else if (type === 'add') setFormData({ name: '', subject: '', description: '', body: '', type: 'Booking' });
  };

  const closeModal = () => { setModalType(null); setSelectedTemplate(null); };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-gray-400 text-sm">{templates.length} templates configured</p>
        <button onClick={() => openModal('add')} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"><Plus className="h-4 w-4" /> New Template</button>
      </div>

      <div className="space-y-3">
        {templates.map(tpl => (
          <div key={tpl.id} className={`bg-gray-800 rounded-xl border border-gray-700 p-5 ${!tpl.active ? 'opacity-50' : ''}`}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-2.5 rounded-lg bg-gray-700 flex-shrink-0"><Mail className="h-5 w-5 text-amber-400" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1"><h3 className="text-white font-semibold">{tpl.name}</h3><span className={`px-2 py-0.5 rounded text-[10px] font-medium ${typeColors[tpl.type]}`}>{tpl.type}</span>{!tpl.active && <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/20 text-red-400">Inactive</span>}</div>
                  <p className="text-gray-400 text-sm mb-1 truncate">Subject: <span className="text-gray-300">{tpl.subject}</span></p>
                  <p className="text-gray-500 text-xs">{tpl.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => openModal('preview', tpl)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Preview"><Eye className="h-4 w-4" /></button>
                <button onClick={() => openModal('edit', tpl)} className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Edit"><Edit2 className="h-4 w-4" /></button>
                <button className="text-gray-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Duplicate"><Copy className="h-4 w-4" /></button>
                <button onClick={() => openModal('delete', tpl)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-3 border-t border-gray-700 pt-3">Last modified: {tpl.lastModified}</p>
          </div>
        ))}
      </div>

      {modalType === 'preview' && selectedTemplate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700"><h3 className="text-white font-semibold">Email Preview</h3><button onClick={closeModal} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="p-4 overflow-y-auto max-h-[60vh]"><div className="bg-white rounded-lg p-6 text-gray-900"><p className="text-sm text-gray-500 mb-2">Subject: <span className="text-gray-900 font-medium">{selectedTemplate.subject}</span></p><hr className="my-4" /><pre className="font-sans text-sm whitespace-pre-wrap">{selectedTemplate.body}</pre></div></div>
            <div className="flex justify-end p-4 border-t border-gray-700"><button onClick={closeModal} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors">Close</button></div>
          </div>
        </div>
      )}

      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700"><h3 className="text-white font-semibold">{modalType === 'add' ? 'Create Template' : 'Edit Template'}</h3><button onClick={closeModal} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1"><label className="block text-sm text-gray-400 mb-1">Template Name</label><input type="text" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
                <div className="col-span-2 sm:col-span-1"><label className="block text-sm text-gray-400 mb-1">Type</label><select value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value as EmailTemplate['type'] }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none"><option>Booking</option><option>Marketing</option><option>System</option></select></div>
              </div>
              <div><label className="block text-sm text-gray-400 mb-1">Subject Line</label><input type="text" value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="Use {{variable}} for dynamic content" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Description</label><input type="text" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="When is this email sent?" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
              <div><label className="block text-sm text-gray-400 mb-1">Email Body</label><textarea rows={8} value={formData.body} onChange={e => setFormData(p => ({ ...p, body: e.target.value }))} placeholder="Email content..." className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none font-mono" /></div>
              <p className="text-gray-500 text-xs">Variables: {"{{guest_name}}, {{booking_id}}, {{check_in_date}}, {{check_out_date}}"}</p>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-700"><button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button><button onClick={closeModal} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">{modalType === 'add' ? 'Create' : 'Save'}</button></div>
          </div>
        </div>
      )}

      {modalType === 'delete' && selectedTemplate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="h-6 w-6 text-red-400" /></div>
              <h3 className="text-white font-semibold text-lg mb-2">Delete Template?</h3>
              <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete <span className="text-white font-medium">{selectedTemplate.name}</span>?</p>
              <div className="flex gap-3 justify-center"><button onClick={closeModal} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors">Cancel</button><button onClick={closeModal} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">Delete</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
