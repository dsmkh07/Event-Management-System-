
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { User, UserRole, Product, Order, Membership, Guest } from './types';
import { HARDCODED_USERS, INITIAL_PRODUCTS } from './constants';

// --- Contexts ---
interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  memberships: Membership[];
  setMemberships: React.Dispatch<React.SetStateAction<Membership[]>>;
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// --- Components ---
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import UserDashboard from './components/user/UserDashboard';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      products, setProducts,
      orders, setOrders,
      memberships, setMemberships,
      guests, setGuests,
      cart, setCart
    }}>
      <Router>
        <Routes>
          <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route element={<Layout />}>
            <Route path="/" element={
              !currentUser ? <Navigate to="/login" /> :
              currentUser.role === UserRole.ADMIN ? <AdminDashboard /> :
              currentUser.role === UserRole.VENDOR ? <VendorDashboard /> :
              <UserDashboard />
            } />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
