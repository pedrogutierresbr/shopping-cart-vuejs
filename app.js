const vm = new Vue({
	el: "#app",
	data: {
		produtos: [],
	},
	methods: {
		async pegarProdutos() {
			const url = "./api/produtos.json";
			const produtos = await fetch(url)
				.then((response) => response.json())
				.then((data) => (this.produtos = data));
		},
	},
	created() {
		this.pegarProdutos();
	},
});
