const BITCOIN_PIZZA_DAY_QUIZ = {
  quiz_title: "PizzaDAO Quiz",
  description: "Test Your Knowledge on PizzaDAO and Its Mission!",
  sections: [
    {
      section_title: "General Knowledge",
      questions: [
        {
          question: "What is PizzaDAO?",
          options: {
            a: "A decentralized autonomous organization focused on pizza restaurants",
            b: "A blockchain-powered gaming platform",
            c: "A food delivery app",
            d: "A traditional pizza franchise",
          },
          answer: "a",
        },
        {
          question: "What event does PizzaDAO famously sponsor every year?",
          options: {
            a: "National Cheese Pizza Day",
            b: "Bitcoin Pizza Day",
            c: "National Pizza Week",
            d: "Global Crypto Festival",
          },
          answer: "b",
        },
        {
          question: "How does PizzaDAO support local pizzerias?",
          options: {
            a: "By purchasing and distributing free pizzas globally",
            b: "By creating a crypto-based rewards system",
            c: "By investing in pizza restaurant franchises",
            d: "By developing an AI-driven pizza-making robot",
          },
          answer: "a",
        },
        {
          question:
            "What cryptocurrency standard does PizzaDAO use for its community tokens?",
          options: {
            a: "ERC-20",
            b: "ERC-721",
            c: "ERC-1155",
            d: "Bitcoin Lightning Network",
          },
          answer: "a",
        },
      ],
    },
    {
      section_title: "Blockchain and PizzaDAO",
      questions: [
        {
          question:
            "Why is blockchain technology relevant to PizzaDAO's mission?",
          options: {
            a: "It ensures pizzas are delivered faster",
            b: "It enables transparent and decentralized funding for pizzerias",
            c: "It prevents people from ordering pineapple on pizza",
            d: "It allows anyone to mine pizza tokens",
          },
          answer: "b",
        },
        {
          question:
            "What is the significance of 'Bitcoin Pizza Day' in crypto history?",
          options: {
            a: "The day Bitcoin became legal tender in El Salvador",
            b: "The day the first real-world Bitcoin transaction was made to buy pizzas",
            c: "The day Ethereum was officially launched",
            d: "The day Satoshi Nakamoto revealed their identity",
          },
          answer: "b",
        },
        {
          question: "Which of the following is NOT a primary goal of PizzaDAO?",
          options: {
            a: "Supporting small pizzerias with crypto funding",
            b: "Educating communities about DAOs and Web3",
            c: "Creating a global pizza monopoly",
            d: "Hosting events that celebrate pizza and crypto culture",
          },
          answer: "c",
        },
        {
          question: "How does PizzaDAO distribute funds to pizzerias?",
          options: {
            a: "Through smart contracts and decentralized governance",
            b: "By sending checks through the mail",
            c: "By requiring pizza shops to stake Ethereum",
            d: "Through centralized crowdfunding",
          },
          answer: "a",
        },
      ],
    },
    {
      section_title: "Community and Impact",
      questions: [
        {
          question:
            "PizzaDAO operates under a 'public goods' model. What does this mean?",
          options: {
            a: "It aims to maximize profits for shareholders",
            b: "It reinvests earnings into community-driven initiatives",
            c: "It sells pizza ingredients at wholesale prices",
            d: "It runs ads to generate revenue",
          },
          answer: "b",
        },
        {
          question:
            "Which of the following best describes the governance structure of PizzaDAO?",
          options: {
            a: "A single CEO makes all decisions",
            b: "A board of directors votes on major changes",
            c: "Community members propose and vote on initiatives using blockchain governance",
            d: "The largest donor has the most influence",
          },
          answer: "c",
        },
        {
          question:
            "What type of token might PizzaDAO use to allow voting on initiatives?",
          options: {
            a: "Stablecoin",
            b: "Governance token",
            c: "Meme coin",
            d: "Non-fungible token (NFT)",
          },
          answer: "b",
        },
        {
          question:
            "What does PizzaDAO's initiative 'Global Pizza Party' aim to achieve?",
          options: {
            a: "Fund free pizza events worldwide",
            b: "Create an international pizza-making competition",
            c: "Promote gourmet pizza recipes on blockchain",
            d: "Establish a single, global pizza currency",
          },
          answer: "a",
        },
      ],
    },
  ],
  scoring: {
    "10-12": "🍕🍕🍕 — You're a PizzaDAO Master!",
    "7-9": "🍕🍕 — You've got the crust but need more toppings!",
    "4-6": "🍕 — You need to slice deeper into the DAO knowledge!",
    "0-3": "❌ — Time to learn the PizzaDAO recipe from scratch!",
  },
};

import React, { useState } from 'react';
import styled from '@emotion/styled';

