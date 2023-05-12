const vm = new Vue({
	el: "#app",
	data: {
		produtos: [],
		produto: {},
	},
	filters: {
		numeroPreco(valor) {
			return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
		},
	},
	methods: {
		async fetchProdutos() {
			const url = "./api/produtos.json";
			const produtos = await fetch(url)
				.then((response) => response.json())
				.then((data) => (this.produtos = data));
		},
		async fetchProduto(id) {
			const url = `./api/produtos/${id}/dados.json`;
			const produto = await fetch(url)
				.then((response) => response.json())
				.then((data) => (this.produto = data));
		},
		abrirModal(id) {
			this.fetchProduto(id);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		},
		fecharModal({ target, currentTarget }) {
			if (target === currentTarget) this.produto = false;
		},
	},
	created() {
		this.fetchProdutos();
	},
});
