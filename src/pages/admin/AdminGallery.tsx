import { useState } from 'react';
import { Trash2, Grid, List, Eye, Upload, Heart, X } from 'lucide-react';
import { getGalleryStats, getAllPhotoLikeCounts } from '../../services/galleryService';

interface GalleryImage {
  id: string;
  numericId: number;
  name: string;
  url: string;
  category: string;
  uploadDate: string;
  size: string;
}

const sampleImages: GalleryImage[] = [
  { id: 'IMG-001', numericId: 1, name: 'Pool Area Sunset', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400', category: 'Pool', uploadDate: '2025-02-10', size: '2.4 MB' },
  { id: 'IMG-002', numericId: 2, name: 'Deluxe Room Interior', url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400', category: 'Rooms', uploadDate: '2025-02-08', size: '1.8 MB' },
  { id: 'IMG-003', numericId: 3, name: 'Restaurant Dining', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', category: 'Dining', uploadDate: '2025-02-05', size: '3.1 MB' },
  { id: 'IMG-004', numericId: 4, name: 'Lagoon View', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400', category: 'Views', uploadDate: '2025-02-03', size: '2.7 MB' },
  { id: 'IMG-005', numericId: 5, name: 'Lobby Entrance', url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400', category: 'Property', uploadDate: '2025-02-01', size: '1.5 MB' },
  { id: 'IMG-006', numericId: 6, name: 'Beach at Dawn', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', category: 'Views', uploadDate: '2025-01-28', size: '2.9 MB' },
  { id: 'IMG-007', numericId: 7, name: 'Suite Bathroom', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400', category: 'Rooms', uploadDate: '2025-01-25', size: '1.6 MB' },
  { id: 'IMG-008', numericId: 8, name: 'Breakfast Spread', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', category: 'Dining', uploadDate: '2025-01-20', size: '2.2 MB' },
];

const categories = ['All', 'Pool', 'Rooms', 'Dining', 'Views', 'Property'];
type ModalType = 'upload' | 'view' | 'delete' | null;

export default function AdminGallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [uploadForm, setUploadForm] = useState({ name: '', category: 'Pool' });

  const galleryStats = getGalleryStats();
  const likeCounts = getAllPhotoLikeCounts();
  const filtered = sampleImages.filter(img => category === 'All' || img.category === category);

  const toggleSelect = (id: string) => {
    setSelected(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const openModal = (type: ModalType, image?: GalleryImage) => {
    setModalType(type);
    setSelectedImage(image || null);
    if (type === 'upload') setUploadForm({ name: '', category: 'Pool' });
  };

  const closeModal = () => { setModalType(null); setSelectedImage(null); };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-red-500/20"><Heart className="h-5 w-5 text-red-600 dark:text-red-400" /></div>
          <div><p className="text-sm text-gray-500 dark:text-gray-400">Total Photo Likes</p><p className="text-xl font-bold text-gray-900 dark:text-white">{galleryStats.totalLikes}</p></div>
        </div>
        <div className="text-xs text-gray-500">{galleryStats.lastUpdated && `Last updated: ${new Date(galleryStats.lastUpdated).toLocaleDateString()}`}</div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (<button key={c} onClick={() => setCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${category === c ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700'}`}>{c}</button>))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selected.size > 0 && (<button onClick={() => openModal('delete')} className="flex items-center gap-1.5 bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30 text-xs font-medium px-3 py-2 rounded-lg transition-colors"><Trash2 className="h-3.5 w-3.5" /> Delete ({selected.size})</button>)}
          <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}><Grid className="h-4 w-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}><List className="h-4 w-4" /></button>
          </div>
          <button onClick={() => openModal('upload')} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"><Upload className="h-4 w-4" /> Upload</button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(img => (
            <div key={img.id} className={`bg-white dark:bg-gray-800 rounded-xl border overflow-hidden cursor-pointer group transition-all ${selected.has(img.id) ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`} onClick={() => toggleSelect(img.id)}>
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <button onClick={(e) => { e.stopPropagation(); openModal('view', img); }} className="opacity-0 group-hover:opacity-100 transition-opacity"><Eye className="h-6 w-6 text-white" /></button>
                </div>
                <div className={`absolute top-2 left-2 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${selected.has(img.id) ? 'bg-amber-500 border-amber-500' : 'border-gray-400/50 dark:border-white/50 bg-white/50 dark:bg-black/20'}`}>{selected.has(img.id) && <span className="text-white text-xs">✓</span>}</div>
              </div>
              <div className="p-3"><div className="flex items-center justify-between"><div className="flex-1 min-w-0"><p className="text-gray-900 dark:text-white text-sm font-medium truncate">{img.name}</p><p className="text-gray-500 text-xs">{img.category} · {img.size}</p></div>{(likeCounts[img.numericId] || 0) > 0 && (<div className="flex items-center gap-1 text-red-600 dark:text-red-400 ml-2"><Heart className="h-3.5 w-3.5 fill-red-600 dark:fill-red-400" /><span className="text-xs font-medium">{likeCounts[img.numericId]}</span></div>)}</div></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead><tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><th className="text-left px-5 py-3 font-medium w-12" /><th className="text-left px-5 py-3 font-medium">Image</th><th className="text-left px-5 py-3 font-medium">Category</th><th className="text-left px-5 py-3 font-medium">Likes</th><th className="text-left px-5 py-3 font-medium">Size</th><th className="text-left px-5 py-3 font-medium">Uploaded</th><th className="text-right px-5 py-3 font-medium">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.map(img => (
                <tr key={img.id} className="hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3"><button onClick={() => toggleSelect(img.id)} className={`h-5 w-5 rounded border-2 flex items-center justify-center ${selected.has(img.id) ? 'bg-amber-500 border-amber-500' : 'border-gray-300 dark:border-gray-600'}`}>{selected.has(img.id) && <span className="text-white text-xs">✓</span>}</button></td>
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><img src={img.url} alt={img.name} className="h-10 w-14 object-cover rounded" /><span className="text-gray-900 dark:text-white">{img.name}</span></div></td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{img.category}</td>
                  <td className="px-5 py-3">{(likeCounts[img.numericId] || 0) > 0 ? (<div className="flex items-center gap-1 text-red-600 dark:text-red-400"><Heart className="h-3.5 w-3.5 fill-red-600 dark:fill-red-400" /><span className="text-xs font-medium">{likeCounts[img.numericId]}</span></div>) : (<span className="text-gray-500 dark:text-gray-600 text-xs">0</span>)}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{img.size}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{img.uploadDate}</td>
                  <td className="px-5 py-3 text-right"><button onClick={() => openModal('view', img)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><Eye className="h-4 w-4" /></button><button onClick={() => { setSelected(new Set([img.id])); openModal('delete'); }} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-1"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalType === 'upload' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"><h3 className="text-gray-900 dark:text-white font-semibold">Upload Images</h3><button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="h-5 w-5" /></button></div>
            <div className="p-4 space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Drag & drop images here</p>
                <p className="text-gray-400 text-xs">or click to browse</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
              <div><label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Image Name</label><input type="text" value={uploadForm.name} onChange={e => setUploadForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Pool sunset view" className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
              <div><label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Category</label><select value={uploadForm.category} onChange={e => setUploadForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none">{categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}</select></div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700"><button onClick={closeModal} className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Cancel</button><button onClick={closeModal} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">Upload</button></div>
          </div>
        </div>
      )}

      {modalType === 'view' && selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-gray-300"><X className="h-8 w-8" /></button>
          <div className="max-w-4xl w-full"><img src={selectedImage.url.replace('w=400', 'w=1200')} alt={selectedImage.name} className="w-full h-auto max-h-[80vh] object-contain rounded-lg" /><div className="text-center mt-4"><p className="text-white font-medium">{selectedImage.name}</p><p className="text-gray-400 text-sm">{selectedImage.category} · {selectedImage.size} · Uploaded {selectedImage.uploadDate}</p></div></div>
        </div>
      )}

      {modalType === 'delete' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" /></div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">Delete {selected.size} Image{selected.size > 1 ? 's' : ''}?</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3 justify-center"><button onClick={closeModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors">Cancel</button><button onClick={() => { setSelected(new Set()); closeModal(); }} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">Delete</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
