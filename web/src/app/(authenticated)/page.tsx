'use client';

import { useState, useEffect, useRef } from "react";
import Card from '@/components/Card/Card';
import styles from './page.module.css';
import { useJsApiLoader, GoogleMap, Marker, Libraries } from '@react-google-maps/api';

type Coord = google.maps.LatLngLiteral;

export default function HomePage()
{
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "AIzaSyAVh-TTYKVbkx3jn8McRqTCo4NNAkvxyRs"
	});

	const [center, setCenter] = useState<Coord | undefined>();
	const [marker, setMarker] = useState<Coord | undefined>();

	function handleMapClick(e: google.maps.MapMouseEvent)
	{
		if(e.latLng)
		{
			setMarker({
				lat: e.latLng.lat(),
				lng: e.latLng.lng()
			});
		
			/*const geocoder = new google.maps.Geocoder();
			geocoder.geocode({ location: marker }, (results, status) =>
			{
				if(status == 'OK')
				{
					console.log(results);
				}
				else
					alert('Geocode was not successful for the following reason: ' + status);
			});*/
		}
	}

	useEffect(() =>
	{
		if(navigator.geolocation)
			navigator.geolocation.getCurrentPosition(position =>
			{
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			},
			() => alert('Não conseguimos descobrir sua localização.'));
		else
			alert('Geolocalização não suportada.');
	},
	[]);
	
	return (
		<main className={styles.homepage}>
			<h2>Home</h2>

			{isLoaded ? (
				<div style={{
					height: '20rem',
					marginTop: '1rem',
					boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.2)'
				}}>
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
						onClick={handleMapClick}
					>
						{marker &&
						<Marker position={marker} />}
					</GoogleMap>
				</div>
			): null}

			<div className={styles.container}>
					<Card />
					<Card />
			</div>
		</main>
	);
}