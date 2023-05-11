const vm = new Vue({
	el: "#app",
	data: {
		products: [],
	},
	methods: {
		async getProducts() {
			const url = "./api/produtos.json";
			const products = await fetch(url)
				.then((response) => response.json())
				.then((data) => (this.products = data));
		},
	},
	created() {
		this.getProducts();
	},
});
