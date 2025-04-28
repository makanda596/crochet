const LoadSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
            {/* Purple Spinner */}
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>

            {/* Black Overlay Spinner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-gray-900 rounded-full animate-pulse"></div>

           
        </div>
    </div>
);

export default LoadSpinner;