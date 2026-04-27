import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Truck, Wallet, Landmark, Loader2 } from 'lucide-react';
import { useCart } from '../CartContext';

interface CheckoutProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack, onSuccess }) => {
  const { cart, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 2) {
      setStep(step + 1);
      return;
    }

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.address || !formData.city) {
      alert("Please fill all the required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        paymentMethod: formData.paymentMethod,
        items: cart,
        totalAmount: totalPrice
      };

      console.log("Sending order to backend:", orderData); // For debugging

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        clearCart();
        onSuccess();
        alert(`✅ Order Placed Successfully!\nOrder ID: ${result.orderId}\nConfirmation email has been sent.`);
      } else {
        alert(result.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Cannot connect to server. Make sure backend is running on http://localhost:5000");
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: <Truck size={20} /> },
    { id: 'jazzcash', name: 'JazzCash', icon: <Wallet size={20} className="text-red-600" /> },
    { id: 'easypaisa', name: 'EasyPaisa', icon: <Wallet size={20} className="text-green-600" /> },
    { id: 'bank', name: 'Bank Transfer', icon: <Landmark size={20} className="text-blue-600" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="text-stone-500 hover:text-mango-dark font-medium">
          ← Back to Shop
        </button>
        <div className="h-1 flex-1 bg-stone-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            className="h-full bg-mango-yellow"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-mango-dark">Delivery Information</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-stone-600 block mb-1">Full Name *</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-stone-600 block mb-1">Phone Number *</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow"
                      placeholder="03001234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-stone-600 block mb-1">Email Address *</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-stone-600 block mb-1">Full Address *</label>
                  <textarea 
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow"
                    placeholder="House no, street, area..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-stone-600 block mb-1">City *</label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-mango-yellow bg-white"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Faisalabad">Faisalabad</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-mango-dark">Choose Payment Method</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label 
                      key={method.id}
                      className={`flex items-center gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-mango-green bg-mango-green/5' : 'border-stone-200 hover:border-stone-300'}`}
                    >
                      <input 
                        type="radio" 
                        name="payment"
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                      />
                      <div className="flex-1 font-medium">{method.name}</div>
                      {method.icon}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-mango-dark hover:bg-mango-green text-white font-bold rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : step === 1 ? "Continue to Payment" : `Place Order - Rs. ${totalPrice.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-8 rounded-3xl border">
            <h3 className="font-bold mb-6">Your Order</h3>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between py-3 border-b last:border-0">
                <div>
                  <div>{item.name}</div>
                  <div className="text-sm text-stone-500">{item.selectedWeight}kg × {item.quantity}</div>
                </div>
                <div className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
            <div className="pt-6 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <div className="text-mango-green text-sm mt-2">✓ Free Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};