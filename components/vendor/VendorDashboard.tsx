
import React, { useState } from 'react';
import { useApp } from '../../App';
import { Product } from '../../types';

const VendorDashboard: React.FC = () => {
  const { currentUser, products, setProducts, orders, setOrders } = useApp();
  const [activeTab, setActiveTab] = useState<'yourItem' | 'addNew' | 'transaction'>('yourItem');
  
  // New Product Form
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const vendorProducts = products.filter(p => p.vendorId === currentUser?.id);
  const vendorOrders = orders.filter(o => o.vendorId === currentUser?.id);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };


  const handleAddProduct = () => {
    if (!newName || !newPrice || !newImage) return alert('All fields are mandatory');
    const newProd: Product = {
      id: Math.random().toString(36).substr(2, 9),
      vendorId: currentUser!.id,
      name: newName,
      price: parseFloat(newPrice),
      image: newImage,
      status: 'Available'
    };
    setProducts([...products, newProd]);
    setNewName(''); setNewPrice(''); setNewImage(null);
    alert('Product added successfully');
    setActiveTab('yourItem');
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateStatus = (orderId: string, status: any) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg flex justify-between items-center">
        <h2 className="text-2xl font-bold">Welcome {currentUser?.name}</h2>
        <div className="space-x-4">
          <button 
            onClick={() => setActiveTab('yourItem')} 
            className={`px-4 py-2 rounded font-bold ${activeTab === 'yourItem' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Your Items
          </button>
          <button 
            onClick={() => setActiveTab('addNew')} 
            className={`px-4 py-2 rounded font-bold ${activeTab === 'addNew' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Add New Item
          </button>
          <button 
            onClick={() => setActiveTab('transaction')} 
            className={`px-4 py-2 rounded font-bold ${activeTab === 'transaction' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Transactions
          </button>
        </div>
      </div>

      {activeTab === 'yourItem' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorProducts.length === 0 && <p className="col-span-full text-center py-12 text-gray-500">No products found. Start by adding a new item.</p>}
          {vendorProducts.map(p => (
            <div key={p.id} className="bg-white rounded-lg shadow-lg overflow-hidden border">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-xl">{p.name}</h3>
                <p className="text-blue-600 font-bold text-lg">Rs. {p.price}/-</p>
                <div className="mt-4 flex space-x-2">
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'addNew' && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">Product Details</h3>
            <div>
              <label className="block text-sm font-bold mb-1">Product Name</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Elegant Wedding Florals"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Product Price (Rs)</label>
              <input 
                type="number" 
                className="w-full border p-2 rounded" 
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Product Image</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full text-sm"
                onChange={handleImageUpload}
              />
            </div>
            <button 
              onClick={handleAddProduct}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              Add The Product
            </button>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border-2 border-dashed border-blue-200">
            <h3 className="text-xl font-bold flex items-center">
              <i className="fas fa-wand-magic-sparkles text-blue-600 mr-2"></i>
              AI Image Editor
            </h3>
            {newImage ? (
              <div className="space-y-3">
                <img src={newImage} alt="Preview" className="w-full h-40 object-cover rounded shadow" />
                <textarea 
                  className="w-full border p-2 rounded text-sm h-20" 
                  placeholder="Ask Gemini to edit image... e.g., 'Make it look vintage' or 'Add cinematic lighting'"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                ></textarea>
                <button 
                  disabled={isEditing}
                  onClick={applyAiEdit}
                  className="w-full bg-indigo-600 text-white py-2 rounded font-bold disabled:opacity-50"
                >
                  {isEditing ? 'Gemini is thinking...' : 'Apply AI Edit'}
                </button>
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Upload an image first to use AI editing.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'transaction' && (
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
          <h3 className="text-xl font-bold mb-4">User Requests / Transactions</h3>
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendorOrders.map(o => (
                <tr key={o.id} className="border-b">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3 font-bold">{o.productName}</td>
                  <td className="p-3">{o.userId}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      o.status === 'Out For Delivery' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select 
                      className="text-sm border p-1 rounded"
                      value={o.status}
                      onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                    >
                      <option value="Received">Received</option>
                      <option value="Ready for Shipping">Ready for Shipping</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
              {vendorOrders.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-400">No transactions yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
