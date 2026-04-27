import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { db, collection, query, where, onSnapshot } from '../firebase';
import { Order } from '../types';
import { motion } from 'motion/react';
import { Package, Clock, CheckCircle, XCircle, Truck, User, MapPin, Phone, Mail } from 'lucide-react';

export const UserPanel: React.FC = () => {
  const { user, logout } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      // Filter out cancelled orders as they should be removed permanently
      const activeOrders = ordersData.filter(o => o.status !== 'cancelled');
      setOrders(activeOrders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'processing': return <Package size={14} />;
      case 'shipped': return <Truck size={14} />;
      case 'delivered': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      case 'cancelled': return 0;
      default: return 1;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 sticky top-24">
            <div className="text-center mb-8">
              <img 
                src={user.photoURL || 'https://via.placeholder.com/150'} 
                alt={user.displayName} 
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-mango-yellow shadow-md"
              />
              <h2 className="text-xl font-display font-bold text-mango-dark">{user.displayName}</h2>
              <p className="text-stone-500 text-sm">{user.email}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-mango-green/10 text-mango-green text-[10px] font-bold rounded-full uppercase tracking-wider">
                {user.role} Account
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Mail size={16} className="text-mango-green" />
                <span>{user.email}</span>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Phone size={16} className="text-mango-green" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <MapPin size={16} className="text-mango-green" />
                  <span>{user.address}</span>
                </div>
              )}
            </div>

            <button 
              onClick={logout}
              className="w-full py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 transition-all text-sm uppercase tracking-widest"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-mango-dark">Order History</h2>
              <span className="text-sm text-stone-500 font-medium">{orders.length} Orders Found</span>
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-mango-yellow border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-stone-500">Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-20 text-center bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                <Package size={48} className="text-stone-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-mango-dark mb-2">No orders yet</h3>
                <p className="text-stone-500 mb-6">Start your mango journey today!</p>
                <button className="px-8 py-3 bg-mango-yellow text-mango-dark font-bold rounded-xl hover:bg-mango-orange hover:text-white transition-all">
                  Browse Mangoes
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-stone-100 rounded-2xl p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Order ID</p>
                        <p className="text-sm font-mono font-bold text-mango-dark">#{order.id?.slice(-8).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Date</p>
                        <p className="text-sm font-bold text-mango-dark">
                          {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Just now'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-sm font-bold text-mango-orange">Rs. {order.totalAmount.toLocaleString()}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>

                    {/* Tracking Bar */}
                    {order.status !== 'cancelled' && (
                      <div className="mb-8 px-4">
                        <div className="relative h-2 bg-stone-100 rounded-full overflow-hidden mb-4">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(getStatusStep(order.status) / 4) * 100}%` }}
                            className={`absolute h-full transition-all duration-1000 ${getStatusStep(order.status) === 4 ? 'bg-mango-green' : 'bg-mango-orange'}`}
                          />
                        </div>
                        <div className="flex justify-between text-[8px] font-bold text-stone-400 uppercase tracking-widest">
                          <span className={getStatusStep(order.status) >= 1 ? 'text-mango-dark' : ''}>Pending</span>
                          <span className={getStatusStep(order.status) >= 2 ? 'text-mango-dark' : ''}>Processing</span>
                          <span className={getStatusStep(order.status) >= 3 ? 'text-mango-dark' : ''}>Shipped</span>
                          <span className={getStatusStep(order.status) >= 4 ? 'text-mango-dark' : ''}>Delivered</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 py-2 border-t border-stone-50 first:border-t-0">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-mango-dark">{item.name}</h4>
                            <p className="text-xs text-stone-500">{item.selectedWeight}kg Box x {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-mango-dark">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-stone-100 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <MapPin size={14} />
                        <span>{order.shippingAddress.city}</span>
                      </div>
                      <button className="text-xs font-bold text-mango-green hover:text-mango-orange transition-colors uppercase tracking-widest">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
