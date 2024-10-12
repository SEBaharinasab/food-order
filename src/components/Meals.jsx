import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx";

/**
 * By using empty {} for the arguments of the useHttp hook, the useCallback
 * function is called inside the hook in an infinite loop. To fix the error, we
 * use a variable outside the component function and assign {} to it.
 * Also we can use NULL for hook argument.✓✓
 * */
const requestConfig = {};

export default function Meals() {
	const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp("http://localhost:3000/meals", requestConfig, []);

	if (isLoading) return <p className={"center"}>Fetching meals...</p>;
	if (error) return <Error title={"Failed to fetch meals"} message={error.message} />;

	return (
		<ul id="meals">
			{loadedMeals.map(meal => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
}
