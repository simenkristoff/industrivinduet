import React, { useRef, useEffect } from 'react';

import { GoogleMaps } from '@/components/GoogleMaps';

interface IProps {
  renderInDev?: boolean;
}

const isDev = process.env.NODE_ENV === 'development';

const mapOptions: google.maps.MapOptions = {
  zoom: 16,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  disableDefaultUI: true,
  styles: [
    {
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#7d9ebc',
        },
      ],
    },
    {
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#425567',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#d9d9d9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#096dd9',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f9f9f9',
        },
      ],
    },
  ],
};

export const GoogleMapsContainer: React.FC<IProps> = ({ renderInDev }: IProps) => {
  if (!renderInDev && isDev) return null;
  const googleMapRef = useRef<HTMLDivElement>(null);
  const MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${
    process.env.GOOGLE_MAPS_API as string
  }`;

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = MAP_API_URL;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      createMap();
    });

    return () => {
      const scripts = document.getElementsByTagName('script');
      for (var i = scripts.length; i--; ) {
        if (scripts[i].src === MAP_API_URL) window.document.body.removeChild(scripts[i]);
      }
    };
  }, []);

  const createMap = () => {
    const { lat, lng }: google.maps.LatLngLiteral = {
      lat: 63.41824998268043,
      lng: 10.403642996722022,
    };
    const googleMap = new window.google.maps.Map(googleMapRef.current as Element, {
      center: {
        lat,
        lng,
      },
      ...mapOptions,
    });
    new window.google.maps.Marker({
      position: { lat, lng },
      map: googleMap,
      animation: window.google.maps.Animation.DROP,
      title: 'Industrivinduet',
    });
  };

  return <GoogleMaps mapRef={googleMapRef} />;
};

GoogleMapsContainer.defaultProps = {
  renderInDev: false,
};
