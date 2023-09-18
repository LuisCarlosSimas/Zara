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

function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
};

function criarPedidoHistorico(pedidoComData){
    const elementoPedido = `
        <p style="font-weight: bold;">${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR', {hour:"2-digit", minute:"2-digit",})}</p>
        <section id="container-pedidos-${pedidoComData.dataPedido}">
        
        </section>
        `;
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML += elementoPedido;
    for(const idProduto in pedidoComData.pedido){
        desenharProdutoNoCarrinhoSimples(idProduto,`container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);
    };
};

function rederizarHistoricoPedidos(){
    const historico=lerLocalStorage("historico");
    try {
        for(const pedidoComData of historico){
            criarPedidoHistorico(pedidoComData);
        };
    } catch {
        const h1 = document.createElement("h1");
        const h2 = document.createElement("h2");
        h1.textContent = "Ops...";
        h2.textContent = "Você ainda não possui pedidos anteriores";
        document.getElementsByTagName("main")[0].appendChild(h1);
        document.getElementsByTagName("main")[0].appendChild(h2);
    }
};


rederizarHistoricoPedidos();
