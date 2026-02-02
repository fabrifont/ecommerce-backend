import { ProductManager, CartManager } from "./classes.mjs";
import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";
import viewsRouter from "./routers/viewsRouter.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import path from "node:path";
const __dirname = import.meta.dirname;

const app = express();
const http = createServer(app);
const io = new Server(http);
const PORT = 8080;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
	req.io = io;
	next();
});
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// ----------------------------  API: Manejo de productos  ---------------------------------------

const productManager = new ProductManager();
productManager.load("./products.json");
app.use("/api/products", productsRouter(productManager));

// ----------------------------  API: Manejo de carritos  ---------------------------------------

const cartManager = new CartManager();
cartManager.load("./carts.json");
app.use("/api/carts", cartsRouter(cartManager));

// ----------------------------  Server Side Rendering (Handlebars)  ---------------------------------------

app.use("/", viewsRouter(productManager));

// ----------------------------  API: Conexiones WebSockets  ---------------------------------------

io.on("connection", (socket) => {
	console.log(`Conexión WS iniciada: ${socket.id}`);
});

// ---------------------------------------------------------------------------------------------------------

http.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
