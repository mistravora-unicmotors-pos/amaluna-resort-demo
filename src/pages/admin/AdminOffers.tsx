import { useState } from 'react';
import { Plus, Edit2, Trash2, Tag, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';

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

export default function AdminOffers() {
  const [offers, setOffers] = useState(sampleOffers);

  const toggleActive = (id: string) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, active: !o.active } : o));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-gray-400 text-sm">{offers.filter(o => o.active).length} active offers</p>
        <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
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
                {offer.active
                  ? <ToggleRight className="h-6 w-6 text-emerald-400" />
                  : <ToggleLeft className="h-6 w-6 text-gray-600" />
                }
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
                <button className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
