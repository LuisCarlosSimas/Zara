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

const catalogoProdutos = document.getElementById("container-produto");

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};


function rederizarCatalogo() {
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto = `
            <div class="${produtoCatalogo.feminino ? "feminino" : "masculino"}" id="card-produto-${produtoCatalogo.id}">
                <img src="images/${produtoCatalogo.imagem}" alt="Imagem: ${produtoCatalogo.nome}"/>
                <p>${produtoCatalogo.marca}</p>
                <p>${produtoCatalogo.nome}</p>
                <p>$${produtoCatalogo.preco},00</p>
                <button id="adicionar-${produtoCatalogo.id}"><i class="fa-solid fa-cart-plus"></i></button>
            </div>`;
        document.getElementById("container-produto").innerHTML += cartaoProduto;
    };
    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener("click", ()=> addCarrinho(produtoCatalogo.id));
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener("click", ()=> mudaCor(produtoCatalogo.id));
    };
};

function mudaCor(idProduto){
    var botao=document.getElementById(`adicionar-${idProduto}`);
    botao.style.removeProperty("background-color");
    botao.style.setProperty("background-color", "rgb(118, 183, 118)");
    botao.innerHTML='<i class="fa-solid fa-check"></i>'
    setTimeout(function() {
        botao.style.removeProperty("background-color");
        botao.style.setProperty("background-color", "rgb(244, 197, 223)")
        botao.innerHTML='<i class="fa-solid fa-cart-plus"></i>'
    }, 500);
};

function abrirCarrinho() {
    document.getElementById("carrinho").style.removeProperty("right");
    document.getElementById("carrinho").style.setProperty("right", "0");
};

function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIrParaCheckout = document.getElementById("finalizar-compra");
    const botaoCorpo = document.getElementsByTagName("main")[0];
    const botaoCabeca = document.getElementsByTagName("header")[0];

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
    botaoIrParaCheckout.addEventListener("click", irParaCheckout);
    botaoCorpo.addEventListener("click", function(event) {
        if (event.target.tagName!=="BUTTON" && event.target.tagName!=="I" && event.target.id!=="filtros" && !(event.target.tagName === "LABEL" && event.target.querySelector("input"))) {
            fecharCarrinho();
        };
    });
    botaoCabeca.addEventListener("click", function(event) {
        if (event.target.hasChildNodes()) {
            fecharCarrinho();
        };
    });
};

function fecharCarrinho() {
    document.getElementById("carrinho").style.removeProperty("right");
    document.getElementById("carrinho").style.setProperty("right", "-320px");
};



function addCarrinho(idProduto) {
    if (idProduto in idsProdutoCarrinhoComQuantidade){
        incrementarQuantidadeProduto(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    desenharProdutoNoCarrinho(idProduto);
};

function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    const elementoArticle = document.createElement('article'); // <article></article>
    const cartaoProdutoCarrinho=`
        <button id="remover-item-${produto.id}"><i class="fa-solid fa-circle-xmark"></i></button>
        <img src="images/${produto.imagem}" alt="Carrinho: ${produto.nome}">
        <div id="texto-card-produto-carrinho-${produto.id}">
            <p id="texto-nome-${produto.id}">${produto.nome}</p>
            <p id="texto-tamanho-${produto.id}">Tamanho Unico</p>
            <p id="texto-preco-${produto.id}">$${produto.preco}</p>
        </div>
        <div id="botoes-card-produto-carrinho-${produto.id}">
            <button id="decrementar-produto-${produto.id}">-</button>
            <p id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
            <button id="incrementar-produto-${produto.id}">+</button>
        </div>`;
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);
    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(produto.id));
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
    document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));
    atualizarPrecoCarrinho();
};

function rederizarProdutosCarrinho(){
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";
    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinho(idProduto);
    };
};

function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao));
};

function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
};

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
};

function atualizarPrecoCarrinho(){
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
        precoTotalCarrinho += catalogo.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    };
    precoCarrinho.innerText=`Total $${precoTotalCarrinho}`;
};

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
};

function decrementarQuantidadeProduto(idProduto){
    if(idsProdutoCarrinhoComQuantidade[idProduto]===1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
};

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    rederizarProdutosCarrinho();
};

function iniciarFiltros(){
    document.getElementById("exibir-femininos").addEventListener("click", esconderMasculinos);
    document.getElementById("exibir-masculinos").addEventListener("click", esconderFemininos);
    document.getElementById("exibir-todos").addEventListener("click", exibirTodos); 
};

function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName("escondido"));
    for(const produto of produtosEscondidos){
        produto.style.removeProperty("display");
        produto.classList.remove('escondido');
    };
};

function esconderFemininos(){
    exibirTodos();
    const produtosFemininos = Array.from(catalogoProdutos.getElementsByClassName('feminino'));
    for(const produto of produtosFemininos){
        produto.style.display="none";
        produto.classList.add('escondido');
    };
};

function esconderMasculinos(){
    exibirTodos();
    const produtosMasculinos = Array.from(catalogoProdutos.getElementsByClassName('masculino'));
    for(const produto of produtosMasculinos){
        produto.style.display="none";
        produto.classList.add('escondido');
    };
};

function irParaCheckout(){
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return;
    };
    window.location.href = "/html/checkout.html";
};

window.alert("Site Ilustrativo! Nenhuma compra sera realizada! Site Não Oficial!")
rederizarCatalogo();
inicializarCarrinho();
iniciarFiltros(); 
rederizarProdutosCarrinho();
atualizarPrecoCarrinho();
