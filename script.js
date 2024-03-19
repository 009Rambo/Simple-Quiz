const questions = [
    {
      question: "1. What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "2. What is the capital of Finland?",
      options: ["Paris", "London", "Berlin", "Helsinki"],
      answer: "Helsinki"
    },
    {
      question: "3. What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "4. Who is the author of 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      answer: "William Shakespeare"
    }
  ];

  let currentQuestion = 0;
  let userScore = 0;

  function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const submitButton = document.getElementById('submit-answer');

    // Ensure there are still questions remaining
    if (currentQuestion < questions.length) {
      const current = questions[currentQuestion];

      questionElement.textContent = current.question;
      optionsElement.innerHTML = '';

      current.options.forEach(option => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'option');
        input.setAttribute('value', option);
        li.appendChild(input);
        li.appendChild(document.createTextNode(option));
        optionsElement.appendChild(li);
      });

      submitButton.addEventListener('click', checkAnswer);
    } else {
      endQuiz(); // If there are no more questions, end the quiz
    }
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    const feedback = document.getElementById('feedback');

    if (!selectedOption) {
      feedback.textContent = "Please select an option.";
      return;
    }

    const userAnswer = selectedOption.value;
    if (userAnswer === questions[currentQuestion].answer) {
      userScore++;
      feedback.textContent = "Correct!";
    } else {
      feedback.textContent = "Incorrect. The correct answer is: " + questions[currentQuestion].answer;
    }

    currentQuestion++;
    loadQuestion(); // Load the next question
  }

  function endQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'block';
    document.getElementById('user-score').textContent = userScore;
  }

  function restartQuiz() {
    currentQuestion = 0;
    userScore = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    document.getElementById('restart-button').style.display = 'block';
    loadQuestion();
  }

  document.getElementById('restart-button').addEventListener('click', restartQuiz);

  // Load the first question when the page loads
  window.onload = loadQuestion;
