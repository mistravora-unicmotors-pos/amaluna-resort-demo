import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, BedDouble } from 'lucide-react';

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

export default function AdminRooms() {
  const [rooms] = useState(sampleRooms);

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
        <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
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
                  <button className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
