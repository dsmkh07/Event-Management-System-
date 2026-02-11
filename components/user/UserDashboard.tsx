
import React, { useState } from 'react';
import { useApp } from '../../App';
import { HARDCODED_USERS } from '../../constants';
import { UserRole, Product, Order } from '../../types';

const UserDashboard: React.FC = () => {
  const { currentUser, products, cart, setCart, orders, setOrders } = useApp();
  const [view, setView] = useState<'home' | 'vendorList' | 'cart' | 'status'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Checkout form
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({ name: '', email: '', address: '', city: '', payment: 'Cash' });

  const vendors = HARDCODED_USERS.filter(u => u.role === UserRole.VENDOR);
  const filteredVendors = selectedCategory ? vendors.filter(v => v.category === selectedCategory) : vendors;
  const userOrders = orders.filter(o => o.userId === currentUser?.id);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert('Added to cart!');
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    const newOrders: Order[] = cart.map(item => ({
      id: 'ORD' + Math.floor(Math.random() * 1000000),
      userId: currentUser!.id,
      vendorId: item.vendorId,
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: 1,
      totalPrice: item.price,
      status: 'Received',
      orderDate: new Date().toLocaleDateString()
    }));

    setOrders([...orders, ...newOrders]);
    setCart([]);
    setView('status');
    setCheckoutStep(1);
    alert('Thank you for your order!');
  };

  if (view === 'home') {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome {currentUser?.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => { setSelectedCategory(null); setView('vendorList'); }} className="bg-white p-6 rounded-lg shadow hover:shadow-md border flex flex-col items-center">
            <i className="fas fa-store text-blue-500 text-3xl mb-2"></i>
            <span className="font-bold">Browse Vendors</span>
          </button>
          <button onClick={() => setView('cart')} className="bg-white p-6 rounded-lg shadow hover:shadow-md border flex flex-col items-center">
            <i className="fas fa-shopping-cart text-green-500 text-3xl mb-2"></i>
            <span className="font-bold">My Cart ({cart.length})</span>
          </button>
          <button onClick={() => setView('status')} className="bg-white p-6 rounded-lg shadow hover:shadow-md border flex flex-col items-center">
            <i className="fas fa-clipboard-list text-purple-500 text-3xl mb-2"></i>
            <span className="font-bold">Order Status</span>
          </button>
          <button className="bg-white p-6 rounded-lg shadow hover:shadow-md border flex flex-col items-center">
            <i className="fas fa-user-friends text-orange-500 text-3xl mb-2"></i>
            <span className="font-bold">Guest List</span>
          </button>
        </div>
      </div>
    );
  }

  if (view === 'vendorList') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <button onClick={() => setView('home')} className="text-blue-600 font-bold">&larr; Back to Dashboard</button>
          <div className="flex space-x-2">
            {['Catering', 'Florist', 'Decoration', 'Lighting'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-bold border ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
            {selectedCategory && <button onClick={() => setSelectedCategory(null)} className="text-red-500 text-xs font-bold">Clear</button>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(v => (
            <div key={v.id} className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold">{v.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{v.category}</p>
              <div className="space-y-4">
                <h4 className="font-bold text-gray-700 border-b pb-1">Our Packages</h4>
                <div className="space-y-2">
                  {products.filter(p => p.vendorId === v.id).map(p => (
                    <div key={p.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <img src={p.image} className="w-10 h-10 rounded object-cover" />
                        <span className="text-sm">{p.name} - Rs.{p.price}</span>
                      </div>
                      <button onClick={() => addToCart(p)} className="text-blue-600 hover:text-blue-800"><i className="fas fa-cart-plus"></i></button>
                    </div>
                  ))}
                  {products.filter(p => p.vendorId === v.id).length === 0 && <p className="text-xs text-gray-400">No items listed.</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'cart') {
    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setView('home')} className="text-blue-600 mb-4 font-bold">&larr; Back</button>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <i className="fas fa-shopping-basket text-green-600 mr-2"></i>
          Shopping Cart
        </h2>

        {checkoutStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-center py-10 text-gray-400">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} className="w-16 h-16 rounded object-cover" />
                        <div>
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-blue-600">Rs. {item.price}/-</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:text-red-700 font-bold">Remove</button>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-between items-center text-xl font-bold">
                    <span>Grand Total:</span>
                    <span className="text-green-600 underline">Rs. {totalAmount}/-</span>
                  </div>
                  <div className="flex space-x-4 mt-8">
                    <button onClick={() => setCheckoutStep(2)} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Proceed to Checkout</button>
                    <button onClick={() => setCart([])} className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">Clear Cart</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {checkoutStep === 2 && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto border-t-8 border-green-600">
            <h3 className="text-xl font-bold mb-6 text-center">Checkout Details</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border p-3 rounded" value={shippingInfo.name} onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})} />
              <input type="email" placeholder="Email" className="w-full border p-3 rounded" value={shippingInfo.email} onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})} />
              <input type="text" placeholder="Shipping Address" className="w-full border p-3 rounded" value={shippingInfo.address} onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})} />
              <div className="flex space-x-2">
                <input type="text" placeholder="City" className="w-1/2 border p-3 rounded" value={shippingInfo.city} onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})} />
                <select className="w-1/2 border p-3 rounded" value={shippingInfo.payment} onChange={(e) => setShippingInfo({...shippingInfo, payment: e.target.value})}>
                  <option value="Cash">Cash on Delivery</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div className="pt-4 border-t">
                <p className="flex justify-between font-bold text-lg mb-4">
                  <span>Payable Amount:</span>
                  <span>Rs. {totalAmount}</span>
                </p>
                <button onClick={handlePlaceOrder} className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 shadow-lg">Order Now</button>
                <button onClick={() => setCheckoutStep(1)} className="w-full mt-2 text-gray-500 text-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === 'status') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Order Status</h2>
          <button onClick={() => setView('home')} className="text-blue-600 font-bold">Back to Home</button>
        </div>
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4 border">Order ID</th>
                <th className="p-4 border">Item</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map(o => (
                <tr key={o.id} className="border-b">
                  <td className="p-4 text-xs font-mono">{o.id}</td>
                  <td className="p-4 font-bold">{o.productName}</td>
                  <td className="p-4 text-sm">{o.orderDate}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      o.status === 'Out For Delivery' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
              {userOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-400">No active orders.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

export default UserDashboard;
