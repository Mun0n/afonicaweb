export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="aspect-square bg-gray-800 rounded-lg animate-pulse" />
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-800 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-800 rounded w-1/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-2/3 animate-pulse" />
          </div>
          <div className="h-12 bg-gray-800 rounded w-full animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );
} 