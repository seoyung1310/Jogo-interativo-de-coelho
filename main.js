import { useState } from "react";

const questions = [
  {
    category: "Cores",
    question: "Quais são as três cores primárias na pintura?",
    answers: [
      "Vermelho, azul e amarelo",
      "Verde, roxo e laranja",
      "Azul, verde e rosa",
      "Preto, branco e cinza",
    ],
    correct: 0,
    fact: "Com vermelho, azul e amarelo podemos criar muitas outras cores!",
  },
  // As demais perguntas ficam aqui
];

export default function App() {
  const [screen, setScreen] = useState<"start" | "game" | "finish">("start");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[questionIndex];
  const answered = selected !== null;

  function startGame() {
    setQuestionIndex(0);
    setScore(0);
    setLives(3);
    setSelected(null);
    setScreen("game");
  }

  function chooseAnswer(answerIndex: number) {
    if (answered) return;

    setSelected(answerIndex);

    if (answerIndex === question.correct) {
      setScore((current) => current + 10);
    } else {
      setLives((current) => Math.max(0, current - 1));
    }
  }

  function nextQuestion() {
    const outOfLives = lives === 0;
    const isLastQuestion = questionIndex === questions.length - 1;

    if (outOfLives || isLastQuestion) {
      setScreen("finish");
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelected(null);
  }

  return (
    <div className="app-shell">
      <header>{/* Logotipo e pontuação */}</header>

      <main>
        {screen === "start" && (
          <section>
            {/* Tela inicial */}
            <button onClick={startGame}>Começar a jogar</button>
          </section>
        )}

        {screen === "game" && (
          <section>
            {/* Pergunta, alternativas, vidas e feedback */}
          </section>
        )}

        {screen === "finish" && (
          <section>
            {/* Resultado final */}
            <button onClick={startGame}>Jogar novamente</button>
          </section>
        )}
      </main>

      <footer>Feito para pequenos grandes artistas</footer>
    </div>
  );
}
