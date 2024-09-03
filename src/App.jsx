import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import logo from "/logo.png";
import "./App.css";

const App = () => {
	const [clubs, setClubs] = useState([]);
	const [isApiLoaded, setIsApiLoaded] = useState(false);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyCGFP9MhDHistZ8GX9rLndTI-wSYCfsxzU",
	});

	useEffect(() => {
		if (!window.google) {
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGFP9MhDHistZ8GX9rLndTI-wSYCfsxzU&callback=initMap`;
			script.async = true;
			script.defer = true;
			window.initMap = () => setIsApiLoaded(true);
			document.head.appendChild(script);
		} else {
			setIsApiLoaded(true);
		}

		return () => {
			if (window.google) {
				delete window.google;
			}
		};
	}, []);

	useEffect(() => {
		if (location) {
			axios
				.get(`https://sports-sgsocialgouv.opendatasoft.com/api/records/1.0/search/?dataset=passsports-asso_volontaires&q=kickboxing&rows=1000`)
				.then((response) => {
					setClubs(response.data.records);
				})
				.catch((error) => {
					console.error("Il y a eu une erreur!", error);
				});
		}
	}, [location]);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={logo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<h3>Trouver un club de Kickboxing</h3>
			<LoadScript googleMapsApiKey="AIzaSyCGFP9MhDHistZ8GX9rLndTI-wSYCfsxzUY">
				<GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={{ lat: 49.30853, lng: 0.967377 }} zoom={10}>
					{/* {clubs &&
					clubs.map(
						(club, index) =>
							club.fields.geoloc_finale && (
								<Marker key={index} position={{ lat: club.fields.geoloc_finale[0], lng: club.fields.geoloc_finale[1] }}>
									<InfoWindow>
										<div>
											<h2>{club.fields.nom}</h2>
											<p>{club.fields.adresse}</p>
											<p>{club.fields.commune}</p>
										</div>
									</InfoWindow>
								</Marker>
							)
					)} */}
				</GoogleMap>
			</LoadScript>
		</>
	);
};

export default App;
