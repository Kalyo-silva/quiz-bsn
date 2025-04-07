import { useState } from "react";
import { questoes } from "./store/questoes.ts";
import "./App.css";
import terra_1 from "./assets/high.png";
import terra_2 from "./assets/mid.png";
import terra_3 from "./assets/low.png";

const imagens = [terra_1, terra_2, terra_3];

function App() {
    const [errorCount, setErrorCount] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Para armazenar a resposta selecionada
    const totalQuestoes = questoes.length;
    const totalImagens = imagens.length;

    const indiceImagem = Math.min(Math.floor((errorCount / totalQuestoes) * totalImagens), totalImagens - 1);

    function handleAnswer(optionIndex: number) {
        setSelectedAnswer(optionIndex);

        if (optionIndex !== questoes[currentQuestion].respostaCorreta) {
            setErrorCount((prev) => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestion < totalQuestoes) {
                setCurrentQuestion((prev)=> prev + 1);
                setSelectedAnswer(null);
            }
        }, 2000);
    }

    return (
        <div className="quiz-container">
            {currentQuestion >= totalQuestoes &&
                <h2>Fim de jogo, você acertou um total de {totalQuestoes - errorCount}</h2>
            }
            {currentQuestion < totalQuestoes &&
                <div className="quiz">
                    <h2>{questoes[currentQuestion].pergunta}</h2>
                    <div className="options-container">
                        {questoes[currentQuestion].opcoes.map((opcao, index) => {
                            const isCorrect = index === questoes[currentQuestion].respostaCorreta;
                            const isSelected = selectedAnswer === index;
                            const buttonClass = isSelected
                                ? isCorrect
                                    ? "correct selected"
                                    : "incorrect selected"
                                : selectedAnswer !== null && isCorrect
                                    ? "correctNotSelected"
                                    : "";

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className={buttonClass}
                                >
                                    {opcao}
                                </button>
                            );
                        })}
                    </div>

                    <div className="explanation-container">
                        <p style={{color: selectedAnswer !== null
                                ? selectedAnswer == questoes[currentQuestion].respostaCorreta
                                    ? "Green"
                                    : "Red"
                                : "black"
                        }}
                        >
                            {selectedAnswer !== null
                                ? questoes[currentQuestion].explicacaoErro[selectedAnswer]
                                : ""
                            }
                        </p>
                    </div>
                </div>
            }
            <div className="earth-container">
                <img alt="terra" src={imagens[indiceImagem]} className="rotating-earth" />
            </div>
        </div>
    );
}

export default App;
