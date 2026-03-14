import { useState } from 'react';
import { Search, Plus, Edit3, X, Eye, EyeOff, Trash2, Image } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type MenuCategory = 'Starters' | 'Main Course' | 'Seafood' | 'Rice & Noodles' | 'Desserts' | 'Beverages' | 'Cocktails';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  image: string;
  available: boolean;
  dietary: string[];   // e.g. ['Vegetarian', 'Gluten-Free']
  popular: boolean;
}

// ---------------------------------------------------------------------------
// Sample data — Sri Lankan / international cuisine
// ---------------------------------------------------------------------------
const sampleMenu: MenuItem[] = [
  { id: 'MI-001', name: 'Devilled Prawns', description: 'Spicy stir-fried prawns with capsicum, onion & chilli paste', category: 'Starters', price: 1800, image: '', available: true, dietary: [], popular: true },
  { id: 'MI-002', name: 'Vegetable Spring Rolls', description: 'Crispy rolls filled with julienned vegetables, served with sweet chilli sauce', category: 'Starters', price: 950, image: '', available: true, dietary: ['Vegetarian'], popular: false },
  { id: 'MI-003', name: 'Tom Yum Soup', description: 'Authentic Thai hot & sour soup with prawns, lemongrass & galangal', category: 'Starters', price: 1200, image: '', available: true, dietary: [], popular: true },
  { id: 'MI-004', name: 'Chicken Kottu Roti', description: 'Chopped roti stir-fried with chicken, vegetables & Sri Lankan spices', category: 'Main Course', price: 1500, image: '', available: true, dietary: [], popular: true },
  { id: 'MI-005', name: 'Lamprais', description: 'Dutch-Burgher rice & curry baked in banana leaf — Amaluna signature', category: 'Main Course', price: 2200, image: '', available: true, dietary: [], popular: true },
  { id: 'MI-006', name: 'Grilled Chicken Breast', description: 'Herb-marinated chicken with roasted vegetables & garlic mash', category: 'Main Course', price: 1800, image: '', available: true, dietary: ['Gluten-Free'], popular: false },
  { id: 'MI-007', name: 'Vegetable Biriyani', description: 'Fragrant basmati rice layered with spiced seasonal vegetables', category: 'Main Course', price: 1400, image: '', available: true, dietary: ['Vegetarian'], popular: false },
  { id: 'MI-008', name: 'Grilled Lagoon Prawns', description: 'Jumbo lagoon prawns with garlic butter, lemon & herb salad', category: 'Seafood', price: 3200, image: '', available: true, dietary: ['Gluten-Free'], popular: true },
  { id: 'MI-009', name: 'Fish Ambul Thiyal', description: 'Traditional sour fish curry with goraka & black pepper', category: 'Seafood', price: 2400, image: '', available: true, dietary: ['Gluten-Free'], popular: true },
  { id: 'MI-010', name: 'Seafood Pasta', description: 'Linguine with prawns, calamari, mussels in white wine sauce', category: 'Seafood', price: 2600, image: '', available: false, dietary: [], popular: false },
  { id: 'MI-011', name: 'Egg Fried Rice', description: 'Wok-fried rice with scrambled egg, vegetables & soy', category: 'Rice & Noodles', price: 1100, image: '', available: true, dietary: ['Vegetarian'], popular: false },
  { id: 'MI-012', name: 'Seafood Nasi Goreng', description: 'Indonesian fried rice with shrimp, chicken satay & fried egg', category: 'Rice & Noodles', price: 1800, image: '', available: true, dietary: [], popular: true },
  { id: 'MI-013', name: 'Watalappam', description: 'Traditional Sri Lankan coconut custard pudding with jaggery', category: 'Desserts', price: 750, image: '', available: true, dietary: ['Vegetarian', 'Gluten-Free'], popular: true },
  { id: 'MI-014', name: 'Chocolate Lava Cake', description: 'Warm-centred dark chocolate cake with vanilla ice cream', category: 'Desserts', price: 1100, image: '', available: true, dietary: ['Vegetarian'], popular: true },
  { id: 'MI-015', name: 'Fresh Fruit Platter', description: 'Seasonal tropical fruits — papaya, mango, pineapple, wood-apple', category: 'Desserts', price: 800, image: '', available: true, dietary: ['Vegetarian', 'Gluten-Free', 'Vegan'], popular: false },
  { id: 'MI-016', name: 'King Coconut', description: 'Fresh thambili served chilled — the ultimate tropical refreshment', category: 'Beverages', price: 350, image: '', available: true, dietary: ['Vegan'], popular: true },
  { id: 'MI-017', name: 'Ceylon Iced Tea', description: 'Chilled black tea with lemon & cane sugar', category: 'Beverages', price: 450, image: '', available: true, dietary: ['Vegan'], popular: false },
  { id: 'MI-018', name: 'Fresh Juice Selection', description: 'Mango, watermelon, passion fruit, or lime — squeezed to order', category: 'Beverages', price: 600, image: '', available: true, dietary: ['Vegan'], popular: false },
  { id: 'MI-019', name: 'Arrack Sour', description: 'Sri Lankan coconut arrack, lime, sugar syrup & egg white', category: 'Cocktails', price: 1200, image: '', available: true, dietary: [], popular: true },
  { id: 'MI-020', name: 'Tropical Sunset', description: 'Rum, mango purée, passion fruit & coconut cream — house signature', category: 'Cocktails', price: 1400, image: '', available: true, dietary: [], popular: true },
];

