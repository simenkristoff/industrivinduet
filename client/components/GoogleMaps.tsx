import React from 'react';

interface IProps {
  mapRef: React.RefObject<HTMLDivElement>;
}

/**
 * Renders a Google map
 */
export const GoogleMaps: React.FC<IProps> = ({ mapRef }: IProps) => {
  return <div id='google-map' ref={mapRef} style={{ height: '400px' }} />;
};
