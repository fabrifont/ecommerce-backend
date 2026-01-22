const fs = require("node:fs/promises");

class ProductManager {
	constructor() {
		this.products = [];
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		try {
			this.products.push({
				id: this.products.length + 1,
				title: title,
				description: description,
				price: price,
				thumbnail: thumbnail,
				code: code,
				stock: stock,
			});
		} catch (error) {
			console.error(error);
		}
	}

	getProducts() {
		return this.products;
	}

	getProductById(id) {
		const id_list = this.products.map((product) => product.id);
		const productIndex = id_list.indexOf(id);
		return this.products[productIndex];
	}

	deleteProduct(id) {
		const id_list = this.products.map((product) => product.id);
		const productIndex = id_list.indexOf(id);
		this.products.remove(productIndex);
	}

	updateProduct(id, property, value) {
		try {
			if (property === "id") throw new Error("ID is not modifiable");
			if (this.products.length === 0) throw new Error("No products available");
			if (!(property in this.products[0].keys))
				throw new Error("Invalid property");

			const id_list = this.products.map((product) => product.id);
			const productIndex = id_list.indexOf(id);
			this.products[productIndex][property] = value;
		} catch (error) {
			console.error(error);
		}
	}

	async save(file) {
		try {
			const products = this.products;
			const data = JSON.stringify(products, null, 2);
			await fs.writeFile(file, data);
		} catch (error) {
			throw error;
		}
	}

	async load(file) {
		try {
			const data = await fs.readFile(file);
			this.products = JSON.parse(data);
		} catch (error) {
			throw error;
		}
	}
}

class CartManager {
	constructor() {
		this.carts = [];
	}

	addCart() {
		this.carts.push({
			id: this.carts.length + 1,
			products: [],
		});
	}

	getCart(id) {
		const id_list = this.carts.map((cart) => cart.id);
		const cartIndex = id_list.indexOf(id);
		return this.carts[cartIndex].products;
	}

	addProductToCart(cart_id, product_id) {
		try {
			const id_list = this.carts[cart_id].map((product) => product.id);
			const productIndex = id_list.indexOf(product_id);
			if (productIndex === -1) {
				this.carts[cart_id].push({
					id: product_id,
					quantity: 1,
				});
			} else {
				this.carts[cart_id][productIndex].quantity += 1;
			}
		} catch (error) {
			console.error(error);
		}
	}

	async save(file) {
		try {
			const products = this.carts;
			const data = JSON.stringify(products, null, 2);
			await fs.writeFile(file, data);
		} catch (error) {
			throw error;
		}
	}

	async load(file) {
		try {
			const data = await fs.readFile(file);
			this.products = JSON.parse(data);
		} catch (error) {
			throw error;
		}
	}
}

modules.export = { ProductManager, CartManager };
