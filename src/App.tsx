import React, { useState } from "react";
import "./App.scss";

type QuizItem = {
  id: number; // Унікальний ідентифікатор питання
  question: string; // Текст питання
  options?: string[]; // Можливі відповіді (опціонально)
  trueAnswer: string; // Правильна відповідь
};

const api: QuizItem[] = [
  {
    id: 1,
    question:
      "Яке слово можна скласти, використовуючи тільки ці літери? М Н І У",
    options: ["нумізмат", "мінімум", "універмаг", "міністр"],
    trueAnswer: "мінімум",
  },
  {
    id: 2,
    question: "Які слова тут зашифровані? ТсЕвМіРтЯлВоА",
    trueAnswer: "Темрява і світло",
  },
  {
    id: 3,
    question:
      "Якого птаха тут зашифровано? 'АААААААААААААААААААААААААААААААААААААААА'",
    trueAnswer: "сорока",
  },
  {
    id: 4,
    question: "Вислюк говорить 2, кішка - 3, зозуля - 4, кінь - 5, а пес ...",
    trueAnswer: "3",
  },
  {
    id: 5,
    question:
      "Що тут заховано: 'Я знаю, що воно живе на дереві, але не білка і не птах. Воно не летить, але під час дощу тікає. Що це?'",
    trueAnswer: "листок",
  },
  {
    id: 6,
    question: "Знайди зайве слово: КРОКОДИЛ, ДЕРЕВО, БАЛЕРИНА, ЗАПАЛКА",
    options: ["крокодил", "дерево", "балерина", "запалка"],
    trueAnswer: "дерево (бо всі інші можуть горіти)",
  },
  {
    id: 7,
    question:
      "Яке слово завжди звучить неправильно, навіть якщо його сказати правильно?",
    trueAnswer: "Неправильно",
  },
  {
    id: 8,
    question: "Що стоїть посередині Києва?",
    trueAnswer: "Літера 'Є'",
  },
];

export const App = () => {
  const [go, setGo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeQuest, setActiveQuest] = useState<QuizItem>(api[currentIndex]);
  const [end, setEnd] = useState(false);
  const [answerIsActive, setAnswerIsActive] = useState(false);

  const goToNextQuestion = () => {
    setAnswerIsActive(false);

    if (currentIndex + 1 < api.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setActiveQuest(api[nextIndex]);
    } else {
      setEnd(true);
    }
  };

  const answerButton = () => {
    setAnswerIsActive(true);
  };

  return (
    <div className="app">
      <div className="app__container">
        {!go ? (
          <>
            <h1>Привіт кохана! Вітаю тебе з Новим Роком!</h1>
            <p>
              Зараз буде вікторина, *вуахахаха*, в кіньці якої ти отримаєш
              подарунок, якщо правильно відповіси на мої питання. Маю тільки 1
              важливе правило: якщо твоя відповідь буде неправильна - з тебе
              цьом!
            </p>
            <button
              onClick={() => {
                setGo(true);
              }}
              className="app__button"
            >
              Гоу маладой!
            </button>
          </>
        ) : !end ? (
          <>
            <div className="app__questions">
              <h1>{activeQuest?.question}</h1>
              {!answerIsActive ? (
                activeQuest?.options && (
                  <div className="app__options-block">
                    {activeQuest.options.map((option, index) => (
                      <div key={index} className="app__option">
                        {option}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="app__option">{activeQuest.trueAnswer}</div>
              )}

              {!answerIsActive ? (
                <button onClick={answerButton} className="app__button">
                  Показати відповідь
                </button>
              ) : (
                <button onClick={goToNextQuestion} className="app__button">
                  Далі
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="app__end">
            <h1>Вітаю, сонечко, із закінченням квестів! Поцьомав кохану в обидві щічки!</h1>
          </div>
        )}
      </div>
    </div>
  );
};
