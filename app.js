class ProductManager {
    constructor() {
        this.products = [];
    }

    // Adds a product to the products array. Before doing it, checks if
    // the entered product's code exists in it, and if there's any null fields.
    addProduct(product) {
        try {
            this.products.forEach((listedProduct) => {
                if (product.code === listedProduct.code)
                    throw new Error("Product code already exists.");
            });

            if (
                product.title &&
                product.description &&
                product.price &&
                product.thumbnail &&
                product.code &&
                product.stock
            ) {
                this.products.push(product);
            } else {
                throw new Error(
                    "There are one or more invalid fields in the product."
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductByProperty(value, property) {
        try {
            let filteredProducts = this.products.filter(
                (item) => item[property] === value
            );
            if (filteredProducts.length === 0) {
                throw new Error("Not found");
            } else if (filteredProducts.length > 1) {
                return filteredProducts;
            } else {
                return filteredProducts[0];
            }
        } catch (error) {
            console.error(error);
        }
    }

    getProductById(id) {
        return this.getProductByProperty(id, "id");
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
