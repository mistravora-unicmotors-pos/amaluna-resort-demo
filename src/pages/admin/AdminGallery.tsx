import { useState } from 'react';
import { Trash2, Grid, List, Eye, Upload } from 'lucide-react';

interface GalleryImage {
  id: string;
  name: string;
  url: string;
  category: string;
  uploadDate: string;
  size: string;
}

const sampleImages: GalleryImage[] = [
  { id: 'IMG-001', name: 'Pool Area Sunset', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400', category: 'Pool', uploadDate: '2025-02-10', size: '2.4 MB' },
  { id: 'IMG-002', name: 'Deluxe Room Interior', url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400', category: 'Rooms', uploadDate: '2025-02-08', size: '1.8 MB' },
  { id: 'IMG-003', name: 'Restaurant Dining', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', category: 'Dining', uploadDate: '2025-02-05', size: '3.1 MB' },
  { id: 'IMG-004', name: 'Lagoon View', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400', category: 'Views', uploadDate: '2025-02-03', size: '2.7 MB' },
  { id: 'IMG-005', name: 'Lobby Entrance', url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400', category: 'Property', uploadDate: '2025-02-01', size: '1.5 MB' },
  { id: 'IMG-006', name: 'Beach at Dawn', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', category: 'Views', uploadDate: '2025-01-28', size: '2.9 MB' },
  { id: 'IMG-007', name: 'Suite Bathroom', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400', category: 'Rooms', uploadDate: '2025-01-25', size: '1.6 MB' },
  { id: 'IMG-008', name: 'Breakfast Spread', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', category: 'Dining', uploadDate: '2025-01-20', size: '2.2 MB' },
];

const categories = ['All', 'Pool', 'Rooms', 'Dining', 'Views', 'Property'];

export default function AdminGallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = sampleImages.filter(img => category === 'All' || img.category === category);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                category === c ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selected.size > 0 && (
            <button className="flex items-center gap-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
              <Trash2 className="h-3.5 w-3.5" /> Delete ({selected.size})
            </button>
          )}
          <div className="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <Upload className="h-4 w-4" /> Upload
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(img => (
            <div
              key={img.id}
              className={`bg-gray-800 rounded-xl border overflow-hidden cursor-pointer group transition-all ${
                selected.has(img.id) ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => toggleSelect(img.id)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className={`absolute top-2 left-2 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selected.has(img.id) ? 'bg-amber-500 border-amber-500' : 'border-white/50 bg-black/20'
                }`}>
                  {selected.has(img.id) && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium truncate">{img.name}</p>
                <p className="text-gray-500 text-xs">{img.category} · {img.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left px-5 py-3 font-medium w-12" />
                <th className="text-left px-5 py-3 font-medium">Image</th>
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-5 py-3 font-medium">Size</th>
                <th className="text-left px-5 py-3 font-medium">Uploaded</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filtered.map(img => (
                <tr key={img.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleSelect(img.id)}
                      className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                        selected.has(img.id) ? 'bg-amber-500 border-amber-500' : 'border-gray-600'
                      }`}
                    >
                      {selected.has(img.id) && <span className="text-white text-xs">✓</span>}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={img.url} alt={img.name} className="h-10 w-14 object-cover rounded" />
                      <span className="text-white">{img.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{img.category}</td>
                  <td className="px-5 py-3 text-gray-400">{img.size}</td>
                  <td className="px-5 py-3 text-gray-400">{img.uploadDate}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
