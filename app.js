const vm = new Vue({
	el: "#app",
	data: {
		produtos: [],
		produto: false,
		carrinho: [],
		mensagemAlerta: "Item Adicionado",
		alertaAtivo: false,
		carrinhoAtivo: false,
	},
	filters: {
		numeroPreco(valor) {
			return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
		},
	},
	computed: {
		carrinhoTotal() {
			let total = 0;
			if (this.carrinho.length) {
				this.carrinho.forEach((item) => {
					total += item.preco;
				});
			}
			return total;
		},
	},
	watch: {
		produto() {
			document.title = this.produto.nome || "Techno";
			const hash = this.produto.id || "";
			history.pushState(null, null, `#${hash}`);
			if (this.produto) this.compararEstoque();
		},
		carrinho() {
			window.localStorage.carrinho = JSON.stringify(this.carrinho);
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
		clickForaCarrinho({ target, currentTarget }) {
			if (target === currentTarget) this.carrinhoAtivo = false;
		},
		adicionarItem() {
			this.produto.estoque--;
			const { id, nome, preco } = this.produto;
			this.carrinho.push({ id, nome, preco });
			this.alerta(`${nome} foi adicionado ao carrinho.`);
		},
		removerItem(index) {
			this.carrinho.splice(index, 1);
		},
		checarLocalStorage() {
			if (window.localStorage.carrinho) {
				this.carrinho = JSON.parse(window.localStorage.carrinho);
			}
		},
		alerta(mensagem) {
			this.mensagem = mensagem;
			this.alertaAtivo = true;
			setTimeout(() => {
				this.alertaAtivo = false;
			}, 800);
		},
		router() {
			const hash = document.location.hash;
			if (hash) {
				this.fetchProduto(hash.replace("#", ""));
			}
		},
		compararEstoque() {
			const items = this.carrinho.filter(({ id }) => id === this.produto.id);
			this.produto.estoque -= items.length;
		},
	},
	created() {
		this.fetchProdutos();
		this.router();
		this.checarLocalStorage();
	},
});
