'use client';

import { useBand } from '@/context/BandContext';
import { Review } from '@/types/band';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Custom orange marker icon
const icon = L.divIcon({
  className: 'custom-marker',
  html: `<svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 21.875 12.5 41 12.5 41C12.5 41 25 21.875 25 12.5C25 5.59644 19.4036 0 12.5 0ZM12.5 17C10.0147 17 8 14.9853 8 12.5C8 10.0147 10.0147 8 12.5 8C14.9853 8 17 10.0147 17 12.5C17 14.9853 14.9853 17 12.5 17Z" fill="#FF5733"/>
  </svg>`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Function to extract coordinates from Google Maps URL
const getCoordinatesFromUrl = (url: string, businessName: string) => {
  console.log('Processing URL:', url);
  
  // Hardcoded coordinates for known locations
  const knownLocations: Record<string, [number, number]> = {
    'La Nova Terreta': [39.4574, -0.4614],
    'La Noguera de Pozoseco': [39.5697, -2.3672]
  };

  if (knownLocations[businessName]) {
    console.log('Using known coordinates for:', businessName, knownLocations[businessName]);
    return knownLocations[businessName];
  }

  // Try to extract from URL if not hardcoded
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = url.match(regex);
  if (match) {
    console.log('Found coordinates in URL:', match[1], match[2]);
    return [parseFloat(match[1]), parseFloat(match[2])] as [number, number];
  }

  console.log('No coordinates found, using default');
  return [39.4574, -0.4614] as [number, number];
};

function ZoomControl() {
  const map = useMap();

  const handleZoom = (e: React.MouseEvent, direction: 'in' | 'out') => {
    e.preventDefault();
    if (direction === 'in') {
      map.zoomIn();
    } else {
      map.zoomOut();
    }
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control-zoom leaflet-bar leaflet-control">
        <button 
          className="w-8 h-8 bg-zinc-900 text-white hover:bg-brand-orange hover:text-white transition-colors border-b border-zinc-800 rounded-t-md flex items-center justify-center text-lg font-medium" 
          title="Zoom in" 
          aria-label="Zoom in"
          onClick={(e) => handleZoom(e, 'in')}
        >+</button>
        <button 
          className="w-8 h-8 bg-zinc-900 text-white hover:bg-brand-orange hover:text-white transition-colors rounded-b-md flex items-center justify-center text-lg font-medium" 
          title="Zoom out" 
          aria-label="Zoom out"
          onClick={(e) => handleZoom(e, 'out')}
        >−</button>
      </div>
    </div>
  );
}

// Add this CSS at the end of the file
const styles = `
  .custom-marker {
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
  }
`;

export default function ReviewsMap() {
  const { reviews } = useBand();

  if (!reviews?.length) {
    console.log('No reviews available');
    return null;
  }

  // Spain bounds
  const spainBounds: L.LatLngBoundsExpression = [
    [35.8333, -9.3000], // Southwest corner
    [43.7833, 4.3333]  // Northeast corner
  ];

  // Calculate center point between markers
  const bounds = reviews.map(review => {
    const coords = getCoordinatesFromUrl(review.businessUrl, review.businessName);
    console.log('Review:', review.businessName, 'Coords:', coords);
    return coords;
  });

  const minLat = Math.min(...bounds.map(b => b[0]));
  const maxLat = Math.max(...bounds.map(b => b[0]));
  const minLng = Math.min(...bounds.map(b => b[1]));
  const maxLng = Math.max(...bounds.map(b => b[1]));
  
  const centerPoint: [number, number] = [
    (minLat + maxLat) / 2,
    (minLng + maxLng) / 2
  ];

  // Add styles to head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <MapContainer
        center={centerPoint}
        zoom={7}
        style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, background: '#242f3e' }}
        maxBounds={spainBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={false}
        touchZoom={false}
        doubleClickZoom={false}
        dragging={true}
        zoomControl={false}
        minZoom={6}
        maxZoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reviews.map((review: Review, index: number) => {
          const coords = getCoordinatesFromUrl(review.businessUrl, review.businessName);
          return (
            <Marker 
              key={index} 
              position={coords} 
              icon={icon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold text-black">{review.businessName}</h3>
                  <p className="text-sm text-gray-600">{review.location}</p>
                  <a
                    href={review.reviewUrl || review.businessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm mt-2 inline-block text-brand-orange hover:text-brand-white"
                  >
                    Ver reseña
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <ZoomControl />
      </MapContainer>
    </div>
  );
} 