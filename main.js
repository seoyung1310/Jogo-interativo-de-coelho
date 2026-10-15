// ====== BANCO DE PERGUNTAS - ARTES VISUAIS ======
const perguntas = [
    {
        pergunta: "Quais são as três cores PRIMÁRIAS?",
        alternativas: [
            "Verde, laranja e roxo",
            "Azul, vermelho e amarelo",
            "Preto, branco e cinza",
            "Rosa, azul e verde"
        ],
        correta: 1
    },
    {
        pergunta: "Qual artista brasileira é famosa por suas esculturas de bichos coloridos?",
        alternativas: [
            "Tarsila do Amaral",
            "Beatriz Milhazes",
            "Adriana Varejão",
            "Tomie Ohtake"
        ],
        correta: 0
    },
    {
        pergunta: "Misturando AZUL + AMARELO, obtemos qual cor?",
        alternativas: [
            "Laranja",
            "Roxo",
            "Verde",
            "Rosa"
        ],
        correta: 2
    },
    {
        pergunta: "Como se chama a arte de fazer desenhos com pequenos pedaços de pedra ou vidro colorido?",
        alternativas: [
            "Pintura a óleo",
            "Mosaico",
            "Aquarela",
            "Grafite"
        ],
        correta: 1
    },
    {
        pergunta: "Qual desses é um famoso quadro da artista brasileira Tarsila do Amaral?",
        alternativas: [
            "Mona Lisa",
            "Abaporu",
            "Noite Estrelada",
            "O Grito"
        ],
        correta: 1
    }
];

// ====== ESTADO DO JOGO ======
const estado = {
    perguntaAtual: 0,
    pontos: 0,
    vidas: 3,
    respondida: false
};

// ====== ELEMENTOS DO DOM ======
const telas = {
    inicial: document.getElementById('tela-inicial'),
    jogo: document.getElementById('tela-jogo'),
    final: document.getElementById('tela-final')
};

const elementos = {
    pontos: document.getElementById('pontos'),
    vidas: document.getElementById('vidas'),
    contador: document.getElementById('contador'),
    pergunta: document.getElementById('pergunta'),
    alternativas: document.getElementById('alternativas'),
    feedback: document.getElementById('feedback'),
    tituloFinal: document.getElementById('titulo-final'),
    emojiFinal: document.getElementById('emoji-final'),
    coelhoFinal: document.getElementById('coelho-final'),
    mensagemFinal: document.getElementById('mensagem-final'),
    pontosFinais: document.getElementById('pontos-finais')
};

// ====== FUNÇÕES ======
function trocarTela(nomeTela) {
    Object.values(telas).forEach(tela => tela.classList.remove('ativa'));
    telas[nomeTela].classList.add('ativa');
}

function atualizarPainel() {
    elementos.pontos.textContent = estado.pontos;

    // Corações pastéis (💗) representando vidas
    const coracoesCheios = '💗'.repeat(Math.max(estado.vidas, 0));
    const coracoesVazios = '🤍'.repeat(Math.max(3 - estado.vidas, 0));
    elementos.vidas.textContent = coracoesCheios + coracoesVazios;

    elementos.contador.textContent = `${estado.perguntaAtual + 1}/${perguntas.length}`;
}

function carregarPergunta() {
    estado.respondida = false;
    elementos.feedback.textContent = '';
    elementos.feedback.className = 'feedback';

    const p = perguntas[estado.perguntaAtual];
    elementos.pergunta.textContent = p.pergunta;

    elementos.alternativas.innerHTML = '';

    p.alternativas.forEach((texto, index) => {
        const btn = document.createElement('button');
        btn.classList.add('alternativa');
        btn.textContent = `${String.fromCharCode(65 + index)}) ${texto}`;
        btn.addEventListener('click', () => responder(index, btn));
        elementos.alternativas.appendChild(btn);
    });

    atualizarPainel();
}

function responder(indiceEscolhido, botaoClicado) {
    if (estado.respondida) return;
    estado.respondida = true;

    const p = perguntas[estado.perguntaAtual];
    const botoes = document.querySelectorAll('.alternativa');
    botoes.forEach(b => b.disabled = true);

    if (indiceEscolhido === p.correta) {
        botaoClicado.classList.add('correta');
        estado.pontos += 10;
        elementos.feedback.textContent = '🎨 Acertou! +10 pontos para você!';
        elementos.feedback.classList.add('acerto');
    } else {
        botaoClicado.classList.add('errada');
        botoes[p.correta].classList.add('correta');
        estado.vidas--;
        elementos.feedback.textContent = '🐰 Ops! O coelhinho diz: resposta errada!';
        elementos.feedback.classList.add('erro');
    }

    atualizarPainel();

    if (estado.vidas <= 0) {
        setTimeout(() => finalizarJogo(false), 1600);
        return;
    }

    setTimeout(() => {
        estado.perguntaAtual++;
        if (estado.perguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            finalizarJogo(true);
        }
    }, 1600);
}

function finalizarJogo(completou) {
    trocarTela('final');
    elementos.pontosFinais.textContent = estado.pontos;

    const totalPossivel = perguntas.length * 10;

    if (!completou) {
        elementos.tituloFinal.textContent = 'Fim de Jogo! 😢';
        elementos.emojiFinal.textContent = '💔';
        elementos.coelhoFinal.textContent = '😿';
        elementos.mensagemFinal.textContent = 'O coelhinho ficou triste! Tente novamente.';
    } else if (estado.pontos === totalPossivel) {
        elementos.tituloFinal.textContent = 'Perfeito! 🌟';
        elementos.emojiFinal.textContent = '🏆';
        elementos.coelhoFinal.textContent = '🐰';
        elementos.mensagemFinal.textContent = 'Uau! Você é um verdadeiro artista! Acertou tudo!';
    } else if (estado.pontos >= totalPossivel * 0.6) {
        elementos.tituloFinal.textContent = 'Muito Bem! 🎉';
        elementos.emojiFinal.textContent = '🥈';
        elementos.coelhoFinal.textContent = '😊';
        elementos.mensagemFinal.textContent = 'Ótimo resultado! O coelhinho está orgulhoso!';
    } else {
        elementos.tituloFinal.textContent = 'Boa Tentativa! 💪';
        elementos.emojiFinal.textContent = '🥉';
        elementos.coelhoFinal.textContent = '🐰';
        elementos.mensagemFinal.textContent = 'Continue estudando arte, você vai melhorar!';
    }
}

function iniciarJogo() {
    estado.perguntaAtual = 0;
    estado.pontos = 0;
    estado.vidas = 3;
    estado.respondida = false;
    trocarTela('jogo');
    carregarPergunta();
}

// ====== EVENTOS ======
document.getElementById('btn-iniciar').addEventListener('click', iniciarJogo);
document.getElementById('btn-reiniciar').addEventListener('click', iniciarJogo);