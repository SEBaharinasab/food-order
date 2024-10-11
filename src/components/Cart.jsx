import { useContext } from "react";
import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function Cart() {
	const { items } = useContext(CartContext);
	const { hideCart, showCheckout, progress } = useContext(UserProgressContext);

	const totalPrice = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

	return (
		<Modal
			className="cart"
			open={progress === "cart"}
			onClose={progress === "cart" ? hideCart : null}>
			<h2>Your Cart</h2>
			<ul>
				{items.map(item => (
					<CartItem key={item.id} item={item} />
				))}
			</ul>
			<p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
			<p className="modal-actions">
				<Button textOnly onClick={hideCart}>
					Close
				</Button>
				{items.length > 0 && <Button onClick={showCheckout}>Go to Checkout</Button>}
			</p>
		</Modal>
	);
}
