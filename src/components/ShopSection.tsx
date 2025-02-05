"use client";

import { Suspense } from 'react';
import { useBandContext } from '../context/BandContext';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from './skeletons/ProductSkeleton';

export default function ShopSection() {
  const { products } = useBandContext();

  console.log('ShopSection render:', JSON.stringify(products, null, 2));

  if (!products || products.length === 0) {
    console.log('ShopSection: No products available');
    return null;
  }

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-black to-gray-900" id="tienda">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Tienda</h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {products.map((product) => {
              console.log('Rendering product:', product.id, JSON.stringify(product.images, null, 2));
              return <ProductCard key={product.id} {...product} />;
            })}
          </div>
        </Suspense>
      </div>
    </section>
  );
} 