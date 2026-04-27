import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, UserProfile } from './types';
import { auth, db } from './firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string, selectedWeight?: number) => void;
  updateQuantity: (productId: string, quantity: number, selectedWeight: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  user: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const isAdminEmail = firebaseUser.email === 'dudu.sellharborx@gmail.com';
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          if (isAdminEmail && userData.role !== 'admin') {
            const updatedUser = { ...userData, role: 'admin' as const };
            await setDoc(doc(db, 'users', firebaseUser.uid), updatedUser);
            setUser(updatedUser);
          } else {
            setUser(userData);
          }
        } else {
          const newUser: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            role: isAdminEmail ? 'admin' : 'user',
            createdAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedWeight === product.selectedWeight);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedWeight === product.selectedWeight) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string, selectedWeight?: number) => {
    setCart(prev => prev.filter(item => !(item.id === productId && (selectedWeight === undefined || item.selectedWeight === selectedWeight))));
  };

  const updateQuantity = (productId: string, quantity: number, selectedWeight: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedWeight);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.id === productId && item.selectedWeight === selectedWeight) ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice,
      user, loading, login, logout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
