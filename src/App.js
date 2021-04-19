import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./Components";
import styles from "./App.module.css";
import { fetchData } from "./api";

export class App extends Component {
	state = {
		data: {},
		country: "",
	};

	async componentDidMount() {
		const fetchedData = await fetchData();

		this.setState({ data: fetchedData });
		// console.log(data);
	}

	handleCountryChange = async (country) => {
		// console.log(country);
		const fetchedData = await fetchData(country);
		this.setState({ data: fetchedData, country: country });
		// console.log(fetchedData);
	};

	render() {
		const { data, country } = this.state;

		return (
			<div className={styles.container}>
				<img
					className="image"
					src="https://i.ibb.co/7QpKsCX/image.png"
					alt="Covid-19"
				/>
				<Cards data={data} />
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;
