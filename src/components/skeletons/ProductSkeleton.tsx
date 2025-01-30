export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square w-full bg-gray-800 rounded-lg mb-4" />
      <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-800 rounded w-1/2" />
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
} 