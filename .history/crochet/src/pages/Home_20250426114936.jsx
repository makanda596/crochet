import React, { useState } from 'react';
import Orders from '../components/Orders';
import Settings from '../components/Settings';
import AllFlash from '../components/AllFlash';
import PostProduct from '../components/PostProduct';
import AllProducts from '../components/AllProducts';

const TABS = ['Orders', 'Make a Post', 'Settings', 'Flash Sale', 'All Products'];

const Home = () => {
  const [activeTab, setActiveTab] = useState('Orders');

  const renderContent = () => {
    switch (activeTab) {
      case 'Orders':
        return <Orders/>;
      case 'Make a Post':
        return <PostProduct/>;
      case 'Settings':
        return <Settings/>
      case 'Flash Sale':
        return <AllFlash/>
      case 'All Products':
        return <AllProducts/>
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 shadow-md">
        <nav className="space-y-2">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">{activeTab}</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default Home;
