import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, User, Loader2, MessageSquare } from 'lucide-react';
import { db, collection, onSnapshot, addDoc, serverTimestamp } from '../firebase';
import { useCart } from '../CartContext';
import { Review } from '../types';

export const CustomerReviews: React.FC = () => {
  const { user } = useCart();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString() : 'Just now'
      } as Review));
      setReviews(fetchedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'reviews'), {
        userName: user.displayName,
        userPhoto: user.photoURL,
        rating: newReview.rating,
        comment: newReview.comment,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      setNewReview({ rating: 5, comment: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold text-mango-dark">
              What Our Customers Say
            </h2>
            <p className="text-stone-500 max-w-xl">
              We take pride in delivering the finest mangoes to your doorstep. Here's what our community has to say about their experience.
            </p>
          </div>
          
          {user ? (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-4 bg-mango-yellow text-mango-dark font-bold rounded-2xl hover:bg-mango-orange hover:text-white transition-all shadow-lg flex items-center gap-2"
            >
              {showForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          ) : (
            <p className="text-sm font-bold text-mango-orange bg-mango-orange/5 px-6 py-3 rounded-xl border border-mango-orange/10">
              Please login to leave a review
            </p>
          )}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-16 bg-white p-8 rounded-3xl shadow-xl border border-stone-100 max-w-2xl mx-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <p className="font-bold text-mango-dark">Your Rating:</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`transition-colors ${star <= newReview.rating ? 'text-mango-yellow' : 'text-stone-200'}`}
                      >
                        <Star size={24} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-stone-600">Your Experience</label>
                  <textarea
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Tell us about the taste, quality, and delivery..."
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-mango-yellow outline-none min-h-[120px] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-mango-dark text-white font-bold rounded-2xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                  Submit Review
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl transition-all group"
              >
                <div className="flex text-mango-yellow mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-stone-200"} />
                  ))}
                </div>
                
                <p className="text-stone-600 italic leading-relaxed mb-8 text-sm">
                  "{review.comment}"
                </p>

                {review.reply && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 ml-4 p-4 bg-mango-bg rounded-2xl border-l-4 border-mango-yellow relative"
                  >
                    <div className="absolute -left-3 top-4 w-2 h-2 bg-mango-yellow rotate-45" />
                    <p className="text-[10px] font-bold text-mango-orange uppercase tracking-widest mb-1">MangoMart Reply</p>
                    <p className="text-xs text-stone-600 leading-relaxed">{review.reply}</p>
                  </motion.div>
                )}

                <div className="flex items-center gap-4 pt-6 border-t border-stone-50">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-mango-yellow/10 flex items-center justify-center">
                    {(review as any).userPhoto ? (
                      <img src={(review as any).userPhoto} alt={review.userName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="text-mango-orange" size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-mango-dark text-sm">{review.userName}</h4>
                    <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 rounded-full text-stone-400">
                <MessageSquare size={32} />
              </div>
              <p className="text-stone-400 font-bold">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
