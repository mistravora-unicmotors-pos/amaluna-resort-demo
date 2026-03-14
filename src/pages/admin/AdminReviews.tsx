import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  guest: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  source: string;
  status: 'Published' | 'Pending' | 'Hidden';
  response?: string;
}

const sampleReviews: Review[] = [
  { id: 'RV-001', guest: 'John S.', rating: 5, title: 'Perfect paradise!', comment: 'Amazing stay, beautiful lagoon views and excellent staff. The Sri Lankan breakfast was incredible!', date: '2025-02-12', source: 'Google', status: 'Published', response: 'Thank you John! We are glad you enjoyed your stay.' },
  { id: 'RV-002', guest: 'Sarah J.', rating: 4, title: 'Great location, friendly staff', comment: 'Loved the proximity to the airport and beach. Room was clean and comfortable. Pool area is beautiful.', date: '2025-02-10', source: 'TripAdvisor', status: 'Published' },
  { id: 'RV-003', guest: 'Michael C.', rating: 5, title: 'Best hotel in Negombo', comment: 'We have stayed in several hotels in Negombo and Amaluna is by far the best. The food, service, and ambiance are outstanding.', date: '2025-02-08', source: 'Booking.com', status: 'Pending' },
  { id: 'RV-004', guest: 'Emma W.', rating: 3, title: 'Decent but room for improvement', comment: 'Nice property but the breakfast options could be more varied. WiFi was slow at times.', date: '2025-02-05', source: 'Google', status: 'Published' },
  { id: 'RV-005', guest: 'David L.', rating: 5, title: 'Our favorite Sri Lankan retreat', comment: 'We keep coming back. The staff remembers us and always go above and beyond. The new pool area is fantastic!', date: '2025-02-01', source: 'Direct', status: 'Published' },
];

const statusColors: Record<string, string> = {
  Published: 'bg-emerald-500/20 text-emerald-400',
  Pending: 'bg-amber-500/20 text-amber-400',
  Hidden: 'bg-gray-500/20 text-gray-400',
};

export default function AdminReviews() {
  const [reviews] = useState(sampleReviews);
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 text-center">
          <p className="text-3xl font-bold text-amber-400">{avgRating}</p>
          <div className="flex justify-center gap-0.5 my-1">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`h-4 w-4 ${s <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
            ))}
          </div>
          <p className="text-xs text-gray-500">Average Rating</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 text-center">
          <p className="text-3xl font-bold text-white">{reviews.length}</p>
          <p className="text-xs text-gray-500 mt-2">Total Reviews</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 text-center">
          <p className="text-3xl font-bold text-emerald-400">{reviews.filter(r => r.response).length}</p>
          <p className="text-xs text-gray-500 mt-2">Responded</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 text-center">
          <p className="text-3xl font-bold text-amber-400">{reviews.filter(r => r.status === 'Pending').length}</p>
          <p className="text-xs text-gray-500 mt-2">Pending</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map(review => (
          <div key={review.id} className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-semibold">{review.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[review.status]}`}>
                    {review.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="text-gray-400">{review.guest}</span>
                  <span className="text-gray-600">·</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-500 text-xs">{review.source}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-500 text-xs">{review.date}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">{review.comment}</p>

            {review.response && (
              <div className="bg-gray-700/30 rounded-lg p-3 mb-3 border-l-2 border-amber-500">
                <p className="text-xs text-amber-400 font-medium mb-1">Management Response</p>
                <p className="text-gray-300 text-sm">{review.response}</p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
              <button className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-xs flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" /> Reply
              </button>
              <button className="text-gray-400 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-xs flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5" /> Approve
              </button>
              <button className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-xs flex items-center gap-1">
                <ThumbsDown className="h-3.5 w-3.5" /> Hide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