export default function PizzaQuiz() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const section = BITCOIN_PIZZA_DAY_QUIZ.sections[currentSection];
  const question = section?.questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [`${currentSection}-${currentQuestion}`]: answer
    });

    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < BITCOIN_PIZZA_DAY_QUIZ.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    BITCOIN_PIZZA_DAY_QUIZ.sections.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        if (answers[`${sectionIndex}-${questionIndex}`] === question.answer) {
          correct++;
        }
      });
    });
    return correct;
  };

  const getScoreMessage = (score: number) => {
    const scoring = BITCOIN_PIZZA_DAY_QUIZ.scoring;
    for (const range in scoring) {
      const [min, max] = range.split('-').map(Number);
      if (score >= min && score <= max) {
        return scoring[range];
      }
    }
    return scoring['0-3'];
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <QuizContainer>
        <h1>Quiz Results</h1>
        <ResultsContainer>
          <h2>You scored: {score} out of 12</h2>
          <p>{getScoreMessage(score)}</p>

          {BITCOIN_PIZZA_DAY_QUIZ.sections.map((section, sectionIndex) => (
            <SectionResults key={sectionIndex}>
              <h3>{section.section_title}</h3>
              {section.questions.map((question, questionIndex) => {
                const userAnswer = answers[`${sectionIndex}-${questionIndex}`];
                const isCorrect = userAnswer === question.answer;
                
                return (
                  <QuestionResult key={questionIndex} correct={isCorrect}>
                    <QuestionHeader>
                      <span>{isCorrect ? '✓' : '✗'}</span>
                      <h4>{question.question}</h4>
                    </QuestionHeader>
                    <AnswerDetails>
                      <p>Your answer: {question.options[userAnswer]}</p>
                      {!isCorrect && (
                        <p>Correct answer: {question.options[question.answer]}</p>
                      )}
                    </AnswerDetails>
                  </QuestionResult>
                );
              })}
            </SectionResults>
          ))}

          <button onClick={() => {
            setCurrentSection(0);
            setCurrentQuestion(0);
            setAnswers({});
            setShowResults(false);
          }}>Try Again</button>
        </ResultsContainer>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <h1>{BITCOIN_PIZZA_DAY_QUIZ.quiz_title}</h1>
      <p>{BITCOIN_PIZZA_DAY_QUIZ.description}</p>
      
      <SectionTitle>{section.section_title}</SectionTitle>
      
      <QuestionContainer>
        <h3>Question {currentQuestion + 1} of {section.questions.length}</h3>
        <p>{question.question}</p>
        
        <OptionsContainer>
          {Object.entries(question.options).map(([key, value]) => (
            <OptionButton 
              key={key}
              onClick={() => handleAnswer(key)}
              selected={answers[`${currentSection}-${currentQuestion}`] === key}
            >
              {value}
            </OptionButton>
          ))}
        </OptionsContainer>
      </QuestionContainer>
    </QuizContainer>
  );
}

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.12);

  h1 {
    text-align: center;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
  }

  p {
    text-align: center;
    color: #404040;
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }
`;

const SectionTitle = styled.h2`
  color: #1a1a1a;
  margin-bottom: 2.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #e0e0e0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const QuestionContainer = styled.div`
  margin-bottom: 2.5rem;

  h3 {
    color: #404040;
    margin-bottom: 1.25rem;
    font-weight: 600;
  }

  p {
    font-size: 1.25rem;
    color: #1a1a1a;
    margin-bottom: 2rem;
    line-height: 1.5;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const OptionButton = styled.button<{ selected?: boolean }>`
  padding: 1.25rem;
  border: 2px solid ${props => props.selected ? '#2E7D32' : '#e0e0e0'};
  border-radius: 8px;
  background: ${props => props.selected ? '#E8F5E9' : 'white'};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-size: 1.1rem;
  color: #1a1a1a;
  line-height: 1.4;

  &:hover {
    background: ${props => props.selected ? '#C8E6C9' : '#f8f8f8'};
    border-color: ${props => props.selected ? '#2E7D32' : '#bdbdbd'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.selected ? 'rgba(46, 125, 50, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
  padding: 2rem;

  h2 {
    color: #1a1a1a;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    font-weight: 700;
  }

  p {
    font-size: 1.25rem;
    color: #404040;
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  button {
    padding: 1.25rem 2.5rem;
    background: #2E7D32;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-top: 2rem;

    &:hover {
      background: #1B5E20;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.3);
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const SectionResults = styled.div`
  text-align: left;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 8px;

  h3 {
    color: #1a1a1a;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 0.5rem;
  }
`;

const QuestionResult = styled.div<{ correct: boolean }>`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border-left: 4px solid ${props => props.correct ? '#2E7D32' : '#d32f2f'};
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;

  span {
    font-size: 1.2rem;
    font-weight: bold;
  }

  h4 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    flex: 1;
  }
`;

const AnswerDetails = styled.div`
  margin-left: 2rem;
  
  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #404040;
    text-align: left;
  }
`;
