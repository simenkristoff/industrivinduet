import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const mapOptions: google.maps.MapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    styles: [
        {
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#7d9ebc',
                }
            ]
        },
        {
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#425567',
                }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    color: "#d9d9d9",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#096dd9",
                },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#f9f9f9",
                },
            ],
          },
    ]
}

export const Map = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API as string}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
      center: { lat: 63.41824998268043, lng: 10.403642996722022 },
    }),
    withScriptjs,
    withGoogleMap
  )((props: any) => (
    <GoogleMap defaultZoom={13} defaultCenter={props.center} defaultOptions={mapOptions}>
      <Marker position={props.center} />
    </GoogleMap>
  )
);
