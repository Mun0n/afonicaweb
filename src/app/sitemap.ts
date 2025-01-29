import { MetadataRoute } from 'next';
import { mockBandInfo } from '../data/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://afonicanaranjo.com';

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Add show routes
  const showRoutes = mockBandInfo.upcomingShows.map((show) => ({
    url: `${baseUrl}/conciertos/${show.date}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...routes, ...showRoutes];
} 