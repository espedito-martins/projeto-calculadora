const form = document.getElementById('formulario-tarefa');                
const inputItemTarefa = document.getElementById('input-tarefa');
const inputItemPontos = document.getElementById('input-pontos');
const lista = document.getElementById('lista-de-tarefas');
const placarEl = document.getElementById('total-pontos');
const mensagemVaziaEl = document.querySelector('.mensagem-lista-vazia');

// Adicionei nova mudança
// Adicionei novo comentario

let totalPontos = 0;
function atualizarPlacar() {
  placarEl.textContent = totalPontos;
}

function verificarListaVazia() {
  const itens = lista.children.length;

  if (itens === 0) {
    mensagemVaziaEl.textContent = 'Nenhuma tarefa cadastrada. Adicione a primeira!';
    mensagemVaziaEl.style.display = 'block';
  } else {
    mensagemVaziaEl.textContent = '';
    mensagemVaziaEl.style.display = 'none';
  }
}

function criaNovaTarefa(nome, pontos) {
  const li = document.createElement('li');
  li.classList.add('item-tarefa');
  li.dataset.pontos = String(pontos); 

  const divInfo = document.createElement('div');
  divInfo.classList.add('info-tarefa');

  const pNome = document.createElement('p');
  pNome.classList.add('nome-tarefa');
  pNome.textContent = nome;

  const pPontos = document.createElement('p');
  pPontos.classList.add('pontos-tarefa');

  pPontos.textContent = `Valor: ${pontos} pontos`;

  const btnRemover = document.createElement('button');
  btnRemover.classList.add('button-remover');
  btnRemover.textContent = 'X';

  btnRemover.addEventListener('click', () => {
    const pontosItem = Number(li.dataset.pontos) || 0;
    totalPontos -= pontosItem;
    if (totalPontos < 0) totalPontos = 0; 

    atualizarPlacar();
    li.remove();
    verificarListaVazia();
  });

  li.appendChild(divInfo);
  li.appendChild(btnRemover);
  divInfo.appendChild(pNome);
  divInfo.appendChild(pPontos);

  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = inputItemTarefa.value.trim();
  const pontos = Number(inputItemPontos.value);

  if (!nome || isNaN(pontos) || pontos <= 0) {
    alert('Digite o nome da tarefa e pontos válidos (>= 1).');
    return;
  }

  const item = criaNovaTarefa(nome, pontos);
  lista.appendChild(item);

  totalPontos += pontos;
  atualizarPlacar();

  verificarListaVazia();

  form.reset();
  inputItemPontos.value = 10; 
  inputItemTarefa.focus();
});

atualizarPlacar();
verificarListaVazia();
