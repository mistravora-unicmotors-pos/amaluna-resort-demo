import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, BedDouble, X } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  type: string;
  price: string;
  capacity: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
  amenities: string[];
}

const sampleRooms: Room[] = [
  { id: 'R-101', name: 'Deluxe Ocean View', type: 'Deluxe', price: 'LKR 18,500', capacity: 2, status: 'Available', amenities: ['Ocean View', 'AC', 'Mini Bar', 'WiFi'] },
  { id: 'R-102', name: 'Premium Suite', type: 'Suite', price: 'LKR 24,500', capacity: 3, status: 'Occupied', amenities: ['Ocean View', 'AC', 'Jacuzzi', 'Mini Bar', 'WiFi'] },
  { id: 'R-103', name: 'Standard Double', type: 'Standard', price: 'LKR 12,500', capacity: 2, status: 'Available', amenities: ['AC', 'WiFi', 'TV'] },
  { id: 'R-104', name: 'Family Room', type: 'Family', price: 'LKR 22,500', capacity: 4, status: 'Maintenance', amenities: ['Garden View', 'AC', 'WiFi', 'Extra Beds'] },
  { id: 'R-105', name: 'Honeymoon Suite', type: 'Suite', price: 'LKR 32,000', capacity: 2, status: 'Occupied', amenities: ['Lagoon View', 'AC', 'Jacuzzi', 'Private Balcony'] },
  { id: 'R-106', name: 'Superior Room', type: 'Superior', price: 'LKR 16,000', capacity: 2, status: 'Available', amenities: ['Pool View', 'AC', 'WiFi', 'Mini Bar'] },
];

const statusColors: Record<string, string> = {
  Available: 'bg-emerald-500/20 text-emerald-400',
  Occupied: 'bg-blue-500/20 text-blue-400',
  Maintenance: 'bg-amber-500/20 text-amber-400',
};

type ModalType = 'add' | 'edit' | 'view' | 'delete' | null;

export default function AdminRooms() {
  const [rooms] = useState(sampleRooms);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({ name: '', type: 'Standard', price: '', capacity: 2, status: 'Available' as const, amenities: '' });

  const openModal = (type: ModalType, room?: Room) => {
    setModalType(type);
    setSelectedRoom(room || null);
    if (room && type === 'edit') {
      setFormData({ name: room.name, type: room.type, price: room.price.replace('LKR ', ''), capacity: room.capacity, status: room.status, amenities: room.amenities.join(', ') });
    } else if (type === 'add') {
      setFormData({ name: '', type: 'Standard', price: '', capacity: 2, status: 'Available', amenities: '' });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRoom(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-3 flex-wrap">
            {['All', 'Available', 'Occupied', 'Maintenance'].map(s => {
              const count = s === 'All' ? rooms.length : rooms.filter(r => r.status === s).length;
              return (
                <span key={s} className="text-xs text-gray-400">
                  {s}: <span className="text-white font-medium">{count}</span>
                </span>
              );
            })}
          </div>
        </div>
        <button onClick={() => openModal('add')} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{room.name}</h3>
                  <p className="text-gray-500 text-xs font-mono">{room.id}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[room.status]}`}>
                  {room.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <span>{room.type}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {room.capacity} guests</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {room.amenities.map(a => (
                  <span key={a} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{a}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <p className="text-amber-400 font-bold">{room.price}<span className="text-gray-500 font-normal text-xs"> / night</span></p>
                <div className="flex gap-1">
                  <button onClick={() => openModal('view', room)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => openModal('edit', room)} className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => openModal('delete', room)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Room Modal */}
      {modalType === 'view' && selectedRoom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">Room Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between"><span className="text-gray-400">Room ID</span><span className="text-white font-mono">{selectedRoom.id}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Name</span><span className="text-white">{selectedRoom.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Type</span><span className="text-white">{selectedRoom.type}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Price</span><span className="text-amber-400 font-bold">{selectedRoom.price}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Capacity</span><span className="text-white">{selectedRoom.capacity} guests</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400">Status</span><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[selectedRoom.status]}`}>{selectedRoom.status}</span></div>
              <div>
                <span className="text-gray-400 block mb-2">Amenities</span>
                <div className="flex flex-wrap gap-1.5">{selectedRoom.amenities.map(a => <span key={a} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{a}</span>)}</div>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-700">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Room Modal */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">{modalType === 'add' ? 'Add New Room' : 'Edit Room'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Room Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none">
                    <option>Standard</option><option>Deluxe</option><option>Superior</option><option>Suite</option><option>Family</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value as Room['status'] }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none">
                    <option>Available</option><option>Occupied</option><option>Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price (LKR)</label>
                  <input type="text" value={formData.price} onChange={e => setFormData(p => ({ ...p, price: e.target.value }))} placeholder="18,500" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Capacity</label>
                  <input type="number" min="1" max="10" value={formData.capacity} onChange={e => setFormData(p => ({ ...p, capacity: parseInt(e.target.value) }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amenities (comma separated)</label>
                <input type="text" value={formData.amenities} onChange={e => setFormData(p => ({ ...p, amenities: e.target.value }))} placeholder="AC, WiFi, Mini Bar, TV" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-700">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={closeModal} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">{modalType === 'add' ? 'Add Room' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && selectedRoom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Delete Room?</h3>
              <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete <span className="text-white font-medium">{selectedRoom.name}</span>? This action cannot be undone.</p>
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
