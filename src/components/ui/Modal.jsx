import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children, className = "" }) {
	const modal = useRef();

	useEffect(() => {
		if (open) {
			modal.current.showModal();
		}
		return () => modal.current.close();
	}, [open]);

	return createPortal(
		<dialog ref={modal} className={"modal " + className} onClose={onClose}>
			{children}
		</dialog>,
		document.getElementById("modal")
	);
}
