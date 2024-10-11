import { createContext, useReducer } from "react";

const CartContext = createContext({
	items: [],
	addItem(item) {},
	removeItem(id) {},
});

function CartReducer(state, action) {
	switch (action.type) {
		case "ADD_ITEM": {
			const copyItems = [...state.items];
			const existItemIndex = state.items.findIndex(item => item.id === action.item.id);
			if (existItemIndex > -1) {
				const existItem = state.items[existItemIndex];
				const updatedItem = { ...existItem, quantity: existItem.quantity + 1 };
				copyItems[existItemIndex] = updatedItem;
			} else {
				copyItems.push({ ...action.item, quantity: 1 });
			}
			return { ...state, items: copyItems };
		}

		case "REMOVE_ITEM": {
			const copyItems = [...state.items];
			const existItemIndex = state.items.findIndex(item => item.id === action.id);
			const existingItem = state.items[existItemIndex];
			if (existingItem.quantity === 1) {
				copyItems.splice(existItemIndex, 1);
			} else {
				const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
				copyItems[existItemIndex] = updatedItem;
			}
			return { ...state, items: copyItems };
		}

		default:
			return state;
	}
}

export function CartContextProvider({ children }) {
	const [cart, cartDispatch] = useReducer(CartReducer, { items: [] });
	function addItem(item) {
		cartDispatch({ type: "ADD_ITEM", item });
	}
	function removeItem(id) {
		cartDispatch({ type: "REMOVE_ITEM", id });
	}
	const cartContextValue = { items: cart.items, addItem, removeItem };
	console.log(cart.items);
	return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
}
export default CartContext;
