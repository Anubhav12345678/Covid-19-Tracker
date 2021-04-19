import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";

import { fetchCountries } from "../../api";

function CountryPicker({ handleCountryChange }) {
	const [fetchedCountries, setFetchedCountries] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries());
		};

		fetchAPI();
	}, [setFetchedCountries]);

	// console.log(fetchedCountries);

	// now use effect will only be called when value of set fetched countries change

	return (
		<div>
			<FormControl>
				<NativeSelect
					defaultValue=""
					onChange={(e) => handleCountryChange(e.target.value)}
				>
					<option value="">Global</option>
					{fetchedCountries.map((country, i) => (
						<option key={i} value={country}>
							{country}
						</option>
					))}
				</NativeSelect>
			</FormControl>
		</div>
	);
}

export default CountryPicker;
