import express from "express";

export default function viewsRouter(productManager) {
	const router = express.Router();

	router.get("/", (req, res) => {
		res.render("index", {
			layout: "main.handlebars",
			products: productManager.products,
		});
	});

	return router;
}
