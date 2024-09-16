// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
        produtoExistente.valor += valor * quantidade; // Atualizar o valor total do produto
    } else {
        carrinho.push({ id, nome, valor: valor * quantidade, quantidade }); // Multiplicar valor pela quantidade
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (!carrinho) return;

    carrinho = carrinho.filter(produto => produto.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}`;
            
            // Botão para remover o produto
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerProduto(produto.id);

            li.appendChild(btnRemover);
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Função para adicionar produtos ao carrinho ao clicar na imagem
function configurarEventosDeClique() {
    const produtos = document.querySelectorAll('.produto');
    produtos.forEach(produto => {
        const id = parseInt(produto.querySelector('p:nth-child(2)').textContent.split(': ')[1]);
        const nome = produto.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        const valor = parseFloat(produto.querySelector('p:nth-child(4)').textContent.split(': ')[1].replace('R$', '').replace(',', '.'));
        const quantidade = parseInt(produto.querySelector('p:nth-child(5)').textContent.split(': ')[1]);
        
        produto.querySelector('img').addEventListener('click', () => {
            adicionarProduto(id, nome, valor, quantidade);
        });
    });
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
document.addEventListener('DOMContentLoaded', () => {
    exibirCarrinho();
    configurarEventosDeClique();
});
