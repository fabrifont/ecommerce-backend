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
		const length = this.products.length;
		let i;
		try {
			if (id < 1) throw new Error("ID cannot be less than one");
			if (this.products[id - 1].id === id) return this.products[id - 1];
			else if (
				this.products[id - 1].id > id ||
				this.products[id] === undefined
			) {
				i = this.products[id] === undefined ? length : id - 1;
			}
			while (0 < i) {
				if (this.products[i].id === id) return this.products[i];
				i - 1;
			}
			throw new Error("ID not found");
		} catch (error) {
			console.error(error);
		}
	}
}

class CartManager {
	constructor() {}
}

modules.export = { ProductManager, CartManager };
