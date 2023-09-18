const catalogo= [
    {
         id: '1', 
         marca: 'Zara', 
         nome: 'Camisa Larga com Bolsos', 
         preco: 70, 
         imagem: 'product-1.jpg', 
         feminino: false, 
    }, 
    { 
        id: '2', 
        marca: 'Zara', 
        nome: 'Casaco Reto com Lã', 
        preco: 85, 
        imagem: 'product-2.jpg', 
        feminino: true, 
    }, 
    { 
        id: '3', 
        marca: 'Zara', 
        nome: 'Jaqueta com Efeito Camurça', 
        preco: 60, 
        imagem: 'product-3.jpg', 
        feminino: false, 
    }, 
    { 
        id: '4', 
        marca: 'Zara', 
        nome: 'Sobretudo em Mescla de Lã', 
        preco: 160, 
        imagem: 'product-4.jpg', 
        feminino: false, 
    }, 
    {
        id: '5', 
        marca: 'Zara', 
        nome: 'Camisa Larga Acolchoada de Veludo Cotelê', 
        preco: 110, 
        imagem: 'product-5.jpg', 
        feminino: false, 
    }, 
    { 
        id: '6', 
        marca: 'Zara', 
        nome: 'Casaco de Lã com Botões', 
        preco: 170, 
        imagem: 'product-6.jpg', 
        feminino: true, 
    }, 
    { 
        id: '7', 
        marca: 'Zara', 
        nome: 'Casaco com Botões', 
        preco: 75, 
        imagem: 'product-7.jpg', 
        feminino: true, 
    }, 
    { 
        id: '8', 
        marca: 'Zara', 
        nome: 'Colete Comprido com Cinto', 
        preco: 88, 
        imagem: 'product-8.jpg', 
        feminino: true, 
    },
];

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};


function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
}

function desenharProdutoNoCarrinhoSimples(idProduto, idContainerHTML, quantidadeProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById(idContainerHTML);
    const elementoArticle = document.createElement('article'); // <article></article>
    const cartaoProdutoCarrinho=`
        <img id="imagem-${produto.nome}" src="../images/${produto.imagem}" alt="Carrinho: ${produto.nome}">
        <div id="textos-card-produto-${produto.id}">
            <p id="p-1-card-${produto.id}">${produto.nome}</p>
            <p id="p-2-card-${produto.id}">Tamanho Unico</p>
            <p id="p-3-card-${produto.id}">R$${produto.preco}</p>
        </div>
        <div id="div-quant-${produto.id}">
            <p id="quantidade-${produto.id}">${quantidadeProduto}</p>
        </div>`;
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);
}

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    };
};

function atualizarPreco(){
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
        precoTotalCarrinho += catalogo.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    };
    precoCarrinho.innerText=`Total $${precoTotalCarrinho}`;
};

function apagarDoLocalStorage(chave){
    localStorage.removeItem(chave);
};

function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao));
};

function finalizarCompra(evento){
    evento.preventDefault();
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return;
    };
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade,
    };
    const historicoDePedidos = lerLocalStorage("historico") ?? [];
    const historicoDePedidosAtualizado=[pedidoFeito, ...historicoDePedidos];
    salvarLocalStorage("historico", historicoDePedidosAtualizado);
    apagarDoLocalStorage("carrinho");
    window.location.href = "file:///D:/luisc/Documents/cursojs/%23/zara/html/pedidos.html";
};


desenharProdutosCheckout();
atualizarPreco();
document.addEventListener("submit", (evt) => finalizarCompra(evt));
