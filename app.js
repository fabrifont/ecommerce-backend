import { ProductManager, CartManager } from "./classes.mjs";
import express from "express";
import handlebars from "express-handlebars";
const __dirname = import.meta.dirname;

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());

// ----------------------------  API: Manejo de productos  ---------------------------------------

const productManager = new ProductManager();
productManager.load("./products.json");

//    GET /products/
//    Debe listar todos los productos de la base de datos.
app.get("/products/", (req, res) => {
	console.log("Petición GET /products/ recibida");
	res.send(productManager.products);
});

//    GET /products/:pid
//    Debe traer solo el producto con el id proporcionado.
app.get("/products/:pid", (req, res) => {
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
app.post("/products/", (req, res) => {
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

app.put("/products/:pid", (req, res) => {
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
app.delete("/products/:pid", (req, res) => {
	console.log(`Petición DELETE /products/${req.params.pid} recibida`);
	const pid = req.params.pid;
	productManager.deleteProduct(pid);
	res.send();
	productManager.save("./products.json");
});

// ----------------------------  API: Manejo de carritos  ---------------------------------------

const cartManager = new CartManager();
cartManager.load("./carts.json");

//    POST /carts/
/*    Debe crear un nuevo carrito con la siguiente estructura:

            id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).

            products: Array que contendrá objetos que representen cada producto.
*/

app.post("/carts/", (req, res) => {
	console.log(`Petición POST /carts/ recibida`);
	cartManager.addCart();
	res.send();
	cartManager.save("./carts.json");
});

//    GET /carts/:cid
//    Debe listar los productos que pertenecen al carrito con el cid proporcionado.
app.get("/carts/:cid", (req, res) => {
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
app.post("/carts/:cid/product/:pid", (req, res) => {
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

// ----------------------------  Server Side Rendering (Handlebars)  ---------------------------------------

app.get("/", (req, res) => {
	res.render("index", { layout: "main.handlebars" });
});

// ---------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
