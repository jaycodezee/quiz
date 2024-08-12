'use client';
import React, { useState ,useEffect } from 'react';
import { quiz } from '../data';
import { useRouter } from 'next/navigation.js';

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface QuizData {
  questions: Question[];
}

interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const Page: React.FC = () => {
  const router = useRouter();
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions }: QuizData = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (answer: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer === correctAnswer);
  };
  useEffect(() => {
    const user = localStorage.getItem('users');
    if (!user) {
      router.push('/user'); 
    }
  }, [router]);

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className="container">
     <title>quiz web app</title>
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question {activeQuestion + 1} of {questions.length}
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{question}</h3>
            <ul>
              {answers.map((answer, idx) => (
                <li
                  key={idx}
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={
                    selectedAnswerIndex === idx ? "li-selected" : "li-hover"
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <button
              onClick={nextQuestion}
              className={checked ? "btn" : "btn-disabled"}
              disabled={!checked}
            >
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        ) : (
          <div className="quiz-container results-container">
            <h3>Quiz Completed!</h3>
            <p>Your Score: {(result.score / (questions.length * 5)) * 100}%</p>
            <p>Total Questions: {questions.length}</p>
            <p>Correct Answers: {result.correctAnswers}</p>
            <p>Wrong Answers: {result.wrongAnswers}</p>
            <button onClick={() => window.location.reload()}>Thank You Plz Restart The Quiz</button>
          </div>
        )}
      </div>
      <button onClick={()=>router.push('/')}>Back to Home</button>
    </div>
  );
};

export default Page;
