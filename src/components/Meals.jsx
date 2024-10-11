import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
	const [loadedMeals, setLoadedMeals] = useState([]);

	useEffect(() => {
		async function fetchMeals() {
			const response = await fetch("http://localhost:3000/meals");
			const data = await response.json();
			if (!response.ok) {
				// console.log(data);
			}
			setLoadedMeals(data);
		}
		fetchMeals();
	}, []);

	return (
		<ul id="meals">
			{loadedMeals.map(meal => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
}
