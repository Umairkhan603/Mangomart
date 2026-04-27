import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { PRODUCTS } from '../constants';
import { db, collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from '../firebase';
import { Order, Product, UserProfile, Review, BulkInquiry } from '../types';
import { handleFirestoreError, OperationType } from '../lib/error-handler';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, ShoppingBag, Users, Plus, Edit, Trash, 
  CheckCircle, XCircle, Package, Search, MessageSquare, 
  TrendingUp, Calendar, Mail, Phone, ExternalLink, ClipboardCheck,
  Download, Printer, CreditCard, DollarSign, PieChart, BarChart3,
  ArrowRight, FileText, Share2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart as RePieChart, Pie
} from 'recharts';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const AdminPanel: React.FC = () => {
  const { user } = useCart();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'users' | 'inventory' | 'reviews' | 'settings' | 'analytics' | 'bulk'>('dashboard');
  const [analyticsView, setAnalyticsView] = useState<'daily' | 'monthly'>('daily');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<BulkInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataReady, setDataReady] = useState({
    orders: false,
    products: false,
    users: false,
    reviews: false
  });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState<Order | null>(null);
  const [replyingToReviewId, setReplyingToReviewId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<string | null>(null);
  const [adminSettings, setAdminSettings] = useState({
    adminEmail: 'mangomartpakistan@gmail.com',
    whatsappNumber: '03062841484',
    businessName: 'MangoMart Pakistan'
  });
  const [replyText, setReplyText] = useState('');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    variety: '',
    price: 0,
    category: 'Premium',
    description: '',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800'
  });

  const syncProducts = async () => {
    try {
      setLoading(true);
      for (const product of PRODUCTS) {
        await setDoc(doc(db, 'products', product.id), product);
      }
      // alert('Products synced to Firestore successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), newProduct);
      } else {
        const id = Date.now().toString();
        await setDoc(doc(db, 'products', id), { ...newProduct, id });
      }
      setShowAddProduct(false);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        variety: '',
        price: 0,
        category: 'Premium',
        description: '',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'products');
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowAddProduct(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProductToDelete(null);
      // alert('Product deleted successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') return;

    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      
      // Automatically purge any orders that have 'cancelled' status
      allOrders.forEach(async (order) => {
        if (order.status === 'cancelled' && order.id) {
          try {
            await deleteDoc(doc(db, 'orders', order.id));
          } catch (error) {
            console.error("Error purging cancelled order:", error);
          }
        }
      });

      setOrders(allOrders.filter(order => order.status !== 'cancelled'));
      setDataReady(prev => ({ ...prev, orders: true }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'orders'));

    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      setDataReady(prev => ({ ...prev, products: true }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'products'));

    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile)));
      setDataReady(prev => ({ ...prev, users: true }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users'));

    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      setAllReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review)));
      setDataReady(prev => ({ ...prev, reviews: true }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reviews'));

    const unsubBulk = onSnapshot(collection(db, 'bulk_inquiries'), (snapshot) => {
      setBulkInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BulkInquiry)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'bulk_inquiries'));

    const unsubSettings = onSnapshot(doc(db, 'settings', 'admin'), (docSnap) => {
      if (docSnap.exists()) {
        setAdminSettings(docSnap.data() as any);
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'settings/admin'));

    return () => {
      unsubOrders();
      unsubProducts();
      unsubUsers();
      unsubReviews();
      unsubBulk();
      unsubSettings();
    };
  }, [user]);

  useEffect(() => {
    if (dataReady.orders && dataReady.products) {
      setLoading(false);
    }
  }, [dataReady]);

  const deleteOrder = async (orderId: string) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setSelectedOrder(null);
      setOrderToDelete(null);
      // alert('Order deleted successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `orders/${orderId}`);
    }
  };

  const saveSettings = async () => {
    try {
      await setDoc(doc(db, 'settings', 'admin'), adminSettings);
      // alert('Settings saved successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/admin');
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    if (status === 'cancelled') {
      setOrderToDelete(orderId);
      return;
    }
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      if (status === 'processing') {
        const order = orders.find(o => o.id === orderId);
        if (order) setShowReceipt(order);
      }
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: status as any });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: 'paid' | 'unpaid' | 'failed') => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { paymentStatus });
      // alert(`Payment marked as ${paymentStatus.toUpperCase()}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const updateProductStock = async (productId: string, stock: number) => {
    try {
      await updateDoc(doc(db, 'products', productId), { stock });
      // alert('Stock updated successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${productId}`);
    }
  };

  const updateUserRole = async (uid: string, role: 'admin' | 'user') => {
    try {
      await updateDoc(doc(db, 'users', uid), { role });
      setEditingUser(null);
      // alert('User role updated successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
    }
  };

  const submitReviewReply = async (reviewId: string) => {
    if (!replyText.trim()) return;
    try {
      await updateDoc(doc(db, 'reviews', reviewId), { reply: replyText });
      setReplyingToReviewId(null);
      setReplyText('');
      // alert('Reply posted successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `reviews/${reviewId}`);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      setReviewToDelete(null);
      // alert('Review deleted successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `reviews/${reviewId}`);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bulk_inquiries', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bulk_inquiries/${id}`);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'bulk_inquiries', id));
      setInquiryToDelete(null);
      // alert('Inquiry deleted successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `bulk_inquiries/${id}`);
    }
  };

  const sendWhatsAppReceipt = (order: Order) => {
    const phoneNumber = order.shippingAddress.phone.replace(/\D/g, '');
    const itemsList = order.items.map(item => `• ${item.name} (${item.selectedWeight}kg) x ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`).join('\n');
    
    const message = `*MANGO MART PAKISTAN - OFFICIAL RECEIPT*\n` +
      `------------------------------------------\n` +
      `*Order ID:* #${order.id?.toUpperCase()}\n` +
      `*Date:* ${order.createdAt?.toDate ? format(order.createdAt.toDate(), 'PPP') : 'Just now'}\n` +
      `*Customer:* ${order.shippingAddress.fullName}\n` +
      `------------------------------------------\n` +
      `*Items:*\n${itemsList}\n` +
      `------------------------------------------\n` +
      `*Subtotal:* Rs. ${order.totalAmount.toLocaleString()}\n` +
      `*Delivery:* FREE\n` +
      `*TOTAL:* Rs. ${order.totalAmount.toLocaleString()}\n` +
      `------------------------------------------\n` +
      `*Payment Method:* ${order.paymentMethod.toUpperCase()}\n` +
      `*Payment Status:* ${order.paymentStatus?.toUpperCase() || 'PENDING'}\n` +
      `*Order Status:* ${order.status.toUpperCase()}\n` +
      `------------------------------------------\n` +
      `Thank you for choosing MangoMart! Your premium mangoes are being prepared with care.\n\n` +
      `_This is an electronically generated receipt._`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendEmailReceipt = (order: Order) => {
    const subject = `Order Receipt - #${order.id?.toUpperCase()} - ${adminSettings.businessName}`;
    const itemsList = order.items.map(item => `${item.name} (${item.selectedWeight}kg) x ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`).join('\n');
    
    const body = `Hello ${order.shippingAddress.fullName},\n\n` +
      `Thank you for your order with ${adminSettings.businessName}!\n\n` +
      `ORDER SUMMARY:\n` +
      `Order ID: #${order.id?.toUpperCase()}\n` +
      `Status: ${order.status.toUpperCase()}\n` +
      `Payment Status: ${order.paymentStatus?.toUpperCase() || 'PENDING'}\n\n` +
      `ITEMS:\n` +
      `${itemsList}\n\n` +
      `TOTAL AMOUNT: Rs. ${order.totalAmount.toLocaleString()}\n\n` +
      `SHIPPING ADDRESS:\n` +
      `${order.shippingAddress.address}, ${order.shippingAddress.city}\n\n` +
      `We will notify you once your order is shipped.\n\n` +
      `Best Regards,\n` +
      `${adminSettings.businessName} Team`;

    // Direct Gmail link for easier sending from owner's Gmail
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${order.shippingAddress.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

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

  // Stats calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayOrders = orders.filter(o => {
    const orderDate = o.createdAt?.toDate ? o.createdAt.toDate() : new Date(o.createdAt);
    return orderDate >= today;
  });

  const todaySales = todayOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.totalAmount, 0);
  const lowStockProducts = products.filter(p => (p.stock || 0) <= 10);

  // Daily sales for the selected month and year
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(new Date(selectedYear, selectedMonth)),
    end: endOfMonth(new Date(selectedYear, selectedMonth))
  });

  const dailyStats = daysInMonth.map(day => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);

    const dayOrders = orders.filter(o => {
      const orderDate = o.createdAt?.toDate ? o.createdAt.toDate() : new Date(o.createdAt);
      return orderDate >= dayStart && orderDate <= dayEnd && o.status !== 'cancelled';
    });

    return {
      name: format(day, 'MMM d'),
      fullDate: format(day, 'yyyy-MM-dd'),
      value: dayOrders.reduce((acc, o) => acc + o.totalAmount, 0),
      count: dayOrders.length
    };
  });

  // Monthly sales for the selected year
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthlyStats = months.map((month, index) => {
    const monthOrders = orders.filter(o => {
      const orderDate = o.createdAt?.toDate ? o.createdAt.toDate() : new Date(o.createdAt);
      return orderDate.getFullYear() === selectedYear && orderDate.getMonth() === index && o.status !== 'cancelled';
    });

    return {
      name: month,
      value: monthOrders.reduce((acc, o) => acc + o.totalAmount, 0),
      count: monthOrders.length
    };
  });

  const tableData = analyticsView === 'daily' ? [...dailyStats].reverse() : [...monthlyStats].reverse();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mango-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-500 font-bold uppercase tracking-widest text-xs">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-200 max-w-md w-full text-center">
          <XCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-mango-dark mb-2">Access Denied</h2>
          <p className="text-stone-500 mb-6">You do not have administrative privileges to view this page.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-3 bg-mango-yellow text-mango-dark font-bold rounded-xl hover:shadow-lg transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sticky top-24">
            <h2 className="text-xl font-display font-bold text-mango-dark mb-8 px-2">Admin Panel</h2>
            <nav className="space-y-2">
              {[
                { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
                { id: 'orders', icon: <ShoppingBag size={18} />, label: 'Orders' },
                { id: 'products', icon: <Package size={18} />, label: 'Products' },
                { id: 'inventory', icon: <ClipboardCheck size={18} />, label: 'Inventory' },
                { id: 'users', icon: <Users size={18} />, label: 'Users' },
                { id: 'reviews', icon: <MessageSquare size={18} />, label: 'Reviews' },
                { id: 'bulk', icon: <ClipboardCheck size={18} />, label: 'Bulk Inquiries' },
                { id: 'settings', icon: <Edit size={18} />, label: 'Settings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id 
                    ? 'bg-mango-yellow text-mango-dark shadow-sm' 
                    : 'text-stone-500 hover:bg-stone-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="mt-8 pt-8 border-t border-stone-100">
              <button 
                onClick={syncProducts}
                className="w-full flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-mango-green transition-colors"
              >
                <TrendingUp size={14} />
                Sync Products
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-mango-yellow/10 text-mango-orange rounded-lg">
                      <TrendingUp size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Today's Sales</p>
                  </div>
                  <p className="text-2xl font-display font-bold text-mango-dark">Rs. {todaySales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-mango-green/10 text-mango-green rounded-lg">
                      <Calendar size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Today's Orders</p>
                  </div>
                  <p className="text-2xl font-display font-bold text-mango-dark">{todayOrders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-mango-orange/10 text-mango-orange rounded-lg">
                      <ShoppingBag size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Revenue</p>
                  </div>
                  <p className="text-2xl font-display font-bold text-mango-dark">Rs. {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-stone-100 text-stone-600 rounded-lg">
                      <Users size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Customers</p>
                  </div>
                  <p className="text-2xl font-display font-bold text-mango-dark">{users.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                  <h3 className="text-lg font-display font-bold text-mango-dark mb-6">Recent Orders</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-stone-100">
                          <th className="pb-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Order ID</th>
                          <th className="pb-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Customer</th>
                          <th className="pb-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Amount</th>
                          <th className="pb-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Status</th>
                          <th className="pb-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50">
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-stone-400 font-bold uppercase tracking-widest text-[10px]">
                              No active orders found
                            </td>
                          </tr>
                        ) : (
                          orders.slice(0, 5).map((order) => (
                            <tr key={order.id}>
                              <td className="py-4 text-sm font-mono font-bold text-mango-dark">#{order.id?.slice(-8).toUpperCase()}</td>
                              <td className="py-4 text-sm text-stone-600">{order.shippingAddress.fullName}</td>
                              <td className="py-4 text-sm font-bold text-mango-orange">Rs. {order.totalAmount.toLocaleString()}</td>
                              <td className="py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-4">
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => setSelectedOrder(order)}
                                    className="p-1.5 text-stone-400 hover:bg-stone-100 rounded-lg transition-colors"
                                    title="View Details"
                                  >
                                    <ExternalLink size={18} />
                                  </button>
                                  {order.status === 'pending' && (
                                    <button 
                                      onClick={() => updateOrderStatus(order.id!, 'processing')}
                                      className="p-1.5 text-mango-green hover:bg-mango-green/10 rounded-lg transition-colors"
                                      title="Approve Order"
                                    >
                                      <CheckCircle size={18} />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => setOrderToDelete(order.id!)}
                                    className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Order"
                                  >
                                    <Trash size={18} />
                                  </button>
                                  <button 
                                    onClick={() => sendWhatsAppReceipt(order)}
                                    className="p-1.5 text-[#25D366] hover:bg-[#25D366]/10 rounded-lg transition-colors"
                                    title="Send WhatsApp Receipt"
                                  >
                                    <Phone size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-display font-bold text-mango-dark">Low Stock Alerts</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded-md uppercase tracking-widest">
                      {lowStockProducts.length} Items
                    </span>
                  </div>
                  <div className="space-y-4">
                    {lowStockProducts.length > 0 ? (
                      lowStockProducts.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-bold text-mango-dark">{product.name}</p>
                              <p className="text-[10px] text-stone-400 uppercase tracking-widest">{product.variety}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-red-500">{product.stock} left</p>
                            <button 
                              onClick={() => setActiveTab('inventory')}
                              className="text-[10px] font-bold text-mango-green hover:underline uppercase tracking-widest"
                            >
                              Restock
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <CheckCircle size={40} className="text-mango-green/20 mx-auto mb-4" />
                        <p className="text-stone-400 text-sm">All inventory levels are healthy.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-mango-dark">Order Details</h3>
                    <p className="text-sm font-mono text-stone-400">#{selectedOrder.id?.toUpperCase()}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                    <XCircle size={24} className="text-stone-400" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Customer Info</h4>
                    <div className="bg-stone-50 p-4 rounded-2xl space-y-2">
                      <p className="text-sm font-bold text-mango-dark">{selectedOrder.shippingAddress.fullName}</p>
                      <p className="text-sm text-stone-600">{selectedOrder.shippingAddress.email}</p>
                      <p className="text-sm text-stone-600">{selectedOrder.shippingAddress.phone}</p>
                      <p className="text-sm text-stone-600">{selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Order & Payment Status</h4>
                    <div className="bg-stone-50 p-4 rounded-2xl space-y-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Order Status</p>
                        <select 
                          className={`w-full px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-none outline-none cursor-pointer ${getStatusColor(selectedOrder.status)}`}
                          value={selectedOrder.status}
                          onChange={(e) => {
                            updateOrderStatus(selectedOrder.id!, e.target.value);
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Payment Status</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updatePaymentStatus(selectedOrder.id!, 'paid')}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${selectedOrder.paymentStatus === 'paid' ? 'bg-mango-green text-white' : 'bg-white text-stone-400 border border-stone-100'}`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              <CheckCircle size={12} /> Paid
                            </div>
                          </button>
                          <button 
                            onClick={() => updatePaymentStatus(selectedOrder.id!, 'unpaid')}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${selectedOrder.paymentStatus !== 'paid' ? 'bg-yellow-500 text-white' : 'bg-white text-stone-400 border border-stone-100'}`}
                          >
                            Unpaid
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col gap-2">
                        <button 
                          onClick={() => setShowReceipt(selectedOrder)}
                          className="w-full py-2 bg-mango-dark text-white text-[10px] font-bold rounded-lg uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                          <FileText size={14} /> View Receipt
                        </button>
                        <button 
                          onClick={() => setOrderToDelete(selectedOrder.id!)}
                          className="w-full py-2 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                        >
                          <Trash size={14} /> Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Order Items</h4>
                  <div className="border border-stone-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-stone-50">
                        <tr>
                          <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Item</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Qty</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50">
                        {selectedOrder.items.map((item, i) => (
                          <tr key={i}>
                            <td className="px-4 py-3 text-sm text-mango-dark">{item.name}</td>
                            <td className="px-4 py-3 text-sm text-stone-600">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm font-bold text-mango-orange">Rs. {item.price.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-stone-50">
                        <tr>
                          <td colSpan={2} className="px-4 py-3 text-sm font-bold text-mango-dark">Total</td>
                          <td className="px-4 py-3 text-lg font-bold text-mango-orange">Rs. {selectedOrder.totalAmount.toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Receipt Modal */}
          {showReceipt && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto p-0 relative"
              >
                {/* Receipt Header */}
                <div className="bg-mango-dark text-white p-10 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-mango-yellow rounded-lg flex items-center justify-center text-mango-dark font-bold">M</div>
                      <h2 className="text-2xl font-display font-bold tracking-tight">MANGO MART <span className="text-mango-yellow">PAKISTAN</span></h2>
                    </div>
                    <p className="text-stone-400 text-xs uppercase tracking-widest">Official Order Receipt</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-mango-yellow">#{showReceipt.id?.toUpperCase()}</p>
                    <p className="text-xs text-stone-400">{showReceipt.createdAt?.toDate ? format(showReceipt.createdAt.toDate(), 'PPP p') : 'Just now'}</p>
                  </div>
                </div>

                <div className="p-10 space-y-10">
                  {/* Status Badges */}
                  <div className="flex gap-4">
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${getStatusColor(showReceipt.status)}`}>
                      Order: {showReceipt.status}
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${showReceipt.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      Payment: {showReceipt.paymentStatus || 'Pending'}
                    </div>
                  </div>

                  {/* Customer & Shipping */}
                  <div className="grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Bill To:</h4>
                      <p className="text-lg font-bold text-mango-dark mb-1">{showReceipt.shippingAddress.fullName}</p>
                      <p className="text-sm text-stone-600">{showReceipt.shippingAddress.email}</p>
                      <p className="text-sm text-stone-600">{showReceipt.shippingAddress.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Shipping Address:</h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {showReceipt.shippingAddress.address}<br />
                        {showReceipt.shippingAddress.city}, Pakistan
                      </p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="border border-stone-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-stone-50">
                        <tr>
                          <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Description</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Qty</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">Price</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50">
                        {showReceipt.items.map((item, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4">
                              <p className="text-sm font-bold text-mango-dark">{item.name}</p>
                              <p className="text-[10px] text-stone-400 uppercase tracking-widest">{item.selectedWeight}kg Premium Box</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-stone-600 text-center">{item.quantity}</td>
                            <td className="px-6 py-4 text-sm text-stone-600 text-right">Rs. {item.price.toLocaleString()}</td>
                            <td className="px-6 py-4 text-sm font-bold text-mango-dark text-right">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end">
                    <div className="w-full md:w-64 space-y-3">
                      <div className="flex justify-between text-sm text-stone-500">
                        <span>Subtotal</span>
                        <span>Rs. {showReceipt.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-stone-500">
                        <span>Delivery Fee</span>
                        <span className="text-mango-green font-bold">FREE</span>
                      </div>
                      <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
                        <span className="text-lg font-display font-bold text-mango-dark">Total</span>
                        <span className="text-2xl font-display font-bold text-mango-orange">Rs. {showReceipt.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-10 border-t border-stone-100 flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => sendWhatsAppReceipt(showReceipt)}
                        className="px-6 py-3 bg-[#25D366] text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center gap-2 hover:shadow-lg transition-all"
                      >
                        <Share2 size={16} /> Send via WhatsApp
                      </button>
                      <button 
                        onClick={() => sendEmailReceipt(showReceipt)}
                        className="px-6 py-3 bg-mango-green text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center gap-2 hover:shadow-lg transition-all"
                      >
                        <Mail size={16} /> Send via Email
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.print()}
                        className="p-3 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 transition-all"
                        title="Print Receipt"
                      >
                        <Printer size={20} />
                      </button>
                      <button 
                        onClick={() => setShowReceipt(null)}
                        className="px-6 py-3 bg-stone-900 text-white text-xs font-bold rounded-xl uppercase tracking-widest"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-bold text-mango-dark">All Orders</h3>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-stone-100 rounded-xl p-6 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-xs font-bold text-mango-dark mb-1">{order.shippingAddress.fullName}</p>
                      <p className="text-[10px] text-stone-400 font-mono">#{order.id?.toUpperCase()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Items</p>
                      <p className="text-sm font-bold text-mango-dark">{order.items.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-sm font-bold text-mango-orange">Rs. {order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Payment</p>
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.paymentStatus || 'unpaid'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <select 
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-none outline-none cursor-pointer ${getStatusColor(order.status)}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id!, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button 
                        onClick={() => sendWhatsAppReceipt(order)}
                        className="p-2 text-[#25D366] hover:bg-[#25D366]/10 rounded-xl transition-colors"
                        title="WhatsApp Receipt"
                      >
                        <Phone size={18} />
                      </button>
                      <button 
                        onClick={() => sendEmailReceipt(order)}
                        className="p-2 text-mango-green hover:bg-mango-green/10 rounded-xl transition-colors"
                        title="Email Receipt"
                      >
                        <Mail size={18} />
                      </button>
                      <button 
                        onClick={() => setOrderToDelete(order.id!)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete Order"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-bold text-mango-dark">Product Management</h3>
                <button 
                  onClick={() => {
                    setShowAddProduct(!showAddProduct);
                    if (showAddProduct) setEditingProduct(null);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-mango-green text-white font-bold rounded-xl hover:bg-mango-dark transition-all text-sm uppercase tracking-widest"
                >
                  <Plus size={18} />
                  {showAddProduct ? 'Cancel' : 'Add Product'}
                </button>
              </div>

              {showAddProduct && (
                <motion.form 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleAddProduct}
                  className="mb-12 p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4"
                >
                  <h4 className="text-sm font-bold text-mango-dark mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-500 uppercase">Product Name</label>
                      <input 
                        required
                        type="text" 
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-stone-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-500 uppercase">Variety</label>
                      <input 
                        required
                        type="text" 
                        value={newProduct.variety}
                        onChange={e => setNewProduct({...newProduct, variety: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-stone-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-500 uppercase">Price (Rs.)</label>
                      <input 
                        required
                        type="number" 
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        className="w-full px-4 py-2 rounded-lg border border-stone-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-500 uppercase">Category</label>
                      <select 
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                        className="w-full px-4 py-2 rounded-lg border border-stone-200"
                      >
                        <option value="Premium">Premium</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Gift">Gift Box</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-500 uppercase">Initial Stock (Boxes)</label>
                      <input 
                        required
                        type="number" 
                        value={newProduct.stock}
                        onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                        className="w-full px-4 py-2 rounded-lg border border-stone-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase">Description</label>
                    <textarea 
                      required
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-stone-200 min-h-[100px]"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-mango-dark text-white font-bold rounded-xl">Save Product</button>
                </motion.form>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border border-stone-100 rounded-xl hover:border-mango-yellow transition-colors">
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-mango-dark">{product.name}</h4>
                      <p className="text-xs text-stone-500 mb-2">{product.category}</p>
                      <p className="text-sm font-bold text-mango-orange">Rs. {product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => startEdit(product)}
                        className="p-2 text-stone-400 hover:text-mango-green transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => setProductToDelete(product.id)}
                        className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
              <h3 className="text-xl font-display font-bold text-mango-dark mb-8">Inventory Management</h3>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-stone-100 rounded-xl">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-sm font-bold text-mango-dark">{product.name}</h4>
                        <p className="text-xs text-stone-500">{product.variety}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Stock Level</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${(product.stock || 0) > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {(product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          defaultValue={product.stock || 0} 
                          id={`stock-${product.id}`}
                          className="w-20 px-2 py-1 border border-stone-200 rounded text-sm font-bold" 
                        />
                        <span className="text-xs font-bold text-stone-400">Boxes</span>
                      </div>
                      <button 
                        onClick={() => {
                          const input = document.getElementById(`stock-${product.id}`) as HTMLInputElement;
                          updateProductStock(product.id, Number(input.value));
                        }}
                        className="text-xs font-bold text-mango-green hover:underline"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
              <h3 className="text-xl font-display font-bold text-mango-dark mb-8">User Management</h3>
              <div className="space-y-4">
                {users.map((u) => (
                  <div key={u.uid} className="flex items-center justify-between p-4 border border-stone-100 rounded-xl">
                    <div className="flex items-center gap-4">
                      <img src={u.photoURL || 'https://via.placeholder.com/100'} alt={u.displayName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-sm font-bold text-mango-dark">{u.displayName}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          <p className="text-xs text-stone-500 flex items-center gap-1">
                            <Mail size={10} /> {u.email || 'No email'}
                          </p>
                          {u.phone && (
                            <p className="text-xs text-stone-500 flex items-center gap-1">
                              <Phone size={10} /> {u.phone}
                            </p>
                          )}
                          <p className="text-[10px] text-stone-400 flex items-center gap-1">
                            <Calendar size={10} /> Joined {u.createdAt?.toDate ? format(u.createdAt.toDate(), 'MMM d, yyyy') : format(new Date(u.createdAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-mango-orange text-white' : 'bg-stone-100 text-stone-600'}`}>
                        {u.role}
                      </span>
                      {editingUser?.uid === u.uid ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateUserRole(u.uid, u.role === 'admin' ? 'user' : 'admin')}
                            className="text-xs font-bold text-mango-green hover:underline"
                          >
                            Confirm {u.role === 'admin' ? 'User' : 'Admin'}
                          </button>
                          <button 
                            onClick={() => setEditingUser(null)}
                            className="text-xs font-bold text-stone-400 hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setEditingUser(u)}
                          className="text-xs font-bold text-mango-green hover:underline"
                        >
                          Edit Role
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
              <h3 className="text-xl font-display font-bold text-mango-dark mb-8">Customer Reviews</h3>
              <div className="space-y-6">
                {allReviews.map((review) => (
                  <div key={review.id} className="p-6 border border-stone-100 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-mango-yellow/10 rounded-full flex items-center justify-center text-mango-orange font-bold">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-mango-dark">{review.userName}</h4>
                          <p className="text-[10px] text-stone-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-mango-yellow">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'fill-current' : 'text-stone-200'}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed italic">"{review.comment}"</p>
                    
                    {review.reply && (
                      <div className="ml-8 p-4 bg-stone-50 rounded-xl border-l-4 border-mango-yellow">
                        <p className="text-[10px] font-bold text-mango-orange uppercase tracking-widest mb-1">Admin Reply</p>
                        <p className="text-sm text-stone-600">{review.reply}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-stone-50 flex justify-between items-center">
                      <div className="flex-1 mr-4">
                        {replyingToReviewId === review.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write your reply..."
                              className="w-full p-3 text-sm border border-stone-200 rounded-xl focus:border-mango-yellow outline-none"
                            />
                            <div className="flex gap-2">
                              <button 
                                onClick={() => submitReviewReply(review.id)}
                                className="px-4 py-2 bg-mango-green text-white text-xs font-bold rounded-lg"
                              >
                                Post Reply
                              </button>
                              <button 
                                onClick={() => setReplyingToReviewId(null)}
                                className="px-4 py-2 bg-stone-100 text-stone-600 text-xs font-bold rounded-lg"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setReplyingToReviewId(review.id)}
                            className="text-xs font-bold text-mango-green hover:underline flex items-center gap-2"
                          >
                            <MessageSquare size={14} />
                            {review.reply ? 'Edit Reply' : 'Reply to Review'}
                          </button>
                        )}
                      </div>
                      <button 
                        onClick={() => setReviewToDelete(review.id)}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
              <h3 className="text-xl font-display font-bold text-mango-dark mb-8">Bulk Order Inquiries</h3>
              <div className="space-y-6">
                {bulkInquiries.length === 0 ? (
                  <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    <ClipboardCheck size={48} className="mx-auto text-stone-300 mb-4" />
                    <p className="text-stone-500 font-bold">No bulk inquiries yet.</p>
                  </div>
                ) : (
                  bulkInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-6 border border-stone-100 rounded-2xl space-y-4 hover:border-mango-yellow transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-mango-yellow/10 rounded-xl flex items-center justify-center text-mango-orange font-bold text-xl">
                            {inquiry.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-mango-dark">{inquiry.name}</h4>
                            <p className="text-xs text-stone-400">{inquiry.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <select 
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-none outline-none cursor-pointer ${
                              inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                              inquiry.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}
                            value={inquiry.status}
                            onChange={(e) => updateInquiryStatus(inquiry.id!, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button 
                            onClick={() => setInquiryToDelete(inquiry.id!)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 py-4 border-y border-stone-50">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Contact Info</p>
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <Mail size={14} className="text-mango-green" /> {inquiry.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <Phone size={14} className="text-mango-green" /> {inquiry.phone}
                          </div>
                          {inquiry.contactMethod && (
                            <div className="mt-1">
                              <span className="text-[9px] font-bold px-2 py-0.5 bg-mango-yellow text-mango-dark rounded-full uppercase tracking-tighter">
                                Preferred: {inquiry.contactMethod}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Order Details</p>
                          <p className="text-sm font-bold text-mango-dark">{inquiry.variety}</p>
                          <p className="text-sm text-stone-600">{inquiry.quantity} KG (Approx.)</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Submitted On</p>
                          <p className="text-sm text-stone-600">
                            {inquiry.createdAt?.toDate ? format(inquiry.createdAt.toDate(), 'PPP p') : 'Just now'}
                          </p>
                        </div>
                      </div>

                      {inquiry.message && (
                        <div className="p-4 bg-stone-50 rounded-xl">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Message</p>
                          <p className="text-sm text-stone-600 leading-relaxed italic">"{inquiry.message}"</p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <a 
                          href={`mailto:${inquiry.email}?subject=Bulk Order Inquiry - ${adminSettings.businessName}`}
                          className="px-4 py-2 bg-stone-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest flex items-center gap-2 hover:bg-stone-800 transition-all"
                        >
                          <Mail size={12} /> Reply via Email
                        </a>
                        <a 
                          href={`https://wa.me/${inquiry.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${inquiry.name}, this is regarding your bulk order inquiry on ${adminSettings.businessName}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#25D366] text-white text-[10px] font-bold rounded-lg uppercase tracking-widest flex items-center gap-2 hover:shadow-lg transition-all"
                        >
                          <Phone size={12} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
              <h3 className="text-xl font-display font-bold text-mango-dark mb-8">Admin Settings</h3>
              <div className="max-w-2xl space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-600 uppercase tracking-widest">Business Name</label>
                  <input 
                    type="text"
                    value={adminSettings.businessName}
                    onChange={(e) => setAdminSettings({...adminSettings, businessName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-600 uppercase tracking-widest">Admin Email (Gmail)</label>
                  <input 
                    type="email"
                    placeholder="your-gmail@gmail.com"
                    value={adminSettings.adminEmail}
                    onChange={(e) => setAdminSettings({...adminSettings, adminEmail: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow outline-none"
                  />
                  <p className="text-[10px] text-stone-400">This email will be used as a reference for receipts and notifications.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-600 uppercase tracking-widest">WhatsApp Number</label>
                  <input 
                    type="tel"
                    value={adminSettings.whatsappNumber}
                    onChange={(e) => setAdminSettings({...adminSettings, whatsappNumber: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow outline-none"
                  />
                </div>
                <button 
                  onClick={saveSettings}
                  className="px-8 py-3 bg-mango-dark text-white font-bold rounded-xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modals */}
      {orderToDelete && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash size={32} />
            </div>
            <h3 className="text-xl font-display font-bold text-mango-dark mb-2">Delete Order?</h3>
            <p className="text-stone-500 mb-8">Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setOrderToDelete(null)}
                className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteOrder(orderToDelete!)}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {productToDelete && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash size={32} />
            </div>
            <h3 className="text-xl font-display font-bold text-mango-dark mb-2">Delete Product?</h3>
            <p className="text-stone-500 mb-8">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteProduct(productToDelete!)}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {inquiryToDelete && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash size={32} />
            </div>
            <h3 className="text-xl font-display font-bold text-mango-dark mb-2">Delete Inquiry?</h3>
            <p className="text-stone-500 mb-8">Are you sure you want to delete this inquiry? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setInquiryToDelete(null)}
                className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteInquiry(inquiryToDelete!)}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {reviewToDelete && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash size={32} />
            </div>
            <h3 className="text-xl font-display font-bold text-mango-dark mb-2">Delete Review?</h3>
            <p className="text-stone-500 mb-8">Are you sure you want to delete this review? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setReviewToDelete(null)}
                className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteReview(reviewToDelete!)}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
