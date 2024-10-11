import { useContext } from "react";
import foodLogo from "../assets/logo.jpg";
import Button from "./ui/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Header() {
	const { items } = useContext(CartContext);
	const { showCart } = useContext(UserProgressContext);
	const cartCount = items.reduce((total, item) => total + item.quantity, 0);
	return (
		<>
			<header id="main-header">
				<div id="title">
					<h1>ReactFood</h1>
					<img src={foodLogo} />
				</div>
				<nav>
					<Button textOnly={true} onClick={showCart}>
						cart ({cartCount})
					</Button>
				</nav>
			</header>
		</>
	);
}