const categories: MenuCategory[] = ['Starters', 'Main Course', 'Seafood', 'Rice & Noodles', 'Desserts', 'Beverages', 'Cocktails'];

const dietaryColors: Record<string, string> = {
  Vegetarian: 'bg-green-600/20 text-green-400',
  Vegan: 'bg-emerald-600/20 text-emerald-400',
  'Gluten-Free': 'bg-amber-600/20 text-amber-400',
};

const fmt = (n: number) => `LKR ${n.toLocaleString()}`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AdminMenu() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [availFilter, setAvailFilter] = useState<string>('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenu);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form
  const emptyItem = { name: '', description: '', category: 'Main Course' as MenuCategory, price: 0, image: '', dietary: [] as string[], popular: false };
  const [newItem, setNewItem] = useState(emptyItem);

  // Stats
  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(i => i.available).length;
  const unavailableItems = totalItems - availableItems;

  // Filters
  const filtered = menuItems.filter(i => {
    const q = search.toLowerCase();
    const matchesSearch = i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
    const matchesCat = catFilter === 'All' || i.category === catFilter;
    const matchesAvail = availFilter === 'All' || (availFilter === 'Available' ? i.available : !i.available);
    return matchesSearch && matchesCat && matchesAvail;
  });

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
  };

  const togglePopular = (id: string) => {
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, popular: !i.popular } : i));
  };

  const deleteItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  const handleAddItem = () => {
    const item: MenuItem = {
      id: `MI-${String(menuItems.length + 1).padStart(3, '0')}`,
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      price: newItem.price,
      image: '',
      available: true,
      dietary: newItem.dietary,
      popular: newItem.popular,
    };
    setMenuItems(prev => [...prev, item]);
    setShowAddModal(false);
    setNewItem(emptyItem);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    setMenuItems(prev => prev.map(i => i.id === editingItem.id ? editingItem : i));
    setEditingItem(null);
  };

  const toggleNewDietary = (tag: string) => {
    setNewItem(prev => ({
      ...prev,
      dietary: prev.dietary.includes(tag) ? prev.dietary.filter(d => d !== tag) : [...prev.dietary, tag],
    }));
  };

  const toggleEditDietary = (tag: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      dietary: editingItem.dietary.includes(tag) ? editingItem.dietary.filter(d => d !== tag) : [...editingItem.dietary, tag],
    });
  };

  return (
    <div className="space-y-4">
      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-2xl font-bold text-white">{totalItems}</p>
          <p className="text-xs text-gray-400">Total Menu Items</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-2xl font-bold text-emerald-400">{availableItems}</p>
          <p className="text-xs text-gray-400">Currently Available</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-2xl font-bold text-red-400">{unavailableItems}</p>
          <p className="text-xs text-gray-400">Unavailable</p>
        </div>
      </div>

      {/* ── Search, Filters & Actions ── */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu items…" className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <button onClick={() => setShowAddModal(true)} className="px-3 py-2 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 transition-colors"><Plus className="h-3.5 w-3.5" /> Add Item</button>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 mr-1">Category:</span>
          {['All', ...categories].map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${catFilter === c ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>{c}</button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 mr-1">Status:</span>
          {['All', 'Available', 'Unavailable'].map(s => (
            <button key={s} onClick={() => setAvailFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${availFilter === s ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* ── Menu Items Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className={`bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-opacity ${!item.available ? 'opacity-60' : ''}`}>
            {/* Card header */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                    {item.popular && <span className="text-xs text-amber-400">★</span>}
                  </div>
                  <p className="text-amber-400 font-medium text-xs mt-0.5">{fmt(item.price)}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">{item.category}</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">{item.description}</p>

              {/* Dietary tags */}
              {item.dietary.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.dietary.map(d => (
                    <span key={d} className={`px-2 py-0.5 rounded-full text-xs font-medium ${dietaryColors[d] || 'bg-gray-700 text-gray-300'}`}>{d}</span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                <button onClick={() => toggleAvailability(item.id)} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${item.available ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30' : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'}`}>
                  {item.available ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {item.available ? 'Available' : 'Hidden'}
                </button>
                <button onClick={() => togglePopular(item.id)} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${item.popular ? 'bg-amber-600/20 text-amber-400' : 'bg-gray-700 text-gray-400'}`}>★ Popular</button>
                <div className="flex-1" />
                <button onClick={() => setEditingItem(item)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"><Edit3 className="h-3.5 w-3.5" /></button>
                <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg bg-gray-700 hover:bg-red-600/30 text-gray-300 hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="py-12 text-center text-gray-500 text-sm">No menu items match your filters.</div>}
      <p className="text-xs text-gray-600 text-right">{filtered.length} of {menuItems.length} items shown</p>

      {/* ── Add Item Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white">Add Menu Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Item Name *</label>
                <input type="text" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Description *</label>
                <textarea value={newItem.description} onChange={e => setNewItem(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category *</label>
                  <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value as MenuCategory }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Price (LKR) *</label>
                  <input type="number" min={0} value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: parseInt(e.target.value) || 0 }))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Dietary Tags</label>
                <div className="flex flex-wrap gap-2">
                  {['Vegetarian', 'Vegan', 'Gluten-Free'].map(tag => (
                    <button key={tag} type="button" onClick={() => toggleNewDietary(tag)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${newItem.dietary.includes(tag) ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-400 border border-gray-600'}`}>{tag}</button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={newItem.popular} onChange={e => setNewItem(p => ({ ...p, popular: e.target.checked }))} className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-amber-600 focus:ring-amber-500" />
                <span className="text-sm text-gray-300">Mark as Popular</span>
              </label>
              <button onClick={handleAddItem} disabled={!newItem.name || !newItem.description || newItem.price <= 0} className="w-full py-3 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Add to Menu</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Item Modal ── */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-white">Edit {editingItem.name}</h3>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Item Name</label>
                <input type="text" value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Description</label>
                <textarea value={editingItem.description} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} rows={2} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category</label>
                  <select value={editingItem.category} onChange={e => setEditingItem({ ...editingItem, category: e.target.value as MenuCategory })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Price (LKR)</label>
                  <input type="number" min={0} value={editingItem.price} onChange={e => setEditingItem({ ...editingItem, price: parseInt(e.target.value) || 0 })} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Dietary Tags</label>
                <div className="flex flex-wrap gap-2">
                  {['Vegetarian', 'Vegan', 'Gluten-Free'].map(tag => (
                    <button key={tag} type="button" onClick={() => toggleEditDietary(tag)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${editingItem.dietary.includes(tag) ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-400 border border-gray-600'}`}>{tag}</button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editingItem.popular} onChange={e => setEditingItem({ ...editingItem, popular: e.target.checked })} className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-amber-600 focus:ring-amber-500" />
                <span className="text-sm text-gray-300">Mark as Popular</span>
              </label>
              <button onClick={handleSaveEdit} className="w-full py-3 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
