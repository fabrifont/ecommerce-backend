import express from "express";

export default function cartsRouter(cartManager) {
	const router = express.Router();

	//    POST /carts/
	/*    Debe crear un nuevo carrito con la siguiente estructura:

            id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).

            products: Array que contendrá objetos que representen cada producto.
*/

	router.post("/", (req, res) => {
		console.log(`Petición POST /carts/ recibida`);
		cartManager.addCart();
		res.send();
		cartManager.save("./carts.json");
	});

	//    GET /carts/:cid
	//    Debe listar los productos que pertenecen al carrito con el cid proporcionado.
	router.get("/:cid", (req, res) => {
		console.log(`Petición GET /carts/${req.params.cid} recibida`);
		const cid = req.params.cid;
		const cart = cartManager.getCart(cid);
		res.send(cart);
	});

	//    POST /carts/:cid/product/:pid
	/*    Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:

            product: Solo debe contener el ID del producto.

            quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).

    Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

*/
	router.post("/:cid/product/:pid", (req, res) => {
		try {
			const cid = req.params.cid;
			const pid = req.params.pid;
			console.log(`Petición GET /carts/${cid}/product/${pid} recibida`);
			cartManager.addProductToCart(cid, pid, productManager);
			res.send();
			cartManager.save("./carts.json");
		} catch (error) {
			console.error(error);
		}
	});

	return router;
}
