import { ProductGridSkeleton } from '../../components/skeletons/ProductSkeleton';

export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 bg-gray-800 rounded w-1/4 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-800 rounded w-2/3 animate-pulse" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
} 