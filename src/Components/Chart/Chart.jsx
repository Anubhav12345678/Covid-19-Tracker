import React, { useEffect, useState } from "react";
import { Line, Bar, defaults } from "react-chartjs-2"; // this is just a react wrapper class for chart-js but for it to workwe need to have cahartjs installed as well
import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

function Chart({ data: { confirmed, recovered, deaths }, country }) {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchApi = async () => {
			const initialDailyData = await fetchDailyData();
			setDailyData(initialDailyData);
		};

		fetchApi();
	}, []);
	// if (confirmed) {
	// 	console.log(confirmed);
	// 	console.log(recovered);
	// 	console.log(deaths);
	// }

	// console.log(dailyData);

	const lineChart = dailyData.length ? (
		<Line
			data={{
				labels: dailyData.map(({ date }) => date),
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed),
						label: "Infected",
						borderColor: "#3333ff",
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths),
						label: "Deaths",
						borderColor: "red",
						backgroundColor: "rgbe(255, 0, 0, 0.5)",
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ["Infected", "Recovered", "Deaths"],
				datasets: [
					{
						label: "People",
						backgroundColor: [
							"rgba(0, 0, 255, 0.5)",
							"rgba(0, 255, 0, 0.5)",
							"rgba(255, 0, 0, 0.5)",
						],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current State in ${country}` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>{country ? barChart : lineChart}</div>
	);
}

export default Chart;
