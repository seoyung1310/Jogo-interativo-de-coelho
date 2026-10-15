// script.js — lógica completa do jogo Verdadeiro ou Falso (Artes)
// Elementos do DOM
const telaInicio = document.getElementById('telaInicio');
const telaJogo = document.getElementById('telaJogo');
const telaFinal = document.getElementById('telaFinal');
const btnIniciar = document.getElementById('btnIniciar');
const btnReiniciar = document.getElementById('btnReiniciar');
const textoPergunta = document.getElementById('textoPergunta');
const btnVerdadeiro = document.getElementById('btnVerdadeiro');
const btnFalso = document.getElementById('btnFalso');
const pontosDisplay = document.getElementById('pontosDisplay');
const vidasDisplay = document.getElementById('vidasDisplay');
const perguntaAtualSpan = document.getElementById('perguntaAtual');
const totalPerguntasSpan = document.getElementById('totalPerguntas');
const pontosFinais = document.getElementById('pontosFinais');
const mensagemFinal = document.getElementById('mensagemFinal');
const feedbackFinal = document.getElementById('feedbackFinal');
const caixaPergunta = document.querySelector('.caixa-pergunta');

// Dados do jogo: perguntas de Artes (Verdadeiro ou Falso)
const perguntas = [
  { afirmacao: "As cores primárias são vermelho, azul e amarelo.", resposta: true },
  { afirmacao: "A Mona Lisa foi pintada por Vincent van Gogh.", resposta: false },
  { afirmacao: "O pontilhismo é uma técnica que usa pequenos pontos de cor.", resposta: true },
  { afirmacao: "Escultura é uma forma de arte que só pode ser feita com mármore.", resposta: false },
  { afirmacao: "O teatro de sombras é uma manifestação artística antiga.", resposta: true },
  { afirmacao: "A arte abstrata representa objetos de forma bem realista.", resposta: false },
  { afirmacao: "O balé é um estilo de dança clássica.", resposta: true }
];

// Variáveis de estado
let indiceAtual = 0;          // pergunta atual
let pontos = 0;
let vidas = 3;
let jogoAtivo = false;
let totalPerguntas = perguntas.length;

// Inicialização dos displays
totalPerguntasSpan.textContent = totalPerguntas;

// Função para mostrar telas
function mostrarTela(tela) {
  [telaInicio, telaJogo, telaFinal].forEach(t => t.classList.remove('ativa'));
  tela.classList.add('ativa');
}

// Resetar o jogo
function resetarJogo() {
  indiceAtual = 0;
  pontos = 0;
  vidas = 3;
  jogoAtivo = true;
  atualizarPlacar();
  caixaPergunta.classList.remove('correta', 'errada');
  mostrarTela(telaJogo);
  carregarPergunta();
}

// Atualiza pontos e vidas na tela
function atualizarPlacar() {
  pontosDisplay.textContent = pontos;
  vidasDisplay.textContent = vidas;
  perguntaAtualSpan.textContent = indiceAtual + 1;
}

// Carrega a pergunta atual
function carregarPergunta() {
  if (!jogoAtivo) return;

  // Verifica se ainda há perguntas e vidas
  if (indiceAtual >= totalPerguntas || vidas <= 0) {
    finalizarJogo();
    return;
  }

  // Remove classes de feedback anterior
  caixaPergunta.classList.remove('correta', 'errada');
  
  const pergunta = perguntas[indiceAtual];
  textoPergunta.textContent = pergunta.afirmacao;
  atualizarPlacar();
}

// Verifica a resposta do usuário
function verificarResposta(respostaUsuario) {
  if (!jogoAtivo) return;

  const pergunta = perguntas[indiceAtual];
  const acertou = (respostaUsuario === pergunta.resposta);

  // Feedback visual
  caixaPergunta.classList.remove('correta', 'errada');
  if (acertou) {
    caixaPergunta.classList.add('correta');
    pontos += 1;
  } else {
    caixaPergunta.classList.add('errada');
    vidas -= 1;
  }

  atualizarPlacar();

  // Avança para próxima pergunta ou finaliza
  indiceAtual++;
  
  // Verifica se o jogo deve continuar
  if (indiceAtual >= totalPerguntas || vidas <= 0) {
    // Pequeno delay para o usuário ver o feedback antes de finalizar
    setTimeout(() => {
      finalizarJogo();
    }, 500);
  } else {
    // Carrega próxima pergunta com um pequeno atraso para ver a cor
    setTimeout(() => {
      carregarPergunta();
    }, 400);
  }
}

// Finaliza o jogo e mostra a tela final
function finalizarJogo() {
  jogoAtivo = false;
  pontosFinais.textContent = pontos;

  // Define mensagem de acordo com pontuação e vidas
  if (vidas <= 0) {
    mensagemFinal.textContent = '😢 Suas vidas acabaram!';
    feedbackFinal.textContent = 'Não desista! Tente novamente para aprender mais sobre arte.';
  } else if (pontos === totalPerguntas) {
    mensagemFinal.textContent = '🏆 PERFEITO! Você é um artista!';
    feedbackFinal.textContent = 'Uau! Você acertou tudo! Continue assim!';
  } else if (pontos >= totalPerguntas / 2) {
    mensagemFinal.textContent = '🎨 Muito bem! Você foi ótimo!';
    feedbackFinal.textContent = 'Você sabe bastante sobre arte! Continue praticando.';
  } else {
    mensagemFinal.textContent = '🐰 Continue tentando!';
    feedbackFinal.textContent = 'Cada erro é uma chance de aprender mais sobre arte!';
  }

  mostrarTela(telaFinal);
}

// Eventos de clique
btnIniciar.addEventListener('click', () => {
  resetarJogo();
});

btnReiniciar.addEventListener('click', () => {
  resetarJogo();
});

btnVerdadeiro.addEventListener('click', () => {
  verificarResposta(true);
});

btnFalso.addEventListener('click', () => {
  verificarResposta(false);
});

// Inicializa mostrando a tela de início
mostrarTela(telaInicio);
