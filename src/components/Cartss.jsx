import { useContext } from "react";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
	const { items } = useContext(CartContext);
	const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
	const formattedPrice = currencyFormatter.format(totalPrice);

	function handleGotoCheckout() {
		showCheckout();
	}

	return (
		<Modal
			className={"cart"}
			open={progress === "cart"}
			onClose={progress === "cart" ? hideCart : null}>
			<h2>cart</h2>
			<ul>
				{items.map(item => (
					<CartItem key={item.id} item={item} />
				))}
			</ul>
			<p className="cart-total">{formattedPrice}</p>
			<p className="modal-actions">
				<Button textOnly onClick={hideCart}>
					close
				</Button>
				{items.length > 0 && <Button onClick={handleGotoCheckout}>Go to checkout</Button>}
			</p>
		</Modal>
	);
}
