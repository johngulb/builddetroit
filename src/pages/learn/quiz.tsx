import React, { useState } from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { ButtonLink } from "../../components/Styled";

const questions = [
  {
    question: "What is a key benefit of blockchain decentralization?",
    options: [
      "It makes transactions slower",
      "No single entity controls the network", 
      "It increases transaction fees",
      "It requires more intermediaries"
    ],
    correctAnswer: 1,
    explanation: "Decentralization means no single entity has control, making the network more resistant to manipulation."
  },
  {
    question: "What does blockchain transparency mean?",
    options: [
      "Only banks can view transactions",
      "Transactions are completely private",
      "All transactions are recorded on a public ledger",
      "Transaction history is deleted regularly"
    ],
    correctAnswer: 2,
    explanation: "Blockchain provides transparency by recording all transactions on a public ledger that anyone can verify."
  },
  {
    question: "What is self-custody in blockchain?",
    options: [
      "Letting banks hold your assets",
      "Being your own bank with direct control",
      "Sharing keys with others", 
      "Having multiple bank accounts"
    ],
    correctAnswer: 1,
    explanation: "Self-custody means you have direct control over your assets without relying on intermediaries."
  },
  {
    question: "How do blockchain transaction speeds compare to traditional finance?",
    options: [
      "Much slower than traditional finance",
      "About the same speed",
      "Takes days to settle",
      "Minutes or seconds compared to days"
    ],
    correctAnswer: 3,
    explanation: "Blockchain transactions typically settle in minutes or seconds, while traditional finance can take days."
  }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (selectedOption: number) => {
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email capture logic
    console.log("Email captured:", email);
  };

  return (
    <>
      <NextSeo
        title="Blockchain Knowledge Quiz | Detroit Events"
        description="Test your knowledge about blockchain technology and cryptocurrency concepts."
      />
      <QuizContainer>
        <h1>Test Your Blockchain Knowledge</h1>
        
        {!showResults ? (
          <QuizCard>
            <QuestionNumber>Question {currentQuestion + 1} of {questions.length}</QuestionNumber>
            <Question>{questions[currentQuestion].question}</Question>
            <OptionsContainer>
              {questions[currentQuestion].options.map((option, index) => (
                <OptionButton key={index} onClick={() => handleAnswer(index)}>
                  {option}
                </OptionButton>
              ))}
            </OptionsContainer>
          </QuizCard>
        ) : (
          <ResultsCard>
            <h2>Quiz Complete!</h2>
            <ScoreSection>
              <h3>Your Score: {score} out of {questions.length}</h3>
              <ScorePercentage>{Math.round((score/questions.length) * 100)}%</ScorePercentage>
            </ScoreSection>

            <ResultsBreakdown>
              {questions.map((q, index) => (
                <QuestionResult key={index} correct={answers[index] === q.correctAnswer}>
                  <QuestionTitle>Question {index + 1}: {answers[index] === q.correctAnswer ? "✓" : "✗"}</QuestionTitle>
                  <p>{q.question}</p>
                  <ResultExplanation>{q.explanation}</ResultExplanation>
                  <AnswerComparison>
                    <span>Your answer: {q.options[answers[index]]}</span>
                    <span>Correct answer: {q.options[q.correctAnswer]}</span>
                  </AnswerComparison>
                </QuestionResult>
              ))}
            </ResultsBreakdown>

            <EmailCaptureSection>
              <h3>Get More Blockchain Learning Resources</h3>
              <p>Enter your email to receive study materials and updates</p>
              <EmailForm onSubmit={handleEmailSubmit}>
                <EmailInput 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <SubmitButton type="submit">Send Me Resources</SubmitButton>
              </EmailForm>
            </EmailCaptureSection>

            <ButtonLink as="button" onClick={resetQuiz}>Try Quiz Again</ButtonLink>
          </ResultsCard>
        )}
      </QuizContainer>
    </>
  );
};

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: #1a1a1a;
    margin-bottom: 2rem;
  }
`;

const QuizCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const QuestionNumber = styled.div`
  font-size: 1.1rem;
  color: #4a4a4a;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const Question = styled.h2`
  margin-bottom: 2rem;
  color: #1a1a1a;
  font-size: 1.8rem;
  line-height: 1.4;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const OptionButton = styled.button`
  padding: 1.2rem;
  border: 2px solid #d1d1d1;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.1rem;
  color: #2a2a2a;

  &:hover {
    background: #f0f0f0;
    border-color: #666;
    color: #000;
  }

  &:focus {
    outline: none;
    border-color: #444;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const ResultsCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
    color: #1a1a1a;
  }
`;

const ScoreSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;

  h3 {
    color: #2a2a2a;
    margin-bottom: 0.5rem;
  }
`;

const ScorePercentage = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2a2a2a;
`;

const ResultsBreakdown = styled.div`
  margin: 2rem 0;
  text-align: left;
`;

const QuestionResult = styled.div<{ correct: boolean }>`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-left: 4px solid ${props => props.correct ? '#4CAF50' : '#f44336'};
  background: #fff;
  border-radius: 4px;
`;

const QuestionTitle = styled.h4`
  margin-bottom: 0.5rem;
  color: #2a2a2a;
`;

const ResultExplanation = styled.p`
  margin: 0.5rem 0;
  color: #666;
  font-style: italic;
`;

const AnswerComparison = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const EmailCaptureSection = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    color: #2a2a2a;
  }

  p {
    margin-bottom: 1.5rem;
    color: #666;
  }
`;

const EmailForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #d1d1d1;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #444;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #2a2a2a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #444;
  }
`;

export default QuizPage;
