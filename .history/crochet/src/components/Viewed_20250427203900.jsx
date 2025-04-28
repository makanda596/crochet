import React, { useEffect } from 'react';
import { useAuthStore } from '../utilis/auth';
import LoadSpinner from './LoadSpinner';
import ProductCard from './ProductCard';
import { FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';

const Viewed = () => {
    const { getProducts, products, loading, error } = useAuthStore();

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-80" />
            ))}
        </div>
    );

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <FiTrendingUp className="text-purple-600 w-6 h-6" />
                        Most Viewed Products
                    </h2>
                    <p className="text-gray-500 mt-1">Popular items based on customer interactions</p>
                </div>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <FiAlertTriangle className="text-red-600 w-6 h-6" />
                    <div>
                        <h3 className="text-red-800 font-semibold">Loading Error</h3>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        showViews={true}
                        className="relative group hover:shadow-lg transition-shadow"
                        badge={
                            product.views > 1000 && (
                                <span className="absolute top-2 right-2 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Popular 🔥
                                </span>
                            )
                        }
                    />
                ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && !loading && (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">🧶</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No Popular Items Found
                        </h3>
                        <p className="text-gray-500">
                            Check back later to see trending products
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Viewed;