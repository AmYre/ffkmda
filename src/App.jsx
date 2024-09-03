import { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import MapGL from "./MapGL";
import axios from "axios";
import logo from "/logo.png";
import "./App.css";

const App = () => {
	const [clubs, setClubs] = useState([]);

	useEffect(() => {
		axios
			.get(`https://sports-sgsocialgouv.opendatasoft.com/api/records/1.0/search/?dataset=passsports-asso_volontaires&q=kickboxing&rows=1000`)
			.then((response) => {
				setClubs(response.data.records);
			})
			.catch((error) => {
				console.error("Il y a eu une erreur!", error);
			});
	}, []);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={logo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<h3>Trouver un club de Kickboxing autour de chez vous</h3>
			<MapGL clubs={clubs} />
		</>
	);
};

export default App;
