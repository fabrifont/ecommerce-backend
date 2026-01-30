import { ProductManager, CartManager } from "./classes.mjs";
import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";
import viewsRouter from "./routers/viewsRouter.js";
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
app.use("/products", productsRouter(productManager));

// ----------------------------  API: Manejo de carritos  ---------------------------------------

const cartManager = new CartManager();
cartManager.load("./carts.json");
app.use("/carts", cartsRouter(cartManager));

// ----------------------------  Server Side Rendering (Handlebars)  ---------------------------------------

app.use("/", viewsRouter(productManager));

// ---------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
