const vm = new Vue({
	el: "#app",
	data: {
		produtos: [],
	},
	filters: {
		numeroPreco(valor) {
			return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
		},
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
