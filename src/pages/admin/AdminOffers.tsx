import { useState } from 'react';
import { Plus, Edit2, Trash2, Tag, Calendar, ToggleLeft, ToggleRight, X } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validFrom: string;
  validTo: string;
  code: string;
  active: boolean;
  usageCount: number;
}

const sampleOffers: Offer[] = [
  { id: 'OF-001', title: 'Early Bird Special', description: 'Book 30 days in advance and save', discount: '20%', validFrom: '2025-01-01', validTo: '2025-06-30', code: 'EARLY20', active: true, usageCount: 45 },
  { id: 'OF-002', title: 'Honeymoon Package', description: 'Romantic getaway with dinner & spa', discount: '15%', validFrom: '2025-02-01', validTo: '2025-12-31', code: 'LOVE15', active: true, usageCount: 12 },
  { id: 'OF-003', title: 'Weekend Escape', description: 'Friday to Sunday special rate', discount: '10%', validFrom: '2025-01-15', validTo: '2025-04-30', code: 'WEEKEND10', active: false, usageCount: 78 },
  { id: 'OF-004', title: 'Family Fun', description: 'Kids stay free with 2 paying adults', discount: 'Kids Free', validFrom: '2025-03-01', validTo: '2025-08-31', code: 'FAMILY', active: true, usageCount: 23 },
  { id: 'OF-005', title: 'Long Stay Discount', description: '7+ nights consecutive stay discount', discount: '25%', validFrom: '2025-01-01', validTo: '2025-12-31', code: 'STAY25', active: true, usageCount: 8 },
];

type ModalType = 'add' | 'edit' | 'delete' | null;

export default function AdminOffers() {
  const [offers, setOffers] = useState(sampleOffers);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', discount: '', code: '', validFrom: '', validTo: '' });

  const toggleActive = (id: string) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, active: !o.active } : o));
  };

  const openModal = (type: ModalType, offer?: Offer) => {
    setModalType(type);
    setSelectedOffer(offer || null);
    if (offer && type === 'edit') {
      setFormData({ title: offer.title, description: offer.description, discount: offer.discount, code: offer.code, validFrom: offer.validFrom, validTo: offer.validTo });
    } else if (type === 'add') {
      setFormData({ title: '', description: '', discount: '', code: '', validFrom: '', validTo: '' });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedOffer(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-gray-400 text-sm">{offers.filter(o => o.active).length} active offers</p>
        <button onClick={() => openModal('add')} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> New Offer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {offers.map(offer => (
          <div key={offer.id} className={`bg-gray-800 rounded-xl border ${offer.active ? 'border-gray-700' : 'border-gray-700/50 opacity-60'} p-5`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Tag className="h-4 w-4 text-amber-400" />
                  {offer.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{offer.description}</p>
              </div>
              <button onClick={() => toggleActive(offer.id)} className="flex-shrink-0">
                {offer.active ? <ToggleRight className="h-6 w-6 text-emerald-400" /> : <ToggleLeft className="h-6 w-6 text-gray-600" />}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Discount</p>
                <p className="text-amber-400 font-bold text-lg">{offer.discount}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Code</p>
                <p className="text-white font-mono text-sm">{offer.code}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Used</p>
                <p className="text-white font-bold text-lg">{offer.usageCount}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {offer.validFrom} — {offer.validTo}
              </p>
              <div className="flex gap-1">
                <button onClick={() => openModal('edit', offer)} className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => openModal('delete', offer)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Offer Modal */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">{modalType === 'add' ? 'Create New Offer' : 'Edit Offer'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Offer Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea rows={2} value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Discount</label>
                  <input type="text" value={formData.discount} onChange={e => setFormData(p => ({ ...p, discount: e.target.value }))} placeholder="20% or Kids Free" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Promo Code</label>
                  <input type="text" value={formData.code} onChange={e => setFormData(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="SAVE20" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm font-mono focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Valid From</label>
                  <input type="date" value={formData.validFrom} onChange={e => setFormData(p => ({ ...p, validFrom: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Valid To</label>
                  <input type="date" value={formData.validTo} onChange={e => setFormData(p => ({ ...p, validTo: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-700">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={closeModal} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">{modalType === 'add' ? 'Create Offer' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && selectedOffer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Delete Offer?</h3>
              <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete <span className="text-white font-medium">{selectedOffer.title}</span>?</p>
              <div className="flex gap-3 justify-center">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors">Cancel</button>
                <button onClick={closeModal} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
