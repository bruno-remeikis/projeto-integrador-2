'use client';

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

import styles from './HomeMap.module.css';

type Coord = google.maps.LatLngLiteral;

export default function HomeMap()
{
   const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "AIzaSyAVh-TTYKVbkx3jn8McRqTCo4NNAkvxyRs"
	});

   const [mapError, setMapError] = useState<string | undefined>();
	const [center, setCenter] = useState<Coord | undefined>();
	const [marker, setMarker] = useState<Coord | undefined>();

   useEffect(() =>
	{
		if(navigator.geolocation)
			navigator.geolocation.getCurrentPosition(position =>
			{
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
            /*setMarker({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});*/
			},
			() => setMapError('Não conseguimos descobrir sua localização.'));
		else
         setMapError('Geolocalização não suportada.');
	},
	[]);

   return (
      <div className={styles.mapContainer}>
         {isLoaded ? (
            <GoogleMap
               mapContainerStyle={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  overflow: 'hidden',
                  zIndex: 0
               }}
               center={center}
               zoom={15}
               options={{
                  streetViewControl: false, // <- Remove bonequinho
                  fullscreenControl: false, // <- Remove opção "tela cheia"
                  mapTypeControl: false, // <- Remove opção de visualização em modo "satélite"
               }}
               //onClick={handleMapClick}
            >
               {marker &&
               <Marker position={marker} />}
            </GoogleMap>
         ): (
            <div className={styles.noMapMessage}>
               {mapError
                  ? <span>{ mapError }</span>
                  : <span>Carregando mapa...</span>}
            </div>
         )}
      </div>
   );
}