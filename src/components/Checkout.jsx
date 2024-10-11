import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./ui/Button";

export default function Checkout() {
	const { items } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);
	const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

	function handleSubmit(e) {
		e.preventDefault();

		const fd = new FormData(e.target);
		const enteredData = Object.fromEntries(fd.entries());
		console.log(enteredData);
	}

	return (
		<Modal open={progress === "checkout"} onClose={hideCheckout}>
			<form onSubmit={handleSubmit}>
				<h2>checkout</h2>
				<p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
				<Input label={"Full Name"} type={"text"} id={"full-name"} />
				<Input label={"Email Address"} type={"email"} id={"email"} />
				<Input label={"Street"} type={"text"} id={"street"} />
				<div className="control-row">
					<Input label={"Postal Code"} type={"text"} id={"postal-code"} />
					<Input label={"City"} type={"text"} id={"city"} />
				</div>
				<div className="modal-actions">
					<Button textOnly onClick={hideCheckout}>
						close
					</Button>
					<Button>Submit order</Button>
				</div>
			</form>
		</Modal>
	);
}
