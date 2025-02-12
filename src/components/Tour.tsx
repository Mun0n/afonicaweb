import Image from 'next/image';

export default function Tour() {
  return (
    <section className="relative w-full h-[500px] mb-16">
      <Image
        src="/images/tour/tour-2025.webp"
        alt="Tour 2025 poster"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-lg"
        priority
      />
    </section>
  );
} 