import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZGV2b2x1dGlvbiIsImEiOiJjbTBtb3R0a2wwNTVlMmxzZHF4ejE0ODV5In0.KY6NT4AUHqFrhjpIDVwOrw";

const MapGL = ({ clubs }) => {
	const mapContainerRef = useRef(null);
	const [location, setLocation] = useState({ latitude: 48.8, longitude: 2.3 });

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [location.longitude, location.latitude],
			zoom: 10,
		});

		clubs.forEach((club) => {
			if (club.fields.geoloc_finale) {
				new mapboxgl.Marker()
					.setLngLat([club.fields.geoloc_finale[1], club.fields.geoloc_finale[0]])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }).setHTML(
							`<h2>${club.fields.nom}</h2><p>${club.fields.adresse}</p><p>${club.fields.com_code} ${club.fields.commune}</p><p>${
								club?.fields?.telephone ? club?.fields?.telephone : ""
							} ${club?.fields?.courriel ? club?.fields?.courriel : ""}</p>`
						)
					)
					.addTo(map);
			}
		});

		return () => map.remove();
	}, [clubs]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					setError(error.message);
				}
			);
		} else {
			setError("Geolocation is not supported by this browser.");
		}
	}, []);

	clubs && console.log("clubs", clubs);
	return <div ref={mapContainerRef} style={{ height: "400px", width: "800px" }} />;
};

export default MapGL;
