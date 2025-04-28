import React, { useState, useEffect } from 'react';
import Orders from '../components/Orders';
import Settings from '../components/Settings';
import AllFlash from '../components/AllFlash';
import PostProduct from '../components/PostProduct';
import AllProducts from '../components/AllProducts';
import { FiMenu, FiX, FiBell, FiUser, FiSearch } from 'react-icons/fi';
import LoadSpinner from '../components/LoadSpinner';

const TABS = [
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'post', label: 'Create Post', icon: '✍️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'flash', label: 'Flash Sales', icon: '⚡' },
  { id: 'products', label: 'All Products', icon: '🛍️' }
];

const Home = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || 'orders';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const renderContent = () => {
    if (isLoading) return <LoadSpinner />;

    switch (activeTab) {
      case 'orders': return <Orders search={searchQuery} />;
      case 'post': return <PostProduct />;
      case 'settings': return <Settings />;
      case 'flash': return <AllFlash />;
      case 'products': return <AllProducts search={searchQuery} />;
      default: return <div className="text-gray-500">Select a tab to view content</div>;
    }
  };

  const handleTabChange = (tabId) => {
    setIsLoading(true);
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setTimeout(() => setIsLoading(false), 300); // Simulate loading
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-purple-600"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="flex items-center space-x-4">
          <FiBell className="text-gray-600" size={20} />
          <FiUser className="text-gray-600" size={20} />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className={`lg:w-64 bg-white shadow-lg transform lg:transform-none fixed lg:relative inset-0 z-50 transition-transform duration-300 ease-in-out 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-purple-600">Admin Dashboard</h1>
          </div>

          <nav className="p-4 space-y-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                  ${activeTab === tab.id
                    ? 'bg-purple-50 text-purple-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg shadow-sm w-96">
              <FiSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>

            <div className="flex items-center space-x-6">
              <button className="relative text-gray-600 hover:text-purple-600">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-purple-600" />
                </div>
                <span className="text-gray-700">Admin User</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                {TABS.find(t => t.id === activeTab)?.label}
              </h1>
              {['orders', 'products'].includes(activeTab) && (
                <div className="flex items-center space-x-4">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    Export CSV
                  </button>
                </div>
              )}
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;