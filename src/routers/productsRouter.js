import express from "express";

export default function productsRouter(productManager) {
	const router = express.Router();

	//    GET /products/
	//    Debe listar todos los productos de la base de datos.
	router.get("/", (req, res) => {
		console.log("Petición GET /products/ recibida");
		res.send(productManager.products);
	});

	//    GET /products/:pid
	//    Debe traer solo el producto con el id proporcionado.
	router.get("/:pid", (req, res) => {
		console.log("Petición GET /products/:pid recibida");
		const pid = req.params.pid;
		const requestedProduct = productManager.getProductById(pid);
		if (requestedProduct == undefined) res.send("Product not found");
		res.send(requestedProduct);
	});

	//    POST /products/
	/*    Debe agregar un nuevo producto con los siguientes campos:

        id: Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).

        title: String

        description: String

        code: String

        price: Number

        status: Boolean

        stock: Number

        category: String

        thumbnails: Array de Strings (rutas donde están almacenadas las imágenes del producto).
*/
	router.post("/", (req, res) => {
		console.log("Petición POST /products/ recibida");
		try {
			const new_product = req.body;
			productManager.addProduct(new_product);
			res.send();
			productManager.save("./products.json");
		} catch (error) {
			res.send(error);
		}
	});
	//    PUT /products/:pid
	//    Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el id al momento de hacer la actualización.

	router.put("/:pid", (req, res) => {
		console.log(`Petición PUT /products/${req.params.pid} recibida`);
		try {
			const body = req.body;
			const pid = req.params.pid;
			const keys = Object.keys(body);
			const values = Object.values(body);
			const amount = keys.length;
			for (let i = 0; i < amount; i++) {
				productManager.updateProduct(pid, keys[i], values[i]);
			}
			res.send();
			productManager.save("products.json");
		} catch (error) {
			console.error(error);
			res.send(error);
		}
	});

	//    DELETE /products/:pid
	//    Debe eliminar el producto con el pid indicado.
	router.delete("/:pid", (req, res) => {
		console.log(`Petición DELETE /products/${req.params.pid} recibida`);
		const pid = req.params.pid;
		productManager.deleteProduct(pid);
		res.send();
		productManager.save("./products.json");
	});

	return router;
}
