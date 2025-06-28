import React, { useState } from 'react';
import { ClipboardCheck, Clock, Award, TrendingUp, Play, CheckCircle } from 'lucide-react';

const SkillAssessment: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const assessments = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
      duration: '30 minutes',
      questions: 20,
      difficulty: 'Beginner',
      category: 'Programming'
    },
    {
      id: '2',
      title: 'Python Data Analysis',
      description: 'Assess your skills in Python data analysis using pandas, numpy, and visualization libraries.',
      duration: '45 minutes',
      questions: 25,
      difficulty: 'Intermediate',
      category: 'Data Science'
    },
    {
      id: '3',
      title: 'Cloud Computing Basics',
      description: 'Evaluate your understanding of cloud computing concepts and AWS services.',
      duration: '40 minutes',
      questions: 30,
      difficulty: 'Beginner',
      category: 'Cloud Computing'
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      description: 'Test your knowledge of digital marketing principles, SEO, and social media marketing.',
      duration: '35 minutes',
      questions: 22,
      difficulty: 'Intermediate',
      category: 'Marketing'
    }
  ];

  const sampleQuestions = [
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
      correct: 0
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "add()", "append()", "insert()"],
      correct: 0
    },
    {
      question: "What does 'DOM' stand for?",
      options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
      correct: 0
    }
  ];

  const handleStartAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (parseInt(answer) === sampleQuestions[parseInt(questionIndex)].correct) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-orange-600 bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
          <p className="text-gray-600">Here are your results</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
            <div className="text-xl text-gray-900 mb-4">Your Score</div>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              score >= 80 ? 'bg-green-100 text-green-800' :
              score >= 60 ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Object.keys(answers).filter(key => 
                  parseInt(answers[parseInt(key)]) === sampleQuestions[parseInt(key)].correct
                ).length}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {sampleQuestions.length - Object.keys(answers).filter(key => 
                  parseInt(answers[parseInt(key)]) === sampleQuestions[parseInt(key)].correct
                ).length}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{sampleQuestions.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
            {score < 80 && (
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <p className="text-blue-800 text-sm">
                  Consider reviewing JavaScript fundamentals and practicing more coding exercises to improve your score.
                </p>
              </div>
            )}
            <button
              onClick={() => {
                setSelectedAssessment(null);
                setShowResults(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Take Another Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedAssessment) {
    const question = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">JavaScript Fundamentals Assessment</h1>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    answers[currentQuestion] === index.toString()
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index.toString()}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers[currentQuestion] === index.toString()
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === index.toString() && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setSelectedAssessment(null)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Exit Assessment
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestion]}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === sampleQuestions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Assessment</h1>
        <p className="text-gray-600">Test your knowledge and identify areas for improvement</p>
      </div>

      {/* Assessment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ClipboardCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Assessments Taken</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Improvement</p>
              <p className="text-2xl font-bold text-gray-900">+15%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">8/12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Assessments */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Assessments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{assessment.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{assessment.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                  {assessment.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{assessment.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClipboardCheck className="w-4 h-4" />
                  <span>{assessment.questions} questions</span>
                </div>
                <div className="text-blue-600 font-medium">
                  {assessment.category}
                </div>
              </div>

              <button
                onClick={() => handleStartAssessment(assessment.id)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Assessment</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Results</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Python Data Analysis</h3>
                <p className="text-sm text-gray-600">Completed 2 days ago</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-600">Excellent</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cloud Computing Basics</h3>
                <p className="text-sm text-gray-600">Completed 1 week ago</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">78%</div>
              <div className="text-sm text-gray-600">Good</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;